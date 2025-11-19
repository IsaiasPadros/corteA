import '../styles/TarjetaPropiedad.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function TarjetaPropiedad({ propiedad }) {
  const { id, titulo, ubicacion, precio, habitaciones, banos, metros, imagen } = propiedad
  const [isHovered, setIsHovered] = useState(false)
  const [showSinStock, setShowSinStock] = useState(false)
  const disponible = id === 2 // Solo Mesa para Café está disponible

  const handleAgregarCarrito = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // Lógica para agregar al carrito
    console.log('Agregar al carrito:', id)
  }

  const handleClickDetalles = (e) => {
    if (!disponible) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <div 
      className="tarjeta-propiedad"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="tarjeta-propiedad-imagen">
        <img src={imagen} alt={titulo} />
        <div className="imagen-overlay">
          {disponible ? (
            <Link 
              to={`/producto/${id}`} 
              className="boton-ver-detalles-overlay"
            >
              Ver Detalles
            </Link>
          ) : (
            <div 
              className="boton-ver-detalles-overlay sin-stock"
              onMouseEnter={() => setShowSinStock(true)}
              onMouseLeave={() => setShowSinStock(false)}
            >
              Sin Stock
            </div>
          )}
        </div>
        <span className="etiqueta-precio">${precio}</span>
        <div className="badge-mas-vendido">MÁS VENDIDO</div>
        {!disponible && (
          <div className="badge-sin-stock">SIN STOCK</div>
        )}
      </div>
      <div className="tarjeta-propiedad-contenido">
        <h3>{titulo}</h3>
        <p className="ubicacion">{ubicacion}</p>
        
        <div className="caracteristicas">
          <div className="caracteristica">
            <span className="caracteristica-icono">🪵</span>
            <span>{habitaciones}</span>
          </div>
          <div className="caracteristica">
            <span className="caracteristica-icono">✨</span>
            <span>{banos}</span>
          </div>
          <div className="caracteristica">
            <span className="caracteristica-icono">📏</span>
            <span>{metros} cm</span>
          </div>
        </div>
        
        <div className="tarjeta-acciones">
          <button 
            className={`boton-agregar-carrito ${!disponible ? 'deshabilitado' : ''}`}
            onClick={handleAgregarCarrito}
            disabled={!disponible}
          >
            <svg className="icono-carrito" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            Agregar
          </button>
          {disponible ? (
            <Link 
              to={`/producto/${id}`} 
              className="boton-detalles"
            >
              Ver Detalles
            </Link>
          ) : (
            <div 
              className="boton-detalles deshabilitado"
              onMouseEnter={() => setShowSinStock(true)}
              onMouseLeave={() => setShowSinStock(false)}
            >
              Ver Detalles
              {showSinStock && (
                <span className="tooltip-sin-stock">Sin Stock</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TarjetaPropiedad 