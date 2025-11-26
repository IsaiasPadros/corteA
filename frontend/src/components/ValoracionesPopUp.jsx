import '../styles/ValoracionesPopUp.css'
import { useEffect, useState } from 'react'

function ValoracionesPopUp() {
  const [activePopUps, setActivePopUps] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  // Posiciones dispersas y rotaciones aleatorias para cada tarjeta
  // Distribuidas de forma orgánica con solapamiento sutil pero sin ocultar contenido
  // Las tarjetas se superponen ligeramente pero mantienen visibilidad del contenido
  const posiciones = [
    { top: '2%', left: '1%', rotation: -3, zIndex: 1 },
    { top: '12%', left: '62%', rotation: 4, zIndex: 2 },
    { top: '3%', left: '35%', rotation: -2, zIndex: 3 },
    { top: '38%', left: '5%', rotation: 5, zIndex: 4 },
    { top: '48%', left: '65%', rotation: -4, zIndex: 5 },
    { top: '28%', left: '45%', rotation: 3, zIndex: 6 }
  ];

  const valoraciones = [
    {
      id: 1,
      nombre: 'María González',
      profesion: 'Arquitecta de Interiores',
      foto: 'https://i.pravatar.cc/150?img=47',
      calificacion: 5,
      texto: 'Corte A transformó completamente mi hogar. La calidad de sus muebles artesanales es excepcional. Cada pieza cuenta una historia y se nota el amor por el detalle.',
      tiempo: 'Hace 2 semanas',
      color: '#C9B59C',
      ...posiciones[0]
    },
    {
      id: 2,
      nombre: 'Carlos Mendoza',
      profesion: 'Diseñador',
      foto: 'https://i.pravatar.cc/150?img=12',
      calificacion: 5,
      texto: 'Increíble experiencia de principio a fin. El equipo de Corte A entendió perfectamente mi visión y la materializó con una precisión impresionante.',
      tiempo: 'Hace 1 mes',
      color: '#8B7355',
      ...posiciones[1]
    },
    {
      id: 3,
      nombre: 'Ana Rodríguez',
      profesion: 'Propietaria de Restaurante',
      foto: 'https://i.pravatar.cc/150?img=20',
      calificacion: 5,
      texto: 'Los muebles que encargué para mi restaurante son la envidia de todos. Corte A no solo cumple, supera expectativas. Profesionalismo y calidad premium.',
      tiempo: 'Hace 3 semanas',
      color: '#D9CFC7',
      ...posiciones[2]
    },
    {
      id: 4,
      nombre: 'Roberto Silva',
      profesion: 'Empresario',
      foto: 'https://i.pravatar.cc/150?img=33',
      calificacion: 5,
      texto: 'He trabajado con muchos carpinteros, pero Corte A está en otro nivel. La atención personalizada y el resultado final son simplemente perfectos.',
      tiempo: 'Hace 2 meses',
      color: '#C9B59C',
      ...posiciones[3]
    },
    {
      id: 5,
      nombre: 'Laura Fernández',
      profesion: 'Decoradora',
      foto: 'https://i.pravatar.cc/150?img=45',
      calificacion: 5,
      texto: 'Recomiendo Corte A a todos mis clientes. Sus muebles no son solo funcionales, son obras de arte que elevan cualquier espacio.',
      tiempo: 'Hace 1 semana',
      color: '#8B7355',
      ...posiciones[4]
    },
    {
      id: 6,
      nombre: 'Diego Martínez',
      profesion: 'Fotógrafo',
      foto: 'https://i.pravatar.cc/150?img=15',
      calificacion: 5,
      texto: 'El escritorio que me diseñaron es mi lugar favorito de trabajo. La combinación de funcionalidad y estética es perfecta. ¡Gracias Corte A!',
      tiempo: 'Hace 3 semanas',
      color: '#D9CFC7',
      ...posiciones[5]
    }
  ];

  const iniciarPopUps = () => {
    // Limpiar cualquier timeout anterior
    setActivePopUps([]);
    
    // En móviles, mostrar todos inmediatamente
    const isMobile = window.innerWidth <= 992;
    
    if (isMobile) {
      // En móviles, mostrar todos los pop-ups inmediatamente
      setActivePopUps(valoraciones.map(v => v.id));
    } else {
      // En desktop, mostrar pop-ups de forma secuencial
      valoraciones.forEach((valoracion, index) => {
        setTimeout(() => {
          setActivePopUps((prev) => {
            if (!prev.includes(valoracion.id)) {
              return [...prev, valoracion.id];
            }
            return prev;
          });
        }, index * 600); // Cada 600ms aparece uno nuevo
      });
    }
  };

  useEffect(() => {
    // Observador para detectar cuando la sección es visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // Iniciar la secuencia de pop-ups
            iniciarPopUps();
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = document.querySelector('.valoraciones-seccion');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const renderEstrellas = (calificacion) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className="estrella"
        viewBox="0 0 24 24"
        fill={i < calificacion ? 'currentColor' : 'none'}
        stroke="currentColor"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  return (
    <section className="valoraciones-seccion">
      <div className="valoraciones-contenedor">
        <div className="valoraciones-header">
          <div className="valoraciones-titulo-wrapper">
            <span className="valoraciones-badge">Testimonios</span>
            <h2 className="valoraciones-titulo">
              Lo que dicen nuestros clientes
            </h2>
            <p className="valoraciones-subtitulo">
              Experiencias reales de quienes confiaron en Corte A
            </p>
          </div>
        </div>

        <div className="valoraciones-canvas">
          {/* Tablero de madera de fondo */}
          <div className="tablero-madera"></div>
          
          {valoraciones.map((valoracion, index) => {
            const isActive = activePopUps.includes(valoracion.id);

            return (
              <div
                key={valoracion.id}
                className={`valoracion-popup ${isActive ? 'active' : ''}`}
                style={{
                  '--delay': `${index * 0.2}s`,
                  '--top': valoracion.top,
                  '--left': valoracion.left,
                  '--rotation': `${valoracion.rotation}deg`,
                  '--color-accent': valoracion.color,
                  '--z-index': valoracion.zIndex || index + 1,
                }}
              >
                <div className="popup-content">
                  {/* Clavos en las esquinas - dentro del contenido para alineación perfecta */}
                  <div className="clavo clavo-top-left"></div>
                  <div className="clavo clavo-top-right"></div>
                  <div className="clavo clavo-bottom-left"></div>
                  <div className="clavo clavo-bottom-right"></div>
                  <div className="popup-header">
                    <div className="popup-avatar-wrapper">
                      <img
                        src={valoracion.foto}
                        alt={valoracion.nombre}
                        className="popup-avatar"
                      />
                      <div className="popup-avatar-ring"></div>
                    </div>
                    <div className="popup-info">
                      <h3 className="popup-nombre">{valoracion.nombre}</h3>
                      <p className="popup-profesion">{valoracion.profesion}</p>
                    </div>
                  </div>
                  
                  <div className="popup-estrellas">
                    {renderEstrellas(valoracion.calificacion)}
                  </div>
                  
                  <p className="popup-texto">{valoracion.texto}</p>
                  
                  <div className="popup-footer">
                    <span className="popup-tiempo">{valoracion.tiempo}</span>
                    <div className="popup-verificado">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                      </svg>
                      <span>Verificado</span>
                    </div>
                  </div>
                  
                  <div className="popup-decoracion"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicador de más valoraciones */}
        <div className="valoraciones-indicador">
          <div className="indicador-puntos">
            {valoraciones.map((_, index) => (
              <span
                key={index}
                className={`indicador-punto ${
                  activePopUps.includes(valoraciones[index]?.id) ? 'active' : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ValoracionesPopUp;

