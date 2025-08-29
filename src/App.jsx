import { useState, useRef } from "react"
import { CSSTransition, TransitionGroup} from "react-transition-group"
import Menu from "./components/Menu"
import Game from "./components/Game";
import useSound from "use-sound";
import buttonSound from "./assets/button.mp3"

export default function App() {
  const [gameLevel, setGameLevel] = useState({
    level: 'Easy',
    order: 1,
    text: 'Cardboard Chaos',
    cardsVisible: 3,
    cards: 6,
  });
  
  const [page, setPage] = useState('menu');
  const [disabled, setDisabled] = useState(false);

  const [resetCounter, setResetCounter] = useState(0);
  const [musicIsMuted, setMusicIsMuted] = useState(true);
  const [soundIsMuted, setSoundIsMuted] = useState(false)
  const [playClick] = useSound(buttonSound, {volume: 0.7})
  
  const menuRef = useRef(null);
  const gameRef = useRef(null);

  function handleGameRestart() {
    setDisabled(true);
    setResetCounter(prev => prev + 1);
    setTimeout(() => {
      setDisabled(false)
    }, 2000);
  }

  return(
    <>
      <TransitionGroup component={null}>
        {page === "menu" && (
          <CSSTransition
            key="menu"
            timeout={800}
            classNames="fade"
            unmountOnExit
            nodeRef={menuRef}
          >
            <div className="page" ref={menuRef}>
              <Menu {...{ 
                gameLevel, 
                setGameLevel, 
                setPage, 
                musicIsMuted, 
                setMusicIsMuted, 
                soundIsMuted, 
                setSoundIsMuted,
                playClick,
              }} />
            </div>
          </CSSTransition>
        )}

        {page === "game" && (
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
