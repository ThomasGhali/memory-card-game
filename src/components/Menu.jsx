import '../styles/Menu.css'
import yugi from '../assets/yugi.png'
import logo from '../assets/demo2.png'
import ori from '../assets/orichalcos.png'
import menu from '../assets/menu.png'
import menuBtns from '../assets/button.png'

import entranceMessage from '../yugi-messages/EntranceMessages'

import useSound from 'use-sound'
import menuMusic from '../assets/menu.mp3'
import buttonSound from '../assets/button.mp3'

import React, { useEffect, useState } from 'react'
import { Typewriter } from "react-simple-typewriter"


export default function Menu({
  gameLevel,
  setGameLevel,
  setPage,
  musicIsMuted,
  setMusicIsMuted,
  soundIsMuted,
  setSoundIsMuted,
}) {
  // State Variables
  const [message, setMessage] = useState('');
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
  
  const currentLevelIndex = gameLevel.order - 1;
  const numberOfLevels = levels.length;
  const [playClick] = useSound(buttonSound, {volume: 0.7})
  const [play, { stop, sound }] = useSound(menuMusic, {
    volume: musicIsMuted ? 0 : 1,
    loop: true,
  });
  
  // change levels
  function changeLevel(nextLevelIndex) {
    const newIndex = (currentLevelIndex + nextLevelIndex + numberOfLevels) % numberOfLevels;
    
    setGameLevel({...levels[newIndex]});
  }

  function clickSound() {
    if (!soundIsMuted) playClick();                
  }

  useEffect(() => {
    play();
    return () => stop();
  }, [playClick, stop])

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
              onClick={() => {
                clickSound();                
                setPage("game");
              }}
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
            <button 
              aria-label="Start Game" 
              className="menu-btn"
              onClick={() => {
                clickSound();                
              }}
            >
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