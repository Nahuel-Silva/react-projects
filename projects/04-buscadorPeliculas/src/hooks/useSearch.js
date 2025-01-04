import { useEffect, useRef, useState } from "react"

export function useSearch () {

  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {

    // Veo si el first input es true y actualizo el first input a 
    // true o false si la cadena esta vacia o no 
    if (isFirstInput.current){
        isFirstInput.current = search == ''
        return
    }

    // Validaciones
    if (search == "") {
      setError("No se puede buscar una pelicula vacia")
      return
    }
    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una pelicula con un numero")
      return
    }
    if (search.length < 3) {
      setError("La busqueda debe tener al menos 3 caracteres")
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}