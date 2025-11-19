import '../styles/CategoriasMuebles.css'

function CategoriasMuebles() {
  const categorias = [
    {
      id: 1,
      titulo: 'SOFÁS Y SECCIONALES',
      imagen: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop'
    },
    {
      id: 2,
      titulo: 'MESAS DE CENTRO',
      imagen: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&h=600&fit=crop'
    },
    {
      id: 3,
      titulo: 'ESTANTERÍAS',
      imagen: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=600&fit=crop'
    },
    {
      id: 4,
      titulo: 'SILLAS DE COMEDOR',
      imagen: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop'
    },
    {
      id: 5,
      titulo: 'CAMAS',
      imagen: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop'
    },
    {
      id: 6,
      titulo: 'ESCRITORIOS',
      imagen: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=600&fit=crop'
    },
    {
      id: 7,
      titulo: 'GABINETES',
      imagen: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop'
    },
    {
      id: 8,
      titulo: 'REPISAS',
      imagen: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&h=600&fit=crop'
    }
  ]

  return (
    <section className="categorias-muebles">
      <div className="contenedor">
        <div className="categorias-header">
          <div className="categorias-badges">
            <span className="badge">EN STOCK</span>
            <span className="badge-secondary">Entregado en 1-4 Semanas</span>
          </div>
        </div>
        <div className="categorias-grid">
          {categorias.map((categoria) => (
            <div key={categoria.id} className="categoria-item">
              <div className="categoria-imagen-container">
                <img 
                  src={categoria.imagen} 
                  alt={categoria.titulo}
                  className="categoria-imagen"
                />
                <div className="categoria-overlay"></div>
              </div>
              <div className="categoria-info">
                <h3 className="categoria-titulo">{categoria.titulo}</h3>
                <div className="categoria-flecha">→</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoriasMuebles

