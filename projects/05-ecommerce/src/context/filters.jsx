/* eslint-disable react/prop-types */
import { createContext, useState } from "react";


// 1- Creamos el contexto
// Este es el que consumimos
export const FiltersContext = createContext()

// 2- Creamos el provider, para proveer el contexto
// Este es el que nos provee de acceso al contexto
export function FiltersProvider({ children }) {

    const [filters, setFilters] = useState({
        category: 'all',
        minPrice: 0,
    })

    return (
        <FiltersContext.Provider value={{
            filters,
            setFilters
        }}>
            {children}
        </FiltersContext.Provider>
    )
}