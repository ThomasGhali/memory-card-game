import { useState, useRef, useEffect } from 'react'

import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Menu from './components/Menu'
import Game from './components/Game'

import useSound from 'use-sound'
import buttonSound from './assets/button.mp3'

export default function App() {
  const [gameLevel, setGameLevel] = useState({
    level: 'Easy',
    order: 1,
    text: 'Cardboard Chaos',
    cardsVisible: 3,
    cards: 6,
  })

  const [page, setPage] = useState('menu')
  const [disabled, setDisabled] = useState(false)

  const [resetCounter, setResetCounter] = useState(0)
  const [musicIsMuted, setMusicIsMuted] = useState(true)
  const [soundIsMuted, setSoundIsMuted] = useState(false)
  const [playClick] = useSound(buttonSound, { volume: 0.7 })

  const menuRef = useRef(null)
  const gameRef = useRef(null)
  const timeoutRef = useRef(null)

  function handleGameRestart() {
    // Prevent multiple restarts by checking if already disabled
    if (disabled) return

    // Clear any pending timeout from previous restart
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setDisabled(true)
    setResetCounter(prev => prev + 1)

    // Set a new timeout and store its ID
    timeoutRef.current = setTimeout(() => {
      setDisabled(false)
      timeoutRef.current = null
    }, 2000)
  }

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      <TransitionGroup component={null}>
        {page === 'menu' && (
          <CSSTransition
            key="menu"
            timeout={800}
            classNames="fade"
            unmountOnExit
            nodeRef={menuRef}
          >
            <div className="page" ref={menuRef}>
              <Menu
                {...{
                  gameLevel,
                  setGameLevel,
                  setPage,
                  musicIsMuted,
                  setMusicIsMuted,
                  soundIsMuted,
                  setSoundIsMuted,
                  playClick,
                }}
              />
            </div>
          </CSSTransition>
        )}

        {page === 'game' && (
          <CSSTransition
            key="game"
            timeout={800}
            classNames="fade"
            unmountOnExit
            nodeRef={gameRef}
          >
            <div className="page" ref={gameRef}>
              <Game
                cardsVisible={gameLevel.cardsVisible}
                cards={gameLevel.cards}
                handleRestart={handleGameRestart}
                {...{
                  resetCounter,
                  musicIsMuted,
                  setMusicIsMuted,
                  soundIsMuted,
                  setSoundIsMuted,
                  playClick,
                  disabled,
                }}
              />
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </>
  )
}
