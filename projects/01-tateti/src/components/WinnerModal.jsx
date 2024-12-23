import { Square } from "./Square"

export function WinnerModal ({winner, resetGame}) {
    if (winner == null) return null

    // Si el winner es false hay un empate 
    //sino se dice quien gano
    const winnerText = winner == false ? 'Empate' : 'Gano: '

    return(
          <section className='winner'>
            <div className='text'>
              <h2>{winnerText}</h2>
              <header className='win'>
                  {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>
                  Empezar de nuevo
                </button>
              </footer>
            </div>
          </section>
        )
}