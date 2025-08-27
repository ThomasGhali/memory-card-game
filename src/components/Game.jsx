import { useState } from "react"
import "../styles/Game.css"
import yugi from "../assets/yugi-normal.png"
import inGameMessage from "../components/inGameMessage"
import YugiCard from "./YugiCard"
import randomCard from "./cards"

export default function Game({ cardsVisible, cards }) {
  const [cardsStatus, setCardsStatus] = useState(null);
  
  function renderGameCards() {
    const arr = new Array(cards);
    // fill the array with card objs
    for (let i = 0; i < cards; i++) {
      arr[i] = {
        imgUrl: randomCard(),
        selected: false,
      };
    }

    return [...Array(cardsVisible)].map((_, index) => {

      setCardsStatus(arr);

      return <YugiCard imgUrl={arr[index]} />;
    });
  }
  
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
        {renderGameCards()}
      </main>
    </div>
  )
}