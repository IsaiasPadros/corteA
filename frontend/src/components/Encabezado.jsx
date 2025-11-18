import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
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
  }

  return (
    <>
      {/* Overlay para menú móvil */}
      <div className={`menu-overlay ${menuAbierto ? 'abierto' : ''}`} onClick={toggleMenu}></div>
      
      <header className={`encabezado ${scrolled ? 'scrolled' : ''}`}>
        <div className="encabezado-contenido">
          <div className="logo">
            <NavLink to="/" onClick={() => handleClick('inicio')}>
              <img src="/assets/favicon.ico" alt="Logo" className="logo-icon" />
              <h1 className="logo-text">Javier Pérez Alzaga</h1>
            </NavLink>
          </div>
          
          <button className={`menu-toggle ${menuAbierto ? 'abierto' : ''}`} onClick={toggleMenu}>
            <span className="barra"></span>
            <span className="barra"></span>
            <span className="barra"></span>
          </button>
          
          <nav className={`navegacion ${menuAbierto ? 'abierto' : ''}`}>
            <ul className="menu">
              <li className={seccionActual === 'inicio' ? 'activo' : ''}>
                <NavLink 
                  to="/" 
                  onClick={(e) => {
                    handleClick('inicio');
                  }}
                >
                  Inicio
                </NavLink>
              </li>
              <li className={seccionActual === 'propiedades' ? 'activo' : ''}>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick('propiedades');
                  }}
                >
                  Propiedades
                </a>
              </li>
              <li className={seccionActual === 'servicios' ? 'activo' : ''}>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick('servicios');
                  }}
                >
                  Servicios
                </a>
              </li>
              <li className={seccionActual === 'nosotros' ? 'activo' : ''}>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick('nosotros');
                  }}
                >
                  Nosotros
                </a>
              </li>
              <li className={seccionActual === 'contacto' ? 'activo' : ''}>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick('contacto');
                  }}
                >
                  Contacto
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