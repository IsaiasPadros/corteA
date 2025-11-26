import '../styles/CarruselProductos.css'
import TarjetaPropiedad from './TarjetaPropiedad'
import { useState, useRef, useEffect } from 'react'

function CarruselProductos({ productos }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Siempre mostramos 1 producto por slide (pantalla completa)
  const maxIndex = Math.max(0, productos.length - 1)

  const goToPrevious = () => {
    setCurrentIndex(prev => {
      const newIndex = prev - 1
      return Math.max(0, newIndex)
    })
  }

  const goToNext = () => {
    setCurrentIndex(prev => {
      const newIndex = prev + 1
      return Math.min(maxIndex, newIndex)
    })
  }

  const goToSlide = (index) => {
    setCurrentIndex(Math.max(0, Math.min(maxIndex, index)))
  }

  // Manejo de swipe para móvil
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    
    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      goToNext()
    } else if (distance < -minSwipeDistance) {
      goToPrevious()
    }
  }

  return (
    <div className="carrusel-productos">
      <div className="carrusel-contenedor">
        <button
          className="carrusel-boton carrusel-boton-izquierda"
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          aria-label="Producto anterior"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <div
          className="carrusel-track"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            '--current-index': currentIndex
          }}
        >
          {productos.map((producto) => (
            <div key={producto.id} className="carrusel-item">
              <TarjetaPropiedad propiedad={producto} />
            </div>
          ))}
        </div>

        <button
          className="carrusel-boton carrusel-boton-derecha"
          onClick={goToNext}
          disabled={currentIndex >= maxIndex}
          aria-label="Producto siguiente"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      {/* Indicadores */}
      {productos.length > 1 && (
        <div className="carrusel-indicadores">
          {productos.map((_, index) => (
            <button
              key={index}
              className={`carrusel-indicador ${index === currentIndex ? 'activo' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CarruselProductos

