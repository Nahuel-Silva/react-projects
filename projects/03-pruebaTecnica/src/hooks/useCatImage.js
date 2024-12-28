import { useEffect, useState } from "react"
import { formatUrl } from "../constants.js"

// esto es un hook
// siempre la funcion empieza con use
export function useCatImage ({ fact }) {
    const [imageUrl, setImageUrl] = useState()
    // para recuperar la imagen cada vez que tenemos una cita nueva
    useEffect(() => {
        
        if (!fact) return

        const threeFirstWords = fact.split(' ', 3).join(' ')
            console.log(threeFirstWords)
            
            fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
            .then(res => res.json())
            .then(response => {
                const { _id } = response
                const url = formatUrl({_id, threeFirstWords})
                setImageUrl(url)

            })
    },[fact])

    return { imageUrl }
}