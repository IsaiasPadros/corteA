import { useState, useRef, useEffect } from 'react'
import '../styles/ReproductorVideos.css'

const videos = [
  {
    id: 1,
    src: '/assets/Videos/Video1-CorteA.mp4',
    titulo: 'Proyecto 1',
    descripcion: 'Carpintería artesanal de primera calidad. Diseño único que combina funcionalidad y elegancia para transformar tu espacio.'
  },
  {
    id: 2,
    src: '/assets/Videos/Video2-CorteA.mp4',
    titulo: 'Proyecto 2',
    descripcion: 'Soluciones personalizadas adaptadas a tus necesidades. Cada detalle pensado para maximizar el confort y la estética.'
  },
  {
    id: 3,
    src: '/assets/Videos/Video3-CorteA.mp4',
    titulo: 'Proyecto 3',
    descripcion: 'Innovación en diseño y materiales premium. Proyectos que reflejan tu personalidad y estilo de vida.'
  },
  {
    id: 4,
    src: '/assets/Videos/Video4-CorteA.mp4',
    titulo: 'Proyecto 4',
    descripcion: 'Excelencia en cada acabado. Transformamos espacios con la más alta calidad en carpintería artesanal.'
  }
]

function ReproductorVideos() {
  const [videoActual, setVideoActual] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true) // Iniciar en mute para permitir autoplay
  const [progress, setProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const videoRef = useRef(null)
  const videoRefsDesktop = useRef({})
  const containerRef = useRef(null)
  const touchStartY = useRef(0)
  const touchEndY = useRef(0)
  const isDragging = useRef(false)

  const cambiarVideo = (nuevoIndice) => {
    if (nuevoIndice >= 0 && nuevoIndice < videos.length) {
      // Pausar video actual si existe
      if (videoRef.current) {
        videoRef.current.pause()
      }
      setVideoActual(nuevoIndice)
      setProgress(0)
      setHasUserInteracted(true)
      // El useEffect se encargará de reproducir el nuevo video
    }
  }

  // Manejar reproducción del video actual
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
      }
    }

    const handleEnded = () => {
      // Auto-avanzar al siguiente video
      if (videoActual < videos.length - 1) {
        cambiarVideo(videoActual + 1)
      } else {
        // Si es el último, reiniciar el primero
        cambiarVideo(0)
      }
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleLoadedMetadata = () => {
      // Intentar reproducir automáticamente (solo si está mute)
      video.muted = isMuted
      if (isMuted) {
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
            })
            .catch(() => {
              setIsPlaying(false)
            })
        }
      }
    }

    const handleCanPlay = () => {
      // Si el video puede reproducirse y está mute, intentar reproducir
      if (isMuted && !isPlaying && video.paused) {
        video.muted = true
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
            })
            .catch(() => {
              setIsPlaying(false)
            })
        }
      }
    }

    // Agregar todos los event listeners
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('canplay', handleCanPlay)

    // Configurar audio según el estado
    video.muted = isMuted
    
    // Cargar el video
    video.load()
    
    // Intentar reproducir inmediatamente si está mute (permitido por navegadores)
    if (isMuted && video.paused) {
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch(() => {
            setIsPlaying(false)
          })
      }
    }

    // Mute y pausar todos los demás videos
    const allVideos = containerRef.current?.querySelectorAll('video')
    allVideos?.forEach((v, idx) => {
      if (idx !== videoActual) {
        v.muted = true
        v.pause()
      }
    })

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [videoActual, isMuted])

  const togglePlay = (e) => {
    // Prevenir propagación si viene de un evento
    if (e) {
      e.stopPropagation()
    }

    const video = videoRef.current
    if (!video) return

    setHasUserInteracted(true)

    // Verificar el estado real del video
    if (!video.paused) {
      // Si está reproduciéndose, pausarlo
      video.pause()
      setIsPlaying(false)
    } else {
      // Si está pausado, reproducirlo
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch(error => {
            console.error("Error al reproducir el video:", error)
            setIsPlaying(false)
          })
      } else {
        setIsPlaying(true)
      }
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    setHasUserInteracted(true)
    const newMutedState = !isMuted
    video.muted = newMutedState
    setIsMuted(newMutedState)
  }

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY
    isDragging.current = false
  }

  const handleTouchMove = (e) => {
    const deltaY = e.touches[0].clientY - touchStartY.current
    if (Math.abs(deltaY) > 10) {
      isDragging.current = true
    }
  }

  const handleTouchEnd = (e) => {
    if (!isDragging.current) return

    touchEndY.current = e.changedTouches[0].clientY
    const deltaY = touchStartY.current - touchEndY.current

    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0 && videoActual < videos.length - 1) {
        // Swipe hacia arriba - siguiente video
        cambiarVideo(videoActual + 1)
      } else if (deltaY < 0 && videoActual > 0) {
        // Swipe hacia abajo - video anterior
        cambiarVideo(videoActual - 1)
      }
    }
  }

  const handleWheel = (e) => {
    if (Math.abs(e.deltaY) > 50) {
      if (e.deltaY > 0 && videoActual < videos.length - 1) {
        // Scroll hacia abajo - siguiente video
        cambiarVideo(videoActual + 1)
      } else if (e.deltaY < 0 && videoActual > 0) {
        // Scroll hacia arriba - video anterior
        cambiarVideo(videoActual - 1)
      }
    }
  }

  const handleProgressClick = (e) => {
    const video = videoRef.current
    if (!video) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const percentage = clickX / width
    video.currentTime = percentage * video.duration
  }

  // Debug: verificar que el componente se renderiza
  console.log('ReproductorVideos renderizando, videoActual:', videoActual, 'videos:', videos.length)

  return (
    <section className="reproductor-videos-seccion">
      <div className="reproductor-videos-contenedor">
        <div className="reproductor-videos-header">
          <h2 className="reproductor-videos-titulo">Nuestros Proyectos</h2>
          <p className="reproductor-videos-subtitulo">Descubre nuestro trabajo en acción</p>
        </div>

        {/* Versión móvil: diseño vertical tipo TikTok/Reels */}
        <div 
          className="reproductor-videos-wrapper reproductor-videos-mobile"
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="reproductor-videos-slider" style={{ transform: `translateY(-${videoActual * 100}%)` }}>
            {videos.map((video, index) => {
              const isActive = index === videoActual
              return (
              <div 
                key={video.id} 
                className={`reproductor-video-item ${isActive ? 'active' : ''}`}
              >
                <div className="reproductor-video-container">
                  <video
                    ref={isActive ? videoRef : null}
                    className="reproductor-video"
                    src={video.src}
                    playsInline
                    muted={isActive ? isMuted : true}
                    loop={false}
                    preload="auto"
                    onError={(e) => {
                      console.error(`Error cargando video ${video.id}:`, e)
                    }}
                    onLoadStart={() => {
                      console.log(`Cargando video ${video.id}: ${video.src}`)
                    }}
                  />
                  {/* Fallback si el video no carga */}
                  <div className="reproductor-video-fallback">
                    <p>Cargando video...</p>
                  </div>
                  
                  {/* Overlay con controles */}
                  <div className={`reproductor-video-overlay ${isHovered || !isPlaying ? 'show' : ''} ${!isPlaying ? 'paused' : ''}`}>
                    <div className="reproductor-video-info">
                      <h3 className="reproductor-video-titulo">{video.titulo}</h3>
                      <span className="reproductor-video-contador">
                        {index + 1} / {videos.length}
                      </span>
                    </div>

                    {/* Controles centrales */}
                    <div className="reproductor-video-controles">
                      <button 
                        className="reproductor-video-btn-play"
                        onClick={togglePlay}
                        aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                      >
                        {isPlaying ? (
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        )}
                      </button>
                      {isActive && (
                        <button 
                          className="reproductor-video-btn-sound"
                          onClick={toggleMute}
                          aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                        >
                          {isMuted ? (
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                            </svg>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Barra de progreso */}
                    <div 
                      className="reproductor-video-progress-container"
                      onClick={handleProgressClick}
                    >
                      <div 
                        className="reproductor-video-progress-bar"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Indicadores de navegación */}
                  <div className="reproductor-video-indicadores">
                    {videos.map((_, idx) => (
                      <button
                        key={idx}
                        className={`reproductor-video-indicador ${idx === videoActual ? 'active' : ''}`}
                        onClick={() => cambiarVideo(idx)}
                        aria-label={`Ir al video ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              )
            })}
          </div>

          {/* Botones de navegación */}
          <button
            className="reproductor-video-nav-btn reproductor-video-nav-up"
            onClick={() => cambiarVideo(Math.max(0, videoActual - 1))}
            disabled={videoActual === 0}
            aria-label="Video anterior"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
            </svg>
          </button>
          <button
            className="reproductor-video-nav-btn reproductor-video-nav-down"
            onClick={() => cambiarVideo(Math.min(videos.length - 1, videoActual + 1))}
            disabled={videoActual === videos.length - 1}
            aria-label="Siguiente video"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
            </svg>
          </button>
        </div>

        {/* Instrucciones - Solo móvil */}
        <div className="reproductor-videos-instrucciones reproductor-videos-instrucciones-mobile">
          <p>Desliza hacia arriba o abajo para cambiar de video</p>
        </div>

        {/* Versión desktop: grid con videos intercalados y descripciones */}
        <div className="reproductor-videos-desktop">
          <div className="reproductor-videos-grid-desktop">
            {videos.map((video, index) => {
              const isLeft = index % 2 === 0
              const isActive = index === videoActual
              
              return (
                <div 
                  key={video.id} 
                  className={`reproductor-video-card-desktop ${isLeft ? 'left' : 'right'} ${isActive ? 'active' : ''}`}
                  onClick={() => cambiarVideo(index)}
                >
                  <div className="reproductor-video-card-video-wrapper">
                    <video
                      ref={(el) => {
                        videoRefsDesktop.current[index] = el
                        if (isActive) {
                          videoRef.current = el
                        }
                      }}
                      className="reproductor-video-card-video"
                      src={video.src}
                      playsInline
                      muted={isActive ? isMuted : true}
                      loop={false}
                      preload="metadata"
                      onMouseEnter={() => {
                        const vid = videoRefsDesktop.current[index]
                        if (vid && isActive) {
                          vid.play().catch(() => {})
                        }
                      }}
                      onMouseLeave={() => {
                        const vid = videoRefsDesktop.current[index]
                        if (vid && isActive && !isPlaying) {
                          vid.pause()
                        }
                      }}
                      onPlay={() => {
                        if (isActive) setIsPlaying(true)
                      }}
                      onPause={() => {
                        if (isActive) setIsPlaying(false)
                      }}
                    />
                    <div className={`reproductor-video-card-overlay ${isActive ? 'active' : ''}`}>
                      {isActive && (
                        <div className="reproductor-video-card-controles-desktop">
                          <button 
                            className="reproductor-video-card-btn-play"
                            onClick={(e) => {
                              e.stopPropagation()
                              togglePlay()
                            }}
                            aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                          >
                            {isPlaying ? (
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                              </svg>
                            ) : (
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            )}
                          </button>
                          <button 
                            className="reproductor-video-card-btn-sound"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleMute()
                            }}
                            aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                          >
                            {isMuted ? (
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                              </svg>
                            ) : (
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                              </svg>
                            )}
                          </button>
                        </div>
                      )}
                      {!isActive && (
                        <div className="reproductor-video-card-play-icon">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      )}
                      {isActive && (
                        <div 
                          className="reproductor-video-card-progress-desktop"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleProgressClick(e)
                          }}
                        >
                          <div 
                            className="reproductor-video-card-progress-bar-desktop"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="reproductor-video-card-numero">{index + 1}</div>
                  </div>
                  <div className={`reproductor-video-card-descripcion ${isLeft ? 'left' : 'right'}`}>
                    <div className="reproductor-video-card-descripcion-decoracion"></div>
                    <h3 className="reproductor-video-card-titulo">{video.titulo}</h3>
                    <p className="reproductor-video-card-texto">{video.descripcion}</p>
                    <div className="reproductor-video-card-badge">
                      <span>Proyecto {index + 1}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReproductorVideos

