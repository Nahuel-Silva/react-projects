import { useRef, useState, useMemo, useCallback} from 'react'
import { searchMovies } from '../services/movies'


// useMemo lo que hace es memorizar un valor para no
// tener que recalcularlo cada vez que se renderiza el
// componente

// useCallback solo se utiliza para las funciones


export function useMovies({ search, sort }) {

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)
  

  const getMovies = useCallback(async ({ search }) => {

    if (search == previousSearch.current) return

    try{
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e){
      setError(e.message)
    } finally {
      // Se ejecuta tanto en el try como en el catch
      setLoading(false)
    }

  },[])

  const sortedMovies = useMemo(() => {
    return sort
    ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
    : movies
  },[movies, sort])

  return { movies: sortedMovies, getMovies, loading}

}