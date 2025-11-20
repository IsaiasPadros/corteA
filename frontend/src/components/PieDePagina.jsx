import '../styles/PieDePagina.css'

function PieDePagina() {
  const anioActual = new Date().getFullYear()
  
  return (
    <footer className="pie-de-pagina">
      <div className="pie-decoracion-superior"></div>
      <div className="contenedor">
        <div className="pie-contenido">
          <div className="pie-seccion pie-seccion-principal">
            <div className="pie-logo">
              <h3>Corte A</h3>
              <div className="pie-logo-linea"></div>
            </div>
            <p className="pie-descripcion">
              Creemos que amoblar es sinónimo de invertir en tus sueños. 
              Transformamos espacios con carpintería artesanal de la más alta calidad.
            </p>
          </div>
          
          <div className="pie-seccion">
            <h4 className="pie-titulo-seccion">Navegación</h4>
            <ul className="pie-links">
              <li>
                <a href="#inicio" className="pie-link">
                  <span className="pie-link-icono">→</span>
                  <span>Inicio</span>
                </a>
              </li>
              <li>
                <a href="#propiedades" className="pie-link">
                  <span className="pie-link-icono">→</span>
                  <span>Muebles</span>
                </a>
              </li>
              <li>
                <a href="#servicios" className="pie-link">
                  <span className="pie-link-icono">→</span>
                  <span>Servicios</span>
                </a>
              </li>
              <li>
                <a href="#nosotros" className="pie-link">
                  <span className="pie-link-icono">→</span>
                  <span>Nosotros</span>
                </a>
              </li>
              <li>
                <a href="#contacto" className="pie-link">
                  <span className="pie-link-icono">→</span>
                  <span>Contacto</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="pie-seccion">
            <h4 className="pie-titulo-seccion">Contacto</h4>
            <address className="pie-contacto">
              <div className="pie-contacto-item">
                <svg className="pie-icono" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                </svg>
                <p>Av. Principal 123, Ciudad</p>
              </div>
              <div className="pie-contacto-item">
                <svg className="pie-icono" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
                </svg>
                <p>+54 381 6322-353</p>
              </div>
              <div className="pie-contacto-item">
                <svg className="pie-icono" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
                </svg>
                <p>info@cortea.com</p>
              </div>
            </address>
          </div>
        </div>
        
        <div className="pie-separador"></div>
        
        <div className="copyright">
          <p>&copy; {anioActual} <strong>Corte A</strong>. Todos los derechos reservados.</p>
          <p className="copyright-subtitulo">Carpintería artesanal de calidad</p>
        </div>
      </div>
    </footer>
  )
}

export default PieDePagina 