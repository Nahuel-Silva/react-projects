import { useCallback, useState } from 'react';
import './App.css'
import { Movies } from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies.js';
import { useSearch } from './hooks/useSearch.js';
import debounce from 'just-debounce-it';

// El ultimo boton de un formulario es del tipo submit

// useRef es un hook que te permite crear una referencia
// mutable que persiste durante todo el ciclo de vida de 
// tu componente (es muy util para guardar cualquier valor
// que puedas mutar como un identificador, un elemento del
// DOM, como un contador, etc) y que cada vez que cambiar no
// vuelve a renderizar el componente

// debounce es una tecnica que se utiliza para retrasar la ejecucion
// de una funcion, en este caso se utiliza para retrasar la ejecucion
// de la funcion getMovies


function App() {

  const [sort, setSort] = useState(false)

  const { search, updateSearch, error } = useSearch()

  const { movies, loading, getMovies } = useMovies({ search, sort })


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceGetMovies = useCallback( 
    
    debounce(search => {
    
    getMovies({ search })

  }, 300) , [getMovies])

  const handleSubmit = (event) => {

    event.preventDefault()
    getMovies({ search })

    // Si tuviera un solo campo
    // const fields = new FormData(event.target)
    // const query = fields.get("query")
    // console.log(query)

    // Si tuviera muchos campos
    // const fields = Object.fromEntries(new FormData(event.target))
    // console.log(fields)

  }

  const handleSort = () => {
    setSort(!sort)
    
  }


  const handleChange = (event) => {

    // const newQuery = event.target.value
    // Pre-validacion
    // if (newQuery.startsWith(' ')) return
    const newSearch = event.target.value
    updateSearch(newSearch)
    debounceGetMovies(newSearch)
  }
  

  return (

    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
            onChange={handleChange} value={search} name="query" placeholder='Avengers, Star Wars, The Matrix ...' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {
          error && <p style={{ color: 'red' }} >{error}</p>
        }
      </header>
      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
      </main>
    </div>

  )
}

export default App;
