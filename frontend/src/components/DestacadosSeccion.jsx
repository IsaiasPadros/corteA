import '../styles/DestacadosSeccion.css'

function DestacadosSeccion({ titulo, subtitulo, fondo, children }) {
  return (
    <section className={`destacados-seccion ${fondo === 'gris' ? 'fondo-gris' : ''}`}>
      <div className="contenedor">
        <div className="destacados-encabezado">
          <h2>{titulo}</h2>
          {subtitulo && <p className="subtitulo">{subtitulo}</p>}
        </div>
        <div className="destacados-contenido">
          {children}
        </div>
      </div>
    </section>
  )
}

export default DestacadosSeccion 