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
  

  // Función para abrir WhatsApp
  const abrirWhatsApp = () => {
    const numero = '3816322353';
    const mensaje = encodeURIComponent('Hola, me interesa conocer más sobre los servicios de Corte A.');
    const url = `https://wa.me/${numero}?text=${mensaje}`;
    window.open(url, '_blank');
  };

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

      {/* Sección de contacto con Corte A */}
      <section 
        data-section="servicios" 
        className={`section-animate ${isVisible.servicios ? 'visible' : ''}`}
      >
        <div className="contacto-cortea">
          <div className="contacto-cortea-contenedor">
            <div className="contacto-cortea-izquierda">
              <div className="contacto-cortea-decoracion"></div>
              <h2>Hablemos de tu proyecto</h2>
              <p className="contacto-cortea-descripcion">
                En Corte A, transformamos tus ideas en espacios únicos. 
                Nuestro equipo está listo para asesorarte y hacer realidad 
                tu visión con la más alta calidad en carpintería artesanal.
              </p>
              <div className="contacto-cortea-destacado">
                <p className="contacto-cortea-subtitulo">
                  ¿Tienes alguna consulta o proyecto en mente?
                </p>
                <p className="contacto-cortea-invitacion">
                  Contáctanos ahora y recibe atención personalizada
                </p>
              </div>
            </div>
            <div className="contacto-cortea-derecha">
              <div className="contacto-cortea-cuadro">
                <div className="contacto-cortea-icono">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3>Contacta con Corte A</h3>
                <p className="contacto-cortea-texto">
                  Estamos aquí para ayudarte. Escríbenos directamente 
                  por WhatsApp y te responderemos a la brevedad.
                </p>
                <button 
                  onClick={abrirWhatsApp}
                  className="boton-whatsapp"
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="boton-whatsapp-icono">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="currentColor"/>
                  </svg>
                  <span>Escribir por WhatsApp</span>
                </button>
                <p className="contacto-cortea-numero">+54 381 6322-353</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de contacto rápido */}
      {/* <section 
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
      </section> */}
    </div>
  )
}

export default Inicio 