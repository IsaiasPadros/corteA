import '../styles/PieDePagina.css'

function PieDePagina() {
  const anioActual = new Date().getFullYear()
  
  return (
    <footer className="pie-de-pagina">
      <div className="contenedor">
        <div className="pie-contenido">
          <div className="pie-seccion">
            <h3>Corte A </h3>
            <p>Creemos que amoblar es sinónimo de invertir en tus sueños</p>
          </div>
          
          <div className="pie-seccion">
            <h4>Enlaces Rápidos</h4>
            <ul className="pie-links">
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#propiedades">Muebles</a></li>
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#nosotros">Nosotros</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </div>
          
          <div className="pie-seccion">
            <h4>Contacto</h4>
            <address>
              <p>Av. Principal 123, Ciudad</p>
              <p>Teléfono: (123) 456-7890</p>
              <p>Email: info@cortea.com</p>
            </address>
          </div>
        </div>
        
        <div className="copyright">
          <p>&copy; {anioActual} Corte A. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default PieDePagina 