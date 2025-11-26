import { useEffect, useState } from 'react'
import '../styles/ModalContacto.css'

function ModalContacto() {
  const [mostrar, setMostrar] = useState(false)
  const [cerrado, setCerrado] = useState(false)

  useEffect(() => {
    // Mostrar el modal después de 3 segundos
    const timer = setTimeout(() => {
      // Verificar si el usuario ya cerró el modal antes (usando localStorage)
      const modalCerrado = localStorage.getItem('modalContactoCerrado')
      if (!modalCerrado) {
        setMostrar(true)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const cerrarModal = () => {
    setMostrar(false)
    setCerrado(true)
    // Guardar en localStorage que el usuario cerró el modal
    localStorage.setItem('modalContactoCerrado', 'true')
  }

  const abrirWhatsApp = () => {
    const numero = '3816322353'
    const mensaje = encodeURIComponent('Hola, me interesa conocer más sobre los servicios de Corte A.')
    const url = `https://wa.me/${numero}?text=${mensaje}`
    window.open(url, '_blank')
    cerrarModal()
  }

  if (!mostrar || cerrado) {
    return null
  }

  return (
    <div className="modal-contacto-overlay" onClick={cerrarModal}>
      <div className="modal-contacto-contenido" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-contacto-header">
          <span className="modal-contacto-titulo-header">CONTACTO EXCLUSIVO</span>
          <button 
            className="modal-contacto-cerrar"
            onClick={cerrarModal}
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>

        {/* Contenido principal */}
        <div className="modal-contacto-main">
          <div className="modal-contacto-llamado">
            <span className="modal-contacto-numero-grande">CONTACTA</span>
            <span className="modal-contacto-texto-principal">CON CORTE A</span>
          </div>
          <div className="modal-contacto-subtitulo">
            Transformamos tus ideas en espacios únicos
          </div>
          <div className="modal-contacto-descripcion">
            <p>Asesoría personalizada</p>
            <p>+ Proyectos a medida</p>
          </div>

          {/* Botón CTA */}
          <button 
            className="modal-contacto-boton"
            onClick={abrirWhatsApp}
          >
            <span>Quiero conocer más sobre los servicios</span>
            <span>y obtener asesoría personalizada</span>
          </button>

          {/* Disclaimer */}
          <p className="modal-contacto-disclaimer">
            * Al hacer clic en el botón, serás redirigido a WhatsApp para consultar sobre nuestros servicios. 
            Estamos disponibles para atenderte y responder todas tus consultas.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ModalContacto

