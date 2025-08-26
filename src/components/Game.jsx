import "../styles/Game.css"
import yugi from "../assets/yugi-normal.png"
import inGameMessage from "../components/inGameMessage"
import YugiCard from "./YugiCard"

export default function Game() {
  return (
    <div className="game-wrapper">
      <header className="game-header">
        <div className="yugi-talks">
          <img src={yugi} />
          <div>
            message here
          </div>
        </div>
        <div className="score">
          <p className="score__text">Score</p>
          <div className="score__numbers">
            <div className="score__best">
              <p className="score__label">Best</p>
              <p>5</p>
            </div>
            <div className="score__current">
              <p className="score__label">Current</p>
              <p>0 / 7</p>
            </div>
            </div>
        </div>
      </header>

      <main className="game-container">
        <YugiCard />
      </main>
    </div>
  )
}