import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square.jsx'
import { TURNS, WINNER_COMBOS } from './constants.js'
import { checkEndGame, checkWinnerFrom } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import { resetGameStorage, saveGameToStorage } from './logic/storage/index.js'

function App() {

  // Inicializamos el board
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board")

    //return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  // Inicializamos de quien es el primer turno
  const [turn, setTurn] = useState(()=>{
    
    const turnFromStorage = window.localStorage.getItem("turn")
    // || mira si es false mientras que ?? mira si es null o undefined
    return turnFromStorage ?? TURNS.X

  })

  // null no hay ganador, false hay empate
  const [winner, setWinner] = useState(null)

  // funcion para resetear el juego
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {


    // No actualizamos esta posicion si ya tiene algo
    // La posicion tiene algo? si tiene algo no hace nada (return)
    if (board[index] || winner) return

    // Actualizamos el tablero sin mutar la variable con estado
    const newBoard = [... board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Cambiamos el turno
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    
    // Guardamos la partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    // Revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    
      // chequeamos que el juego termino
    } else if (checkEndGame(newBoard)){
      setWinner(false) //empate
    }

  }

  return (
    <main className='board'>
    <h1>tateti</h1>
    <button onClick={resetGame}>Reset del juego</button>
    <section className='game'>
      {
        board.map((square, index)=>{
          return(
            <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
            >
              {square}
            </Square>
          )
        })
      }
    </section>
    <section className='turn'>
      <Square isSelected={turn == TURNS.X}>
        {TURNS.X}
      </Square>
      <Square isSelected={turn == TURNS.O}>
        {TURNS.O}
      </Square>
    </section>
    <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
