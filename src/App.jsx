import { useState, useRef } from "react"
import { CSSTransition, TransitionGroup} from "react-transition-group"
import Menu from "./components/Menu"
import Game from "./components/Game";

export default function App() {
  const [gameLevel, setGameLevel] = useState({
    level: 'Easy',
    order: 1,
    text: 'Cardboard Chaos',
    cardsVisible: 3,
    cards: 6,
  });

  function handleGameRestart() {
    
  }

  const [page, setPage] = useState('menu');

  const menuRef = useRef(null);
  const gameRef = useRef(null);

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
              <Menu {...{ gameLevel, setGameLevel, setPage }} />
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
                />
            </div>
          </CSSTransition>
        )}

      </TransitionGroup>
    </>
  )
}
