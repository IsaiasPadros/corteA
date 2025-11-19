import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'
import Encabezado from './components/Encabezado'
import PieDePagina from './components/PieDePagina'
import Inicio from './components/Inicio'
import DetallePropiedad from './components/DetallePropiedad'
import DetalleProducto from './components/DetalleProducto'
import './styles/global.css'

// Componente para manejar los parámetros de la URL en DetallePropiedad
const DetalleWrapper = () => {
  // Para simplificar, usamos siempre la primera propiedad del ejemplo
  const propiedadFija = {
    id: 1,
    titulo: 'Casa Moderna con Jardín',
    ubicacion: 'Barrio Residencial, Ciudad',
    precio: '250,000',
    habitaciones: 3,
    banos: 2,
    metros: 150,
    imagen: 'https://cdn-images.xintelweb.com/upload/jai655_2.jpg?132749',
    direccion: 'Montevideo 1700',
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
  
  return <DetallePropiedad propiedad={propiedadFija} />;
};

function App() {
  const [seccionActual, setSeccionActual] = useState('inicio')

  const cambiarSeccion = (seccion) => {
    setSeccionActual(seccion)
  }

  return (
    <Router>
      <div className="app">
        <Encabezado cambiarSeccion={cambiarSeccion} seccionActual={seccionActual} />
        <main className="main-contenido">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/propiedad/:id" element={<DetalleWrapper />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
          </Routes>
        </main>
        <PieDePagina />
      </div>
    </Router>
  )
}

export default App
