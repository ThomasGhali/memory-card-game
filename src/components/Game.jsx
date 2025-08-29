import { useState, useEffect } from "react"
import "../styles/Game.css"

import getRandomImagesArr from "./cards"
import gameWonMessages from "../yugi-messages/wonMessages"
import inGameMessage from '../yugi-messages/inGameMessage'
import lostMessage from "../yugi-messages/lostMessage"
import openingMessage from "./openningMessage"

import { Typewriter } from "react-simple-typewriter"
import YugiCard from "./YugiCard"

import yugiFurious from "../assets/yugi-furious.png"
import yugiHappy from "../assets/yugi-happy.png"
import yugiNormal from "../assets/yugi-normal.png"
import gameWon from "../assets/won.gif"
import gameLost from "../assets/lost.gif"

export default function Game({ cardsVisible, cards, handleGameRestart }) {
  const [cardsStatus, setCardsStatus] = useState([]);
  const [gameMessage, setGameMessage] = useState('');
  const [isGameOver, setIsGameOver] = useState(null);
  
  function getYugiImage() {
    if (isGameOver === null) {
      return yugiNormal;
    } else if (isGameOver === "lost") {
      return yugiFurious;
    }

    return yugiHappy;
  }

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
      return shuffleArray(arr);
    };

    return arr;
  }

  // flip all cards and return back changed
  async function cardsFlip(id) {
    setCardsStatus(prev =>
      prev.map((card) => ({ ...card, flipped: true }))
    )

    // wait for rotation animation
    await new Promise(r => setTimeout(r, 700));
    setCardsStatus((prev) => shuffleArray(prev));

    // give some time for shuffling logic and loading images
    await new Promise(r => setTimeout(r, 200));

    setCardsStatus(prev => 
      prev.map((card) => ({ ...card, flipped: false }))
    );
  
  }

  // true if card is already selected (game over)
  function isCardSelected(array, id) {
    return (array.some((obj) => obj.id === id && obj.selected));
  }

  // cards flipping animation, shuffling or ending game
  function handleCardSelect(id) {
    if (isGameOver) return;

    if (isCardSelected(cardsStatus, id)) {
      setGameMessage(lostMessage());
      setIsGameOver('lost');
      return;
    }

    let updated = cardsStatus.map(card => (
        card.id === id ? {...card, selected: true} : card
      ));

    setCardsStatus(updated);

    const isGameWon = updated.every(card => card.selected);
    
    if (isGameWon) {
      setIsGameOver('won');
      setGameMessage(gameWonMessages())
      return;
    }

    cardsFlip(id);
    setGameMessage(inGameMessage());
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

  // init yugi's message
  useEffect(() => {
    setGameMessage(openingMessage());
  }, [])

  return (
    <div className="game-wrapper">
      <header className="game-header">
        <div className="yugi-talks">
          <img src={getYugiImage()} />
          <div style={{ color: isGameOver === 'lost' ? 'red' : 'var(--primary1-color)' }}>
            <Typewriter 
              key={gameMessage}
              words={[gameMessage, '']}
              loop={1}
              cursor
              cursorStyle={
                isGameOver === 'lost' ? "⭕" : 
                isGameOver === 'won' ? "✨" : '_'
              }
              typeSpeed={30}
              deleteSpeed={40}
              delaySpeed={isGameOver === 'lost' ? 10000 : 4000}
            />
          </div>
        </div>
        <div className="controls">
          <div className="controls__navigate">
            <button className="control-btn">Restart</button>
            <button className="control-btn">Main menu</button>
          </div>
          <div className="controls__sound">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="red"
              className="size-6"
              width="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              />
            </svg> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="sound"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="music"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
              />
            </svg>

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
        {cardsStatus?.slice(0, cardsVisible).map(card => (
          <YugiCard 
            key={card.id}
            imgUrl={card.imgUrl}
            flipped={card.flipped}
            onClick={() => handleCardSelect(card.id)}
          />
        ))
        }

        <div className="gameEndWindow-wrapper">
          <p className={`end-game-sentence ${isGameOver === 'win' ? 'won' : 'lost'}`}>
            {isGameOver === 'win' ? 'Good job, yugi can feel his soul!' : 'Yugi is captured, keep trying!'}
          </p>
          <img src={isGameOver === 'win' ? gameWon : gameLost} className="game-end-gif" />
          <button className="end-restart">
            Restart
          </button>
        </div>
      </main>
    </div>
  )
}