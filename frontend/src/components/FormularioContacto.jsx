import '../styles/FormularioContacto.css'
import { useState } from 'react'

function FormularioContacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Por ahora solo visual, no se envía nada
    console.log('Formulario enviado:', formData)
  }

  return (
    <section id="contacto" className="formulario-contacto-seccion">
      <div className="formulario-contacto-contenedor">
        {/* Elementos decorativos flotantes */}
        <div className="decoracion-flotante decoracion-1"></div>
        <div className="decoracion-flotante decoracion-2"></div>
        <div className="decoracion-flotante decoracion-3"></div>
        
        {/* Panel izquierdo con información */}
        <div className="formulario-contacto-info">
          <div className="formulario-contacto-info-contenido">
            {/* <div className="formulario-contacto-badge">
              <span>Contacto</span>
            </div> */}
            <h2 className="formulario-contacto-titulo">
              Envíanos un mensaje
            </h2>
            <p className="formulario-contacto-subtitulo">
              Nos comunicaremos contigo a la brevedad
            </p>
            <div className="formulario-contacto-destacado">
              <div className="formulario-contacto-icono-wrapper">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
                </svg>
              </div>
              <p className="formulario-contacto-destacado-texto">
                Tu proyecto merece atención personalizada. 
                Estamos aquí para hacer realidad tus ideas.
              </p>
            </div>
          </div>
        </div>

        {/* Panel derecho con formulario */}
        <div className="formulario-contacto-form-wrapper">
          <form className="formulario-contacto-form" onSubmit={handleSubmit}>
            <div className="formulario-campo">
              <label htmlFor="nombre" className="formulario-label">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="formulario-input"
                placeholder="Tu nombre completo"
                required
              />
              <div className="formulario-input-linea"></div>
            </div>

            <div className="formulario-campo">
              <label htmlFor="email" className="formulario-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="formulario-input"
                placeholder="tu@email.com"
                required
              />
              <div className="formulario-input-linea"></div>
            </div>

            <div className="formulario-campo">
              <label htmlFor="asunto" className="formulario-label">
                Asunto
              </label>
              <input
                type="text"
                id="asunto"
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                className="formulario-input"
                placeholder="¿Sobre qué quieres consultar?"
                required
              />
              <div className="formulario-input-linea"></div>
            </div>

            <div className="formulario-campo">
              <label htmlFor="mensaje" className="formulario-label">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                className="formulario-textarea"
                placeholder="Cuéntanos sobre tu proyecto..."
                rows="5"
                required
              ></textarea>
              <div className="formulario-input-linea"></div>
            </div>

            <button type="submit" className="formulario-boton">
              <span>Enviar Mensaje</span>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="formulario-boton-icono">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default FormularioContacto

