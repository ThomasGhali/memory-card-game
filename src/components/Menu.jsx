import '../styles/Menu.css'
import yugi from '../assets/yugi.png'
import logo from '../assets/demo2.png'
import ori from '../assets/orichalcos.png'
import menu from '../assets/menu.png'
import menuBtns from '../assets/button.png'

import entranceMessage from '../yugi-messages/EntranceMessages'

import useSound from 'use-sound'
import menuMusic from '../assets/menu.mp3'

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
  playClick
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
  const [play, { stop, sound }] = useSound(menuMusic, {
    volume: musicIsMuted ? 0 : 0.5,
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

  // Music play/stop
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
        <div className="logo-controls-wrapper">
          <img src={logo} className="logo" />
          <div className="controls-wrapper">
            <span className={`sound ${soundIsMuted ? 'music-muted' : ''}`}>
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  onClick={() => setSoundIsMuted(prev => !prev)}
              >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                  />
                </svg>
            </span>
            <span className={`sound ${musicIsMuted ? 'music-muted' : ''}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                onClick={() => setMusicIsMuted(prev => !prev)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
                />
              </svg>
            </span>

          </div>
        </div>
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