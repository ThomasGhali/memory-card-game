import '../styles/Menu.css'
import yugi from '../assets/yugi.png'
import logo from '../assets/demo2.png'
import ori from '../assets/orichalcos.png'
import menu from '../assets/menu.png'
import menuBtns from '../assets/button.png'
import entranceMessage from './EntranceMessages'
import { useEffect, useState } from 'react'
import { Typewriter } from "react-simple-typewriter";


export default function Menu({ gameLevel, setGameLevel, setPage }) {
  // State Variables
  const [message, setMessage] = useState('');

  const currentLevelIndex = gameLevel.order - 1;
  const levels = [
    {
      level: 'Easy',
      order: 1,
      text: 'Cardboard Chaos',
      cardsVisible: 3,
      cards: 6,
    },
    {
      level: 'Mid',
      order: 2,
      text: 'Deck of Doom',
      cardsVisible: 5,
      cards: 8,
    },
    {
      level: 'Hard',
      order: 3,
      text: 'Ring of Ridiculousness',
      cardsVisible: 7,
      cards: 12,
    },
  ]

  const numberOfLevels = levels.length;



  // change levels
  function changeLevel(nextLevelIndex) {
    const newIndex = (currentLevelIndex + nextLevelIndex + numberOfLevels) % numberOfLevels;

    setGameLevel({...levels[newIndex]});
  }

  useEffect(() => {
    setMessage(entranceMessage());
  }, [])

  return (
    <div className="menu-container">
      <div className="empty"></div>
      <div className="menu-window">
        <img src={logo} className="logo" />
        <div className="menu-img-wrapper">
          <img src={menu} className="menu-img" />
          <div className="menu-buttons-wrapper">
            <button 
              aria-label="Start Game" 
              className="menu-btn"
              onClick={() => setPage("game")}
            >
              <img src={menuBtns} aria-hidden="true" />
              <span className="menu-btn__text">Start Game</span>
            </button>
            <button aria-label="Start Game" className="menu-btn">
              <img src={menuBtns} aria-hidden="true" />
              <span className="menu-btn__text level">
                Level {gameLevel.order}: {gameLevel.level}
              </span>
              <span 
                onClick={() => changeLevel(-1)}
                className="hitbox left-arrow"
              ></span>
              <span 
                onClick={() => changeLevel(1)}
                className="hitbox right-arrow"
              ></span>
              <span className="menu-btn__sub">{gameLevel.text}</span>
            </button>
            <button aria-label="Start Game" className="menu-btn">
              <img src={menuBtns} aria-hidden="true" />
              <span className="menu-btn__text">How to play?</span>
            </button>
          </div>
        </div>
      </div>
      <div className="yugi-container">
        <img src={yugi} alt="yugi" className="yugi" />
        <div className="Entrance-message">
          <Typewriter 
             words={[message]}
             loop={1}
             cursor
             cursorStyle="_"
             typeSpeed={40}
             deleteSpeed={40}
             delaySpeed={1500}
          />
        </div>
        <img src={ori} alt="orichalcos ring" className="ori" />
      </div>
    </div>
  )
}