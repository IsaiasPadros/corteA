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
  const videoRef = useRef(null)
  const videoRefs = useRef({})
  const cardRefs = useRef({})
  const observerRef = useRef(null)
  const isUserScrolling = useRef(false)
  const scrollTimeoutRef = useRef(null)
  const videoActualRef = useRef(videoActual)

  const cambiarVideo = (nuevoIndice, fromScroll = false) => {
    if (nuevoIndice >= 0 && nuevoIndice < videos.length && nuevoIndice !== videoActual) {
      // Pausar todos los videos
      Object.values(videoRefs.current).forEach(vid => {
        if (vid) vid.pause()
      })
      if (videoRef.current) {
        videoRef.current.pause()
      }
      setVideoActual(nuevoIndice)
      setProgress(0)
      setIsPlaying(false)
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
    
    // Intentar reproducir automáticamente cuando el video esté listo
    const tryAutoPlay = () => {
      if (isMuted && video.paused) {
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

    // Intentar reproducir cuando el video esté listo
    if (video.readyState >= 2) {
      tryAutoPlay()
    } else {
      video.addEventListener('loadeddata', tryAutoPlay, { once: true })
    }

    // Mute y pausar todos los demás videos
    Object.keys(videoRefs.current).forEach((key) => {
      const idx = parseInt(key)
      const vid = videoRefs.current[key]
      if (vid && idx !== videoActual) {
        vid.muted = true
        vid.pause()
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

  // Actualizar ref cuando cambia videoActual
  useEffect(() => {
    videoActualRef.current = videoActual
  }, [videoActual])

  // Intersection Observer para detectar qué video está más visible durante el scroll
  useEffect(() => {
    let initTimeout = null
    let cleanupFunction = null

    // Esperar a que las tarjetas estén disponibles
    const initScrollDetection = () => {
      const cards = []
      for (let i = 0; i < videos.length; i++) {
        if (cardRefs.current[i]) {
          cards.push({ index: i, element: cardRefs.current[i] })
        }
      }

      if (cards.length === 0) {
        // Si no hay cards todavía, reintentar después de un momento
        initTimeout = setTimeout(initScrollDetection, 100)
        return null
      }

      // Función para determinar qué video está más visible basado en la distancia al centro del viewport
      const updateActiveVideo = () => {
        const viewportCenter = window.innerHeight / 2
        const currentActive = videoActualRef.current
        
        let mostVisibleIndex = currentActive
        let minDistance = Infinity

        cards.forEach(({ index, element }) => {
          if (!element) return
          
          const rect = element.getBoundingClientRect()
          const cardCenter = rect.top + rect.height / 2
          const distanceFromCenter = Math.abs(cardCenter - viewportCenter)
          
          // Calcular cuánto del card está visible en el viewport
          const cardTop = Math.max(rect.top, 0)
          const cardBottom = Math.min(rect.bottom, window.innerHeight)
          const visibleHeight = Math.max(0, cardBottom - cardTop)
          const visibilityRatio = visibleHeight / Math.max(rect.height, window.innerHeight * 0.5)
          
          // Solo considerar cards que tengan al menos 40% de visibilidad
          if (visibilityRatio > 0.4) {
            // Combinar distancia y visibilidad para determinar el mejor candidato
            const normalizedDistance = distanceFromCenter / window.innerHeight
            const score = normalizedDistance * (2 - visibilityRatio)
            
            if (score < minDistance) {
              minDistance = score
              mostVisibleIndex = index
            }
          }
        })

        // Cambiar el video activo si es diferente y tiene buena visibilidad
        if (mostVisibleIndex !== currentActive && minDistance < Infinity) {
          cambiarVideo(mostVisibleIndex, true)
        }
      }

      // Throttle para el scroll usando requestAnimationFrame
      let ticking = false
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            isUserScrolling.current = true
            updateActiveVideo()
            ticking = false
            
            // Limpiar timeout anterior
            if (scrollTimeoutRef.current) {
              clearTimeout(scrollTimeoutRef.current)
            }
            
            // Marcar que dejó de hacer scroll después de un momento
            scrollTimeoutRef.current = setTimeout(() => {
              isUserScrolling.current = false
            }, 300)
          })
          ticking = true
        }
      }

      // Event listeners para scroll
      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('touchmove', handleScroll, { passive: true })
      
      // Actualizar inicialmente después de un pequeño delay
      const initialTimeout = setTimeout(() => {
        updateActiveVideo()
      }, 500)

      // Retornar función de cleanup
      return () => {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('touchmove', handleScroll)
        clearTimeout(initialTimeout)
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
      }
    }

    // Iniciar la detección con un pequeño delay para asegurar que las tarjetas estén renderizadas
    const startTimeout = setTimeout(() => {
      cleanupFunction = initScrollDetection()
    }, 100)
    
    return () => {
      clearTimeout(startTimeout)
      if (initTimeout) {
        clearTimeout(initTimeout)
      }
      if (cleanupFunction) {
        cleanupFunction()
      }
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [videos.length])

  const togglePlay = (e) => {
    // Prevenir propagación si viene de un evento
    if (e) {
      e.stopPropagation()
    }

    const video = videoRef.current
    if (!video) return

    // Verificar el estado real del video
    if (!video.paused) {
      // Si está reproduciéndose, pausarlo
      video.pause()
      setIsPlaying(false)
    } else {
      // Si está pausado, reproducirlo
      video.muted = isMuted // Asegurar el estado de mute
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

    const newMutedState = !isMuted
    video.muted = newMutedState
    setIsMuted(newMutedState)
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

  return (
    <section className="reproductor-videos-seccion">
      <div className="reproductor-videos-contenedor">
        <div className="reproductor-videos-header">
          <h2 className="reproductor-videos-titulo">Nuestros Proyectos</h2>
          <p className="reproductor-videos-subtitulo">Descubre nuestro trabajo en acción</p>
        </div>

        {/* Diseño unificado: grid con videos intercalados y descripciones */}
        <div className="reproductor-videos-grid">
          {videos.map((video, index) => {
            const isLeft = index % 2 === 0
            const isActive = index === videoActual
            
            return (
              <div 
                key={video.id}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                className={`reproductor-video-card ${isLeft ? 'left' : 'right'} ${isActive ? 'active' : ''}`}
                onClick={() => cambiarVideo(index)}
              >
                <div className="reproductor-video-card-video-wrapper">
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el
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
                    onPlay={() => {
                      if (isActive) setIsPlaying(true)
                    }}
                    onPause={() => {
                      if (isActive) setIsPlaying(false)
                    }}
                  />
                  <div className={`reproductor-video-card-overlay ${isActive ? 'active' : ''}`}>
                    {isActive && (
                      <div className="reproductor-video-card-controles">
                        <button 
                          className="reproductor-video-card-btn-play"
                          onClick={(e) => {
                            e.stopPropagation()
                            togglePlay(e)
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
                        className="reproductor-video-card-progress"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleProgressClick(e)
                        }}
                      >
                        <div 
                          className="reproductor-video-card-progress-bar"
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
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ReproductorVideos

