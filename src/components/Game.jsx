import { useState, useEffect } from "react"
import "../styles/Game.css"
import yugi from "../assets/yugi-normal.png"
import inGameMessage from "../components/inGameMessage"
import YugiCard from "./YugiCard"
import getRandomImagesArr from "./cards"

export default function Game({ cardsVisible, cards }) {
  const [cardsStatus, setCardsStatus] = useState([]);
  const [inGameMessage, setInGameMessage] = useState('');
  
  function areVisibleCardsSelected(array) {
    for (let i = 0; i < cardsVisible; i++) {
      // there is a card visible not selected
      if (array[i].selected === false) {
        return false;
      }
    }

    return true;
  }

  // randomly shuffles the array (fisher-yates)
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));

      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    if (areVisibleCardsSelected(arr)) {
      shuffleArray(array);
      return;
    };

    return arr;
  }

  // flip all cards and return back changed
  async function cardsFlip(id) {
    setCardsStatus(prev => prev.map((ele) => ({...ele, flipped: true})))

    // wait for rotation animation
    await new Promise(r => setTimeout(r, 700));
    setCardsStatus((prev) => shuffleArray(prev));

    // give some time for shuffling logic and loading images
    await new Promise(r => setTimeout(r, 100));

    setCardsStatus(
      prev => prev.map((card) =>
        card.id === id ? { ...card, flipped: false, selected: true } : { ...card, flipped: false }
      )
    );
  
  }

  // true if card is already selected (game over)
  function isCardSelected(array, id) {
    return array.some((obj) => obj.id === id && obj.selected);
  }

  // cards flipping animation, shuffling or ending game
  function handleCardSelect(id) {
    if (isCardSelected(cardsStatus, id)) {
      console.log('game ended');
      return;
    }

    cardsFlip(id);
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
        {cardsStatus.slice(0, cardsVisible).map(card => (
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