import { useState, useEffect } from "react"
import "../styles/Game.css"
import yugi from "../assets/yugi-normal.png"
import inGameMessage from "../components/inGameMessage"
import YugiCard from "./YugiCard"
import getRandomImagesArr from "./cards"

export default function Game({ cardsVisible, cards }) {
  const [cardsStatus, setCardsStatus] = useState(null);
  const [cardsUi, setCardsUi] = useState(null);
  
  // initialize cards (UI and status)
  useEffect(() => {
    function initGameCards() {
      // return unique arr of images with length passed
      const randomImagesArr = getRandomImagesArr(cards);
      const arr = new Array(cards);
      // fill the array with card objs
      for (let i = 0; i < cards; i++) {
        arr[i] = {
          imgUrl: randomImagesArr[i],
          selected: false,
          flipped: false
        };
      }
      
      setCardsStatus(arr);
      
      return Array.from({ length: cardsVisible }).map((_, index) => (
        <YugiCard key={index} imgUrl={arr[index].imgUrl} />
      ));
    }

    setCardsUi(initGameCards());

  }, [])

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
        {cardsUi}
      </main>
    </div>
  )
}