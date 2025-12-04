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
      id="nosotros"
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
          <div className="quienes-somos-estadisticas">
            <div className="quienes-somos-estadistica">
              <div className="quienes-somos-estadistica-numero">2020</div>
              <div className="quienes-somos-estadistica-label">
                <span>DESDE</span>
                <span>EL</span>
                <span>AÑO</span>
              </div>
              <p className="quienes-somos-estadistica-descripcion">
                Desde 2020 transformando hogares en Tucumán con experiencia comprobada y calidad superior.
              </p>
            </div>

            <div className="quienes-somos-divider"></div>

            <div className="quienes-somos-estadistica">
              <div className="quienes-somos-estadistica-numero">120+</div>
              <div className="quienes-somos-estadistica-label">PROYECTOS</div>
              <p className="quienes-somos-estadistica-descripcion">
                Más de 120 proyectos realizados con diseño personalizado adaptado al estilo de vida de cada cliente.
              </p>
            </div>

            <div className="quienes-somos-divider"></div>

            <div className="quienes-somos-estadistica">
              <div className="quienes-somos-estadistica-numero">100%</div>
              <div className="quienes-somos-estadistica-label">SATISFACCIÓN</div>
              <p className="quienes-somos-estadistica-descripcion">
                Compromiso total con el resultado final y garantía de satisfacción en cada proyecto entregado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuienesSomos;

