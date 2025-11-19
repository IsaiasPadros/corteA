import '../styles/Inicio.css'
import TarjetaPropiedad from './TarjetaPropiedad'
import DestacadosSeccion from './DestacadosSeccion'
import CategoriasMuebles from './CategoriasMuebles'
import { useEffect, useRef, useState } from 'react'

function Inicio() {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState({
    propiedades: false,
    categorias: false,
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

  // Productos más vendidos (muebles de carpintería)
  const productosMasVendidos = [
    {
      id: 1,
      titulo: 'Escritorio de Madera',
      ubicacion: 'Hecho a mano con madera maciza',
      precio: '45,000',
      habitaciones: 'Pino',
      banos: 'Natural',
      metros: '120x60',
      imagen: 'https://plus.unsplash.com/premium_photo-1664193968829-4a732c3390e6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8'
    },
    {
      id: 2,
      titulo: 'Mesa para Café',
      ubicacion: 'Diseño moderno y funcional',
      precio: '32,000',
      habitaciones: 'Roble',
      banos: 'Caoba',
      metros: '180x45',
      imagen: 'https://assets.weimgs.com/weimgs/ab/images/wcm/products/202528/0320/calla-coffee-table-48-xl.jpg'
    },
    {
      id: 3,
      titulo: 'Mueble para Ropa',
      ubicacion: 'Amplio espacio de almacenamiento',
      precio: '55,000',
      habitaciones: 'Cedro',
      banos: 'Claro',
      metros: '200x60',
      imagen: 'https://images.unsplash.com/photo-1649320101559-acf9dd4c5f5b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ];
  

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
          <source src="https://assets.mixkit.co/videos/39492/39492-720.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
        <div className="banner-overlay"></div>
        <div className="banner-contenido">
          <h2>Proyectamos tu espacio interior</h2>
          {/* <p>Creemos que amoblar es sinónimo de invertir en tus sueños</p> */}
          {/* <a href="#propiedades" className="boton-principal">Explorar Propiedades</a> */}
          {/* <div className="scroll-indicador">↓</div> */}
        </div>
      </section>

      {/* Sección de productos más vendidos */}
      <section 
        data-section="propiedades" 
        className={`section-animate ${isVisible.propiedades ? 'visible' : ''}`}
      >
        <DestacadosSeccion 
          titulo="Productos más vendidos" 
          subtitulo="Muebles de carpintería artesanal de la más alta calidad"
        >
          <div className="propiedades-grid">
            {productosMasVendidos.map(producto => (
              <TarjetaPropiedad 
                key={producto.id} 
                propiedad={producto} 
              />
            ))}
          </div>
          <div className="centrado">
            <a href="#productos" className="boton-secundario">Ver Todos los Productos</a>
          </div>
        </DestacadosSeccion>
      </section>

      {/* Sección de categorías de muebles */}
      <section 
        data-section="categorias" 
        className={`section-animate ${isVisible.categorias ? 'visible' : ''}`}
      >
        <CategoriasMuebles />
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