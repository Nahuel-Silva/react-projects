import { WINNER_COMBOS } from "../constants.js"

export const checkWinnerFrom = (boardToCheck) => {

    // Revisamos la combinaciones ganadoras
    // para ver quien gano (X o O)
    for (const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]
      ){
        // Si hay ganador
        return boardToCheck[a]
      }
    }
    // Si no hay ganador
    return null
  }

export const checkEndGame = (newBoard) => {
  // Revisamos que no hay mas espacios vacios en el tablero = empate
  return newBoard.every( (square) => square != null)
}