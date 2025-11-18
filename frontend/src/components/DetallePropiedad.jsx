import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DetallePropiedad.css';

const DetallePropiedad = ({ propiedad }) => {
  const [tabActiva, setTabActiva] = useState('foto');
  
  // Efecto para hacer scroll al principio de la página cuando se monta el componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Datos hardcodeados para asegurar que siempre se muestre algo
  const propiedadDetalle = {
    id: 1,
    titulo: 'Casa Moderna con Jardín',
    direccion: 'Montevideo 1700',
    ubicacion: 'Recoleta - Capital Federal',
    precio: 'USD 1.250.000',
    descripcion: 'Espectacular casa moderna con amplios espacios, terminaciones de primera calidad y un hermoso jardín. Ideal para familias que buscan confort y elegancia en una de las mejores zonas.',
    caracteristicas: {
      superficie_total: '512.73 m²',
      superficie_cubierta: '486.18 M²',
      ambientes: '9 ambientes',
      dormitorios: '5 dormitorios',
      banos: '4 baños',
      cocheras: '2 cocheras',
      antiguedad: '8 años',
      orientacion: 'Norte'
    },
    imagenes: [
      {
        url: 'https://cdn-images.xintelweb.com/upload/jai655_2.jpg?132749',
        tipo: 'principal'
      },
      {
        url: 'https://cdn-images.xintelweb.com/upload/jai655_3.jpg?132750',
        tipo: 'interior'
      },
      {
        url: 'https://cdn-images.xintelweb.com/upload/jai655_4.jpg?132751',
        tipo: 'interior'
      }
    ]
  };
  
  console.log("Propiedad recibida:", propiedad); // Para depuración

  return (
    <div className="detalle-propiedad">
      <div className="detalle-volver">
       
      </div>
      
      <div className="detalle-contenedor">
        <div className="detalle-galeria">
          <div className="galeria-principal">
            <img 
              src={propiedadDetalle.imagenes[0].url} 
              alt={propiedadDetalle.titulo} 
              className="imagen-principal"
            />
            
            <div className="galeria-miniaturas">
              {propiedadDetalle.imagenes.slice(1).map((img, index) => (
                <img 
                  key={index} 
                  src={img.url} 
                  alt={`${propiedadDetalle.titulo} - Imagen ${index + 2}`}
                  className="miniatura"
                />
              ))}
              <button className="boton-mas-fotos">Ver más fotos</button>
            </div>
            
            <div className="galeria-opciones">
              <button 
                className={`opcion ${tabActiva === 'foto' ? 'activa' : ''}`}
                onClick={() => setTabActiva('foto')}
              >
                <i className="icono-foto">📷</i> FOTO
              </button>
              <button 
                className={`opcion ${tabActiva === 'video' ? 'activa' : ''}`}
                onClick={() => setTabActiva('video')}
              >
                <i className="icono-video">🎥</i> VIDEO
              </button>
              <button 
                className={`opcion ${tabActiva === 'plano' ? 'activa' : ''}`}
                onClick={() => setTabActiva('plano')}
              >
                <i className="icono-plano">📐</i> PLANO
              </button>
              <button 
                className={`opcion ${tabActiva === 'mapa' ? 'activa' : ''}`}
                onClick={() => setTabActiva('mapa')}
              >
                <i className="icono-mapa">📍</i> MAPA
              </button>
              <button 
                className={`opcion ${tabActiva === '360' ? 'activa' : ''}`}
                onClick={() => setTabActiva('360')}
              >
                <i className="icono-360">🔄</i> 360°
              </button>
            </div>

            {/* Nueva sección de Características de la Propiedad */}
            <div className="galeria-caracteristicas-propiedad">
              <h3>CARACTERÍSTICAS DE LA PROPIEDAD</h3>
              <ul>
                <li><span>✓</span> Operación: Venta</li>
                <li><span>✓</span> Localidad: Yerba Buena</li>
                <li><span>✓</span> Barrio: Praderas</li>
                <li><span>✓</span> Dirección: Country Praderas</li>
                <li><span>✓</span> Ambientes: 3 dormitorios</li>
                <li><span>✓</span> Antigüedad: 3 años</li>
                <li><span>✓</span> Ubicación: Frente</li>
                <li><span>✓</span> Orientación: Este</li>
                <li><span>✓</span> Tipo de Casa: Casa 2 Plantas</li>
                <li><span>✓</span> Amoblado: Sí</li>
                <li><span>✓</span> Dependencia: Sí</li>
                <li><span>✓</span> Pisos: 2</li>
                <li><span>✓</span> Agua caliente: Calorama</li>
                <li><span>✓</span> Aire acondicionado: 8 equipos Split</li>
                <li><span>✓</span> Gas Natural</li>
                <li><span>✓</span> Baños: 5</li>
                <li><span>✓</span> Cocheras: 2</li>
                <li><span>✓</span> Pavimento: Sí</li>
                <li><span>✓</span> Cloaca: Sí</li>
                <li><span>✓</span> Línea telefónica: Sí</li>
                <li><span>✓</span> Acepta Mascotas: SI</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="detalle-info">
          <div className="detalle-info-principal">
            <div className="detalle-encabezado">
              <h1 className="detalle-titulo">{propiedadDetalle.precio}</h1>
              <h2 className="detalle-direccion">{propiedadDetalle.direccion}</h2>
              <p className="detalle-ubicacion">{propiedadDetalle.ubicacion}</p>
              <button className="boton-compartir">
                <i className="icono-compartir">↗️</i>
              </button>
            </div>
            
            <div className="detalle-caracteristicas">
              <div className="caracteristica">
                <div className="caracteristica-icono">📏</div>
                <div className="caracteristica-valor">{propiedadDetalle.caracteristicas.superficie_total}</div>
                <div className="caracteristica-etiqueta">Sup. Total</div>
              </div>
              <div className="caracteristica">
                <div className="caracteristica-icono">🏠</div>
                <div className="caracteristica-valor">{propiedadDetalle.caracteristicas.superficie_cubierta}</div>
                <div className="caracteristica-etiqueta">Sup. Cubierta</div>
              </div>
              <div className="caracteristica">
                <div className="caracteristica-icono">🚪</div>
                <div className="caracteristica-valor">{propiedadDetalle.caracteristicas.ambientes}</div>
                <div className="caracteristica-etiqueta">Ambientes</div>
              </div>
              <div className="caracteristica">
                <div className="caracteristica-icono">🛏️</div>
                <div className="caracteristica-valor">{propiedadDetalle.caracteristicas.dormitorios}</div>
                <div className="caracteristica-etiqueta">Dormitorios</div>
              </div>
            </div>
            
            <div className="detalle-descripcion">
              <h3>Descripción</h3>
              <p>{propiedadDetalle.descripcion}</p>
            </div>
            
            <div className="detalle-adicionales">
              <h3>Características adicionales</h3>
              <div className="adicionales-grid">
                <div className="adicional-item">
                  <span className="adicional-etiqueta">Baños:</span>
                  <span className="adicional-valor">{propiedadDetalle.caracteristicas.banos}</span>
                </div>
                <div className="adicional-item">
                  <span className="adicional-etiqueta">Cocheras:</span>
                  <span className="adicional-valor">{propiedadDetalle.caracteristicas.cocheras}</span>
                </div>
                <div className="adicional-item">
                  <span className="adicional-etiqueta">Antigüedad:</span>
                  <span className="adicional-valor">{propiedadDetalle.caracteristicas.antiguedad}</span>
                </div>
                <div className="adicional-item">
                  <span className="adicional-etiqueta">Orientación:</span>
                  <span className="adicional-valor">{propiedadDetalle.caracteristicas.orientacion}</span>
                </div>
              </div>
            </div>

            <div className="detalle-contacto">
              <h3>Consultar por esta propiedad</h3>
              <form className="formulario-contacto">
                <div className="campo-formulario">
                  <input 
                    type="text" 
                    placeholder="Nombre y apellido" 
                    className="input-formulario"
                  />
                </div>
                <div className="campo-formulario">
                  <input 
                    type="tel" 
                    placeholder="Teléfono" 
                    className="input-formulario"
                  />
                </div>
                <div className="campo-formulario">
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="input-formulario"
                  />
                </div>
                <div className="campo-formulario">
                  <textarea 
                    placeholder="Mensaje" 
                    className="textarea-formulario"
                    rows="4"
                  ></textarea>
                </div>
                <div className="campo-formulario">
                  <button type="submit" className="boton-enviar">Enviar consulta</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallePropiedad; 