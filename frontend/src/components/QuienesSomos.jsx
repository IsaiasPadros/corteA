import '../styles/QuienesSomos.css'
import { useEffect, useRef, useState } from 'react'

function QuienesSomos() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`quienes-somos ${isVisible ? 'visible' : ''}`}
      data-section="quienes-somos"
    >
      <div className="quienes-somos-contenedor">
        <div className="quienes-somos-izquierda">
          <div className="quienes-somos-decoracion"></div>
          <h2 className="quienes-somos-titulo">Quiénes Somos</h2>
          
          <div className="quienes-somos-contenido">
            <p className="quienes-somos-intro">
              En <strong>Corte A</strong> somos especialistas en carpintería artesanal con una pasión 
              por transformar espacios interiores a través del diseño y la calidad. Nuestra experiencia 
              nos permite ofrecer soluciones únicas que combinan funcionalidad, estética y durabilidad.
            </p>

            <p className="quienes-somos-parrafo">
              Nos especializamos en la creación de muebles a medida, placares personalizados y 
              proyectos de carpintería integral. Cada pieza que diseñamos refleja nuestro compromiso 
              con la excelencia, utilizando materiales de primera calidad y técnicas tradicionales 
              perfeccionadas con tecnología moderna.
            </p>

            <p className="quienes-somos-parrafo">
              Nuestro compromiso va más allá de la fabricación. Trabajamos de cerca con cada cliente 
              para entender sus necesidades, espacios y estilo de vida, garantizando que cada proyecto 
              no solo cumpla con las expectativas, sino que las supere. Ya sea para hogares, 
              oficinas o espacios comerciales, nuestro equipo está preparado para hacer realidad 
              tu visión con precisión y dedicación.
            </p>
          </div>
        </div>

        <div className="quienes-somos-derecha">
          <div className="quienes-somos-visual">
            <div className="quienes-somos-cuadro-principal">
              <div className="quienes-somos-cuadro-contenido">
                <span className="quienes-somos-numero">+</span>
                <span className="quienes-somos-numero-grande">100</span>
                <p className="quienes-somos-metrica">Proyectos completados</p>
              </div>
            </div>
            
            <div className="quienes-somos-valores">
              <div className="quienes-somos-valor">
                <div className="quienes-somos-valor-icono">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="quienes-somos-valor-contenido">
                  <h3>Calidad</h3>
                  <p>Materiales seleccionados y procesos rigurosos</p>
                </div>
              </div>

              <div className="quienes-somos-valor">
                <div className="quienes-somos-valor-icono">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6V12L16 14" 
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="quienes-somos-valor-contenido">
                  <h3>Compromiso</h3>
                  <p>Entrega puntual y atención personalizada</p>
                </div>
              </div>

              <div className="quienes-somos-valor">
                <div className="quienes-somos-valor-icono">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" 
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" 
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" 
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" 
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="quienes-somos-valor-contenido">
                  <h3>Cercanía</h3>
                  <p>Un equipo dedicado a entender tu proyecto</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuienesSomos;

