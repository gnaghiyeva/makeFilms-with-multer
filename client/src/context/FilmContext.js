import React, { createContext, useContext, useState } from 'react'

const FilmContext = createContext();

export const FilmContextProvider = ({children}) => {
    const [films,setFilms] = useState([])
  return (
    <FilmContext.Provider value={[films,setFilms]}>
      {children}
    </FilmContext.Provider>
  )
}

export const useFilmContext = ()=> useContext(FilmContext)