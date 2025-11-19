import '../styles/TarjetaPropiedad.css'
import { Link } from 'react-router-dom'

function TarjetaPropiedad({ propiedad }) {
  const { id, titulo, ubicacion, precio, habitaciones, banos, metros, imagen } = propiedad

  return (
    <div className="tarjeta-propiedad">
      <div className="tarjeta-propiedad-imagen">
        <img src={imagen} alt={titulo} />
        <span className="etiqueta-precio">${precio}</span>
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
        
        <Link 
          to={`/producto/${id}`} 
          className="boton-detalles"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  )
}

export default TarjetaPropiedad 