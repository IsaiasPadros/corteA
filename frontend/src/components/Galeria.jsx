import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import '../styles/Galeria.css'

// Array con las 9 imágenes
const imagenes = [
  {
    id: 1,
    src: '/assets/Imagenes/Imagen1-CorteA.jpeg',
    alt: 'Proyecto Corte A - Imagen 1'
  },
  {
    id: 2,
    src: '/assets/Imagenes/Imagen2-CorteA.jpeg',
    alt: 'Proyecto Corte A - Imagen 2'
  },
  {
    id: 3,
    src: '/assets/Imagenes/Imagen3-CorteA.jpeg',
    alt: 'Proyecto Corte A - Imagen 3'
  },
  {
    id: 4,
    src: '/assets/Imagenes/Imagen4-CorteA.jpeg',
    alt: 'Proyecto Corte A - Imagen 4'
  },
  {
    id: 5,
    src: '/assets/Imagenes/Imagen5-CorteA.jpeg',
    alt: 'Proyecto Corte A - Imagen 5'
  },
  {
    id: 6,
    src: '/assets/Imagenes/Imagen6-CorteA.jpeg',
    alt: 'Proyecto Corte A - Imagen 6'
  },
  {
    id: 7,
    src: '/assets/Imagenes/Imagen7-CorteA.jpeg',
    alt: 'Proyecto Corte A - Imagen 7'
  },
  {
    id: 8,
    src: '/assets/Imagenes/Imagen8-CorteA.jpeg',
    alt: 'Proyecto Corte A - Imagen 8'
  },
  {
    id: 9,
    src: '/assets/Imagenes/Imagen9-CorteA.jpeg',
    alt: 'Proyecto Corte A - Imagen 9'
  }
]

function Galeria() {
  const [index, setIndex] = useState(-1)
  const [open, setOpen] = useState(false)

  const abrirLightbox = (indice) => {
    setIndex(indice)
    setOpen(true)
  }

  // Preparar slides para el lightbox
  const slides = imagenes.map(imagen => ({
    src: imagen.src,
    alt: imagen.alt
  }))

  return (
    <section className="galeria-seccion">
      <div className="galeria-contenedor">
        {/* Header de la sección */}
        <div className="galeria-header">
          <h2 className="galeria-titulo">Galería</h2>
          <p className="galeria-subtitulo">Explora nuestros proyectos en detalle</p>
        </div>

        {/* Grilla de imágenes */}
        <div className="galeria-grid">
          {imagenes.map((imagen, indice) => (
            <div
              key={imagen.id}
              className="galeria-item"
              onClick={() => abrirLightbox(indice)}
            >
              <div className="galeria-item-wrapper">
                <img
                  src={imagen.src}
                  alt={imagen.alt}
                  className="galeria-imagen"
                  loading="lazy"
                />
                <div className="galeria-overlay">
                  <div className="galeria-overlay-icono">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" fill="currentColor"/>
                    </svg>
                  </div>
                  <span className="galeria-overlay-texto">Ver en tamaño completo</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox con zoom */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          pinchToZoom: true,
          scrollToZoom: true,
        }}
        controller={{ closeOnBackdropClick: true }}
      />
    </section>
  )
}

export default Galeria

