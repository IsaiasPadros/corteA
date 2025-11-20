import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../styles/DetalleProducto.css'

function DetalleProducto() {
  const { id } = useParams()
  const [acabadoSeleccionado, setAcabadoSeleccionado] = useState('Natural')
  const [tamañoSeleccionado, setTamañoSeleccionado] = useState('48"')
  const [imagenPrincipal, setImagenPrincipal] = useState(0)
  const [codigoPostal, setCodigoPostal] = useState('')
  const [planProteccion, setPlanProteccion] = useState(false)
  const [seccionAbierta, setSeccionAbierta] = useState(null)

  // Datos del producto (hardcodeados por ahora)
  const producto = {
    id: id || 2,
    titulo: 'Mesa para Café',
    categoria: 'MUEBLES > MESAS DE CENTRO',
    precio: '$32,000',
    disponible: true,
    imagenPrincipal: 'https://assets.weimgs.com/weimgs/ab/images/wcm/products/202528/0320/calla-coffee-table-48-xl.jpg',
    imagenes: [
      'https://assets.weimgs.com/weimgs/ab/images/wcm/products/202528/0320/calla-coffee-table-48-xl.jpg',
      'https://assets.weimgs.com/weimgs/ab/images/wcm/products/202531/0024/tencel-frame-rug-xl.jpg',
      'https://assets.weimgs.com/weimgs/ab/images/wcm/products/202528/0320/calla-coffee-table-48-1-xl.jpg',
      'https://assets.weimgs.com/weimgs/ab/images/wcm/products/202528/0320/calla-coffee-table-48-5-xl.jpg',
      'https://assets.weimgs.com/weimgs/ab/images/wcm/products/202528/0320/calla-coffee-table-48-3-xl.jpg',
      'https://assets.weimgs.com/weimgs/ab/images/wcm/products/202531/0027/calla-coffee-table-48-xl.jpg',
      'https://assets.weimgs.com/weimgs/ab/images/wcm/products/202528/0320/calla-coffee-table-48-6-xl.jpg',
      'https://assets.weimgs.com/weimgs/ab/images/wcm/products/202543/0014/calla-solid-wood-coffee-table-48-58-xl.jpg'
    ],
    acabados: [
      { nombre: 'Natural', color: '#D4A574', imagen: 'https://assets.weimgs.com/weimgs/ab/images/wcm/products/202528/0320/calla-coffee-table-48-xl.jpg' },
      { nombre: 'Caoba', color: '#8B4513', imagen: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&h=600&fit=crop' },
      { nombre: 'Nogal', color: '#5C4033', imagen: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop' }
    ],
    tamaños: [
      { tamaño: '48"', precio: '$32,000', disponible: true },
      { tamaño: '58"', precio: '$38,000', disponible: true },
      { tamaño: '68"', precio: '$44,000', disponible: false }
    ],
    descripcion: 'Mesa de centro de madera maciza con diseño moderno y funcional. Perfecta para complementar cualquier espacio de estar.'
  }

  const handleCambiarImagen = (index) => {
    setImagenPrincipal(index)
  }

  const handleActualizarCodigoPostal = () => {
    // Lógica para actualizar el código postal
    console.log('Código postal actualizado:', codigoPostal)
  }

  const toggleSeccion = (seccion) => {
    setSeccionAbierta(seccionAbierta === seccion ? null : seccion)
  }

  // Efecto para scroll al inicio y activar animaciones
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="detalle-producto">
      <div className="detalle-producto-contenedor">
        {/* Breadcrumbs */}
        <div className="breadcrumbs animado-breadcrumbs">
          <Link to="/">INICIO</Link>
          <span> / </span>
          <span>{producto.categoria}</span>
        </div>

        {/* Contenedor principal */}
        <div className="producto-layout">
          {/* Columna izquierda - Miniaturas */}
          <div className="producto-miniaturas animado-miniaturas">
            {producto.imagenes.map((imagen, index) => (
              <div
                key={index}
                className={`miniatura animado-miniatura ${imagenPrincipal === index ? 'activa' : ''}`}
                onClick={() => handleCambiarImagen(index)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img src={imagen} alt={`Vista ${index + 1}`} />
              </div>
            ))}
          </div>

          {/* Columna central - Imagen principal */}
          <div className="producto-imagen-principal animado-imagen">
            <img src={producto.imagenes[imagenPrincipal]} alt={producto.titulo} />
            <div className="imagen-caption animado-caption">
              {tamañoSeleccionado} mostrado en {acabadoSeleccionado}
            </div>
            <button className="boton-compartir-producto animado-compartir">
              <span>↑</span> Compartir
            </button>
          </div>

          {/* Columna derecha - Información del producto */}
          <div className="producto-informacion">
            <div className="producto-badge animado-badge">MÁS VENDIDO</div>
            <h1 className="producto-titulo animado-titulo">{producto.titulo} ({tamañoSeleccionado})</h1>
            <div className="producto-precio animado-precio">{producto.precio}</div>

            {/* Selector de acabado de madera */}
            <div className="selector-acabado animado-acabado">
              <label>Seleccionar Acabado de Madera: {acabadoSeleccionado}</label>
              <div className="acabados-grid">
                {producto.acabados.map((acabado, index) => (
                  <div
                    key={acabado.nombre}
                    className={`acabado-swatch animado-swatch ${acabadoSeleccionado === acabado.nombre ? 'seleccionado' : ''}`}
                    onClick={() => setAcabadoSeleccionado(acabado.nombre)}
                    style={{ 
                      backgroundColor: acabado.color,
                      animationDelay: `${0.4 + index * 0.1}s`
                    }}
                    title={acabado.nombre}
                  />
                ))}
              </div>
            </div>

            {/* Disponibilidad */}
            <div className="disponibilidad animado-disponibilidad">
              {producto.disponible ? (
                <span className="disponible">En Stock y Listo para Enviar</span>
              ) : (
                <span className="no-disponible">Agotado</span>
              )}
            </div>

            {/* Hecho a pedido */}
            <div className="hecho-pedido animado-pedido">
              <label>Hecho a Pedido</label>
              <div className="acabado-pedido">
                <div className="swatch-pedido" style={{ backgroundColor: '#000' }}></div>
              </div>
            </div>

            {/* Selector de tamaño */}
            <div className="selector-tamaño animado-tamaño">
              <label>Seleccionar Tamaño: {tamañoSeleccionado}</label>
              <div className="tamaños-grid">
                {producto.tamaños.map((tam, index) => (
                  <button
                    key={tam.tamaño}
                    className={`boton-tamaño animado-boton-tamaño ${tamañoSeleccionado === tam.tamaño ? 'seleccionado' : ''} ${!tam.disponible ? 'no-disponible' : ''}`}
                    onClick={() => tam.disponible && setTamañoSeleccionado(tam.tamaño)}
                    disabled={!tam.disponible}
                    style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                  >
                    {tam.tamaño}
                  </button>
                ))}
              </div>
            </div>

            {/* Entrega y recogida */}
            <div className="entrega-opciones animado-entrega">
              <div className="opcion-entrega">
                <input
                  type="radio"
                  id="entrega-white-glove"
                  name="entrega"
                  defaultChecked
                />
                <label htmlFor="entrega-white-glove">
                  Entrega con servicio completo
                  <span className="codigo-postal"> a {codigoPostal || 'T4000JKL'}</span>
                </label>
              </div>
              <div className="sin-estimacion">No hay estimación disponible.</div>
               
              <div className="input-codigo-postal">
                <input
                  type="text"
                  placeholder="Ingresa tu código postal para entrega y disponibilidad."
                  value={codigoPostal}
                  onChange={(e) => setCodigoPostal(e.target.value)}
                />
                {codigoPostal && (
                  <button
                    className="limpiar-codigo"
                    onClick={() => setCodigoPostal('')}
                  >
                    ×
                  </button>
                )}
              </div>
              <button className="boton-actualizar" onClick={handleActualizarCodigoPostal}>
                ACTUALIZAR
              </button>
            </div>

            {/* Plan de protección */}
            <div className="plan-proteccion animado-proteccion">
              <label className="checkbox-proteccion">
                <input
                  type="checkbox"
                  checked={planProteccion}
                  onChange={(e) => setPlanProteccion(e.target.checked)}
                />
                <span>
                  Agregar Plan de Protección Allstate de 3 años por $89.99{' '}
                  <span className="que-cubre">QUÉ CUBRE</span>
                </span>
              </label>
            </div>

            {/* Botón de agregar al carrito */}
            <button className="boton-agregar-carrito animado-carrito">
              <svg className="icono-carrito" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              Agregar a la cesta
            </button>
          </div>
        </div>

        {/* Sección de Sostenibilidad */}
        <div className="sostenibilidad-seccion animado-sostenibilidad">
          <div className="sostenibilidad-banner">
            <div className="sostenibilidad-texto">
              <h2>Bueno para las Personas,<br />Bueno para el Planeta</h2>
              <p>Así es como este producto marca la diferencia en el hogar y en el mundo:</p>
            </div>
            <div className="sostenibilidad-separador"></div>
            <div className="sostenibilidad-certificacion">
              <div className="certificacion-titulo">GREENGUARD</div>
              <div className="certificacion-descripcion">
                Producto certificado por bajas emisiones químicas. <a href="https://www.ul.com/gg" target="_blank" rel="noopener noreferrer">ul.com/gg</a> UL 2818
              </div>
            </div>
          </div>

          {/* Secciones Expandibles */}
          <div className="secciones-expandibles">
            <div className="seccion-expandible">
              <button 
                className={`seccion-header ${seccionAbierta === 'detalles' ? 'abierto' : ''}`}
                onClick={() => toggleSeccion('detalles')}
              >
                <span>Detalles</span>
                <svg 
                  className={`icono-chevron ${seccionAbierta === 'detalles' ? 'rotado' : ''}`}
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {seccionAbierta === 'detalles' && (
                <div className="seccion-contenido">
                  <p>Esta mesa para café está fabricada con madera maciza de origen sostenible, seleccionada cuidadosamente para garantizar durabilidad y belleza natural. El diseño moderno combina líneas limpias con acabados artesanales que resaltan la veta natural de la madera.</p>
                  <ul>
                    <li>Madera maciza de alta calidad</li>
                    <li>Acabado natural que preserva la belleza de la madera</li>
                    <li>Construcción robusta con uniones de carpintería tradicional</li>
                    <li>Diseño atemporal que se adapta a diversos estilos decorativos</li>
                    <li>Superficie resistente a manchas y rayones</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="seccion-expandible">
              <button 
                className={`seccion-header ${seccionAbierta === 'dimensiones' ? 'abierto' : ''}`}
                onClick={() => toggleSeccion('dimensiones')}
              >
                <span>Dimensiones</span>
                <svg 
                  className={`icono-chevron ${seccionAbierta === 'dimensiones' ? 'rotado' : ''}`}
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {seccionAbierta === 'dimensiones' && (
                <div className="seccion-contenido">
                  <div className="dimensiones-grid">
                    <div className="dimension-item">
                      <strong>48" (122 cm)</strong>
                      <p>Ancho: 48" (122 cm)</p>
                      <p>Profundidad: 24" (61 cm)</p>
                      <p>Alto: 18" (46 cm)</p>
                      <p>Peso: 35 kg</p>
                    </div>
                    <div className="dimension-item">
                      <strong>58" (147 cm)</strong>
                      <p>Ancho: 58" (147 cm)</p>
                      <p>Profundidad: 28" (71 cm)</p>
                      <p>Alto: 18" (46 cm)</p>
                      <p>Peso: 42 kg</p>
                    </div>
                    <div className="dimension-item">
                      <strong>68" (173 cm)</strong>
                      <p>Ancho: 68" (173 cm)</p>
                      <p>Profundidad: 32" (81 cm)</p>
                      <p>Alto: 18" (46 cm)</p>
                      <p>Peso: 50 kg</p>
                    </div>
                  </div>
                  <p className="nota-dimensiones">* Las dimensiones pueden variar ligeramente debido a la naturaleza de la madera maciza.</p>
                </div>
              )}
            </div>

            <div className="seccion-expandible">
              <button 
                className={`seccion-header ${seccionAbierta === 'ensamblaje' ? 'abierto' : ''}`}
                onClick={() => toggleSeccion('ensamblaje')}
              >
                <span>Ensamblaje y Cuidado</span>
                <svg 
                  className={`icono-chevron ${seccionAbierta === 'ensamblaje' ? 'rotado' : ''}`}
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {seccionAbierta === 'ensamblaje' && (
                <div className="seccion-contenido">
                  <h4>Ensamblaje</h4>
                  <p>Esta mesa viene completamente ensamblada y lista para usar. No se requiere montaje adicional. Nuestro equipo de entrega la colocará en el lugar que desees.</p>
                  
                  <h4>Cuidado y Mantenimiento</h4>
                  <ul>
                    <li><strong>Limpieza diaria:</strong> Usa un paño suave y ligeramente húmedo. Evita productos químicos agresivos.</li>
                    <li><strong>Protección:</strong> Usa manteles o salvamanteles para proteger la superficie de objetos calientes o líquidos.</li>
                    <li><strong>Humedad:</strong> Mantén la mesa alejada de fuentes de calor excesivo y humedad extrema para preservar la madera.</li>
                    <li><strong>Acabado:</strong> Aplica aceite para muebles de madera cada 6-12 meses para mantener el brillo natural.</li>
                    <li><strong>Reposicionamiento:</strong> Si necesitas mover la mesa, levántala completamente; no la arrastres.</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="seccion-expandible">
              <button 
                className={`seccion-header ${seccionAbierta === 'envio' ? 'abierto' : ''}`}
                onClick={() => toggleSeccion('envio')}
              >
                <span>Envío y Devoluciones</span>
                <svg 
                  className={`icono-chevron ${seccionAbierta === 'envio' ? 'rotado' : ''}`}
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {seccionAbierta === 'envio' && (
                <div className="seccion-contenido">
                  <h4>Envío</h4>
                  <ul>
                    <li><strong>Entrega con servicio completo:</strong> Nuestro equipo entregará y colocará la mesa en la habitación de tu elección.</li>
                    <li><strong>Tiempo de entrega:</strong> 7-14 días hábiles después de la confirmación del pedido.</li>
                    <li><strong>Embalaje:</strong> La mesa viene protegida con materiales ecológicos y reciclables.</li>
                    <li><strong>Inspección:</strong> Te recomendamos inspeccionar el producto al momento de la entrega.</li>
                  </ul>

                  <h4>Devoluciones</h4>
                  <ul>
                    <li><strong>Política de devolución:</strong> Aceptamos devoluciones dentro de los 30 días posteriores a la entrega.</li>
                    <li><strong>Condiciones:</strong> El producto debe estar en su estado original, sin uso y con el embalaje original.</li>
                    <li><strong>Proceso:</strong> Contacta a nuestro servicio al cliente para iniciar el proceso de devolución.</li>
                    <li><strong>Costo:</strong> Los gastos de envío de devolución corren por cuenta del cliente, excepto en casos de defectos de fabricación.</li>
                    <li><strong>Reembolso:</strong> El reembolso se procesará dentro de 5-7 días hábiles después de recibir el producto.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetalleProducto

