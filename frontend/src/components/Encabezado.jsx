import { useState, useEffect } from 'react'
import '../styles/Encabezado.css'

function Encabezado({ cambiarSeccion, seccionActual }) {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Detectar scroll para cambiar la apariencia del encabezado
  useEffect(() => {
    const handleScroll = () => {
      // Si hacemos scroll más de 50px, cambiamos el estado
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    // Añadir el event listener
    window.addEventListener('scroll', handleScroll)
    
    // Limpieza del event listener al desmontar
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto)
    // Si abrimos el menú, prevenimos scroll en el body
    if (!menuAbierto) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }

  const handleClick = (seccion) => {
    cambiarSeccion(seccion)
    setMenuAbierto(false)
    document.body.style.overflow = 'auto'
    
    // Hacer scroll suave a la sección correspondiente
    const seccionId = seccion === 'inicio' ? 'inicio' : 
                      seccion === 'nosotros' ? 'nosotros' :
                      seccion === 'servicios' ? 'servicios' :
                      seccion === 'contacto' ? 'contacto' :
                      seccion === 'proyectos' ? 'proyectos' :
                      seccion === 'galeria' ? 'galeria' : null
    
    if (seccionId) {
      const elemento = document.getElementById(seccionId)
      if (elemento) {
        const headerHeight = 80 // Altura aproximada del header
        const elementoPosicion = elemento.offsetTop - headerHeight
        
        window.scrollTo({
          top: elementoPosicion,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <>
      {/* Overlay para menú móvil */}
      <div className={`menu-overlay ${menuAbierto ? 'abierto' : ''}`} onClick={toggleMenu}></div>
      
      <header className={`encabezado ${scrolled ? 'scrolled' : ''}`}>
        <div className="encabezado-contenido">
          <div className="logo">
            <a 
              href="#inicio" 
              onClick={(e) => {
                e.preventDefault();
                handleClick('inicio');
              }}
            >
              <img src="/assets/favicon.ico" alt="Logo" className="logo-icon" />
            </a>
          </div>
          
          <button className={`menu-toggle ${menuAbierto ? 'abierto' : ''}`} onClick={toggleMenu}>
            <span className="barra"></span>
            <span className="barra"></span>
            <span className="barra"></span>
          </button>
          
          <nav className={`navegacion ${menuAbierto ? 'abierto' : ''}`}>
            <ul className="menu">
              <li className={seccionActual === 'inicio' ? 'activo' : ''}>
                <a 
                  href="#inicio" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick('inicio');
                  }}
                >
                  Inicio
                </a>
              </li>
              <li className={seccionActual === 'nosotros' ? 'activo' : ''}>
                <a 
                  href="#nosotros" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick('nosotros');
                  }}
                >
                  Nosotros
                </a>
              </li>
              <li className={seccionActual === 'proyectos' ? 'activo' : ''}>
                <a 
                  href="#proyectos" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick('proyectos');
                  }}
                >
                  Proyectos
                </a>
              </li>
              <li className={seccionActual === 'contacto' ? 'activo' : ''}>
                <a 
                  href="#contacto" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick('contacto');
                  }}
                >
                  Contacto
                </a>
              </li>
              <li className={seccionActual === 'galeria' ? 'activo' : ''}>
                <a 
                  href="#galeria" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick('galeria');
                  }}
                >
                  Galería
                </a>
              </li>
              <li className={seccionActual === 'servicios' ? 'activo' : ''}>
                <a 
                  href="#servicios" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick('servicios');
                  }}
                >
                  Servicios
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Encabezado 