import { useState, useEffect } from "react"
import "../styles/Game.css"
import yugi from "../assets/yugi-normal.png"
import inGameMessage from "../components/inGameMessage"
import YugiCard from "./YugiCard"
import getRandomImagesArr from "./cards"

export default function Game({ cardsVisible, cards }) {
  const [cardsStatus, setCardsStatus] = useState(null);
  
  // randomly shuffles the array (fisher-yates)
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));

      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }

  // flip all cards and return back changed
  function cardsFlip() {
    setCardsStatus(prev => prev.map((ele) => ({...ele, flipped: true})))

      setTimeout(() => {
        // after 800ms, flip all cards
        setTimeout(() => {
          setCardsStatus((prevState) =>
            prevState.map((card) => ({ ...card, flipped: true }))
          );
        }, 800);
      })
  }
  
  // returns true of the 
  function isCardSelected(array, id) {
    return array.some(obj => (obj.id === id) && (obj.selected === true));
  }

  function handleCardSelect(id) {

    cardsFlip();
    
  }

  // initialize cards (UI and status)
  useEffect(() => {
      // return unique arr of images with length passed
      const randomImagesArr = getRandomImagesArr(cards);
      const arr = new Array(cards);
      // fill the array with card objs
      for (let i = 0; i < cards; i++) {
        arr[i] = {
          imgUrl: randomImagesArr[i],
          selected: false,
          flipped: false,
          id: crypto.randomUUID(),
        };
      }
      
      setCardsStatus(arr);
  }, [cards])

  // return Array.from({ length: cardsVisible }).map((card, index) => (
  //   <YugiCard 
  //     key={index} 
  //     imgUrl={arr[index].imgUrl} 
  //     flipped={arr[index].flipped}
  //     setCardsStatus={setCardsStatus}
  //     onClick={() => handleCardSelect(arr[index].name)}
  //   />
  // ));

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
        {cardsStatus.splice(0, cardsVisible).map(card => (
          <YugiCard 
            key={card.id}
            imgUrl={card.imgUrl}
            flipped={card.flipped}
            onClick={() => handleCardSelect(card.id)}
          />
        ))

        }
      </main>
    </div>
  )
}