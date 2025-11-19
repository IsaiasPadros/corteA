import '../styles/Inicio.css'
import TarjetaPropiedad from './TarjetaPropiedad'
import DestacadosSeccion from './DestacadosSeccion'
import { useEffect, useRef, useState } from 'react'

function Inicio() {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState({
    propiedades: false,
    servicios: false,
    contacto: false
  });

  // Efecto para manejar el video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Error al reproducir el video:", error);
      });
    }
    
    // Configurar el observador de intersección para animaciones
    const observerOptions = {
      threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target.getAttribute('data-section');
          if (section) {
            setIsVisible(prev => ({...prev, [section]: true}));
          }
        }
      });
    }, observerOptions);
    
    // Observar secciones
    const sections = document.querySelectorAll('.section-animate');
    sections.forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Propiedades destacadas (muestra de datos para el ejemplo)
  const propiedadesDestacadas = [
    {
      id: 1,
      titulo: 'Casa Moderna con Jardín',
      ubicacion: 'Barrio Residencial, Ciudad',
      precio: '250,000',
      habitaciones: 3,
      banos: 2,
      metros: 150,
      imagen: 'https://cdn-images.xintelweb.com/upload/jai655_2.jpg?132749'
    },
    {
      id: 2,
      titulo: 'Apartamento Céntrico',
      ubicacion: 'Centro, Ciudad',
      precio: '180,000',
      habitaciones: 2,
      banos: 1,
      metros: 85,
      imagen: 'https://cdn-images.xintelweb.com/upload/jai803_2.jpg?159963'
    },
    {
      id: 3,
      titulo: 'Chalet con Piscina',
      ubicacion: 'Zona Residencial, Ciudad',
      precio: '350,000',
      habitaciones: 4,
      banos: 3,
      metros: 220,
      imagen: 'https://cdn-images.xintelweb.com/upload/jai531_2.jpg?352790'
    }
  ]

  // Servicios destacados
  const serviciosDestacados = [
    {
      id: 1,
      titulo: 'Compra de Propiedades',
      descripcion: 'Te ayudamos a encontrar la propiedad de tus sueños.',
      icono: '🏠'
    },
    {
      id: 2,
      titulo: 'Venta de Propiedades',
      descripcion: 'Vendemos tu propiedad al mejor precio del mercado.',
      icono: '💰'
    },
    {
      id: 3,
      titulo: 'Asesoría Legal',
      descripcion: 'Asesoría completa en todos los trámites inmobiliarios.',
      icono: '📝'
    },
    {
      id: 4,
      titulo: 'Proyectos de Inversión',
      descripcion: 'Ofrecemos oportunidades inmobiliarias exclusivas y asesoramiento integral para maximizar tu inversión con visión estratégica.',
      icono: '🏗️'
    },
    {
      id: 5,
      titulo: 'Tasaciones Profesionales',
      descripcion: 'Realizamos valuaciones precisas y confiables para ayudarte a tomar decisiones informadas sobre tu propiedad.',
      icono: '📊'
    },
    {
      id: 6,
      titulo: 'Administración de Propiedades',
      descripcion: 'Gestionamos tus propiedades en alquiler, ocupándonos del mantenimiento, cobros y atención a inquilinos para tu tranquilidad.',
      icono: '🏢'
    }
  ]

  return (
    <div className="inicio">
      {/* Banner con video */}
      <section className="banner">
        <video 
          ref={videoRef}
          className="banner-video"
          autoPlay 
          loop 
          muted 
          playsInline
          poster="https://via.placeholder.com/1920x1080/C9B59C/F9F8F6?text=Inmobiliaria"
        >
          <source src="https://assets.mixkit.co/videos/4009/4009-720.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
        <div className="banner-overlay"></div>
        <div className="banner-contenido">
          <h2>Encuentra la propiedad de tus sueños</h2>
          <p>Las mejores opciones en venta y alquiler en toda la ciudad</p>
          <a href="#propiedades" className="boton-principal">Explorar Propiedades</a>
          <div className="scroll-indicador">↓</div>
        </div>
      </section>

      {/* Sección de propiedades destacadas */}
      <section 
        data-section="propiedades" 
        className={`section-animate ${isVisible.propiedades ? 'visible' : ''}`}
      >
        <DestacadosSeccion 
          titulo="Propiedades Destacadas" 
          subtitulo="Las mejores opciones seleccionadas para ti"
        >
          <div className="propiedades-grid">
            {propiedadesDestacadas.map(propiedad => (
              <TarjetaPropiedad 
                key={propiedad.id} 
                propiedad={propiedad} 
              />
            ))}
          </div>
          <div className="centrado">
            <a href="#propiedades" className="boton-secundario">Ver Todas las Propiedades</a>
          </div>
        </DestacadosSeccion>
      </section>

      {/* Sección de servicios */}
      <section 
        data-section="servicios" 
        className={`section-animate ${isVisible.servicios ? 'visible' : ''}`}
      >
        <DestacadosSeccion 
          titulo="Nuestros Servicios" 
          subtitulo="Soluciones inmobiliarias completas"
          fondo="gris"
        >
          <div className="servicios-grid">
            {serviciosDestacados.map((servicio) => (
              <div key={servicio.id} className="tarjeta-servicio">
                <div className="servicio-icono">{servicio.icono}</div>
                <h3>{servicio.titulo}</h3>
                <p>{servicio.descripcion}</p>
              </div>
            ))}
          </div>
        </DestacadosSeccion>
      </section>

      {/* Sección de contacto rápido */}
      <section 
        data-section="contacto" 
        className={`contacto-rapido section-animate ${isVisible.contacto ? 'visible' : ''}`}
      >
        <div className="contacto-overlay"></div>
        <div className="contacto-contenido">
          <div className="contacto-decoracion"></div>
          <h2>¿Tienes alguna pregunta?</h2>
          <p>Nuestro equipo está listo para ayudarte</p>
          <a href="#contacto" className="boton-contacto">Contáctanos</a>
        </div>
      </section>
    </div>
  )
}

export default Inicio 