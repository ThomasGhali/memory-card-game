import '../styles/Menu.css'
import yugi from '../assets/yugi.png'
import logo from '../assets/demo2.png'
import ori from '../assets/orichalcos.png'
import menu from '../assets/menu.png'
import menuBtns from '../assets/button.png'
import entranceMessage from './EntranceMessages'


export default function Menu({ gameLevel, setGameLevel }) {

  return (
    <div className="container">
      <div className="empty"></div>
      <div className="menu-window">
        <img src={logo} className='logo' />
        <div className="menu-img-wrapper">
          <img src={menu} className='menu-img' />
          <div className="menu-buttons-wrapper">
            <button aria-label="Start Game" className='menu-btn'>
              <img src={menuBtns} aria-hidden="true" />
              <span className='menu-btn__text'>Start Game</span>
            </button>
            <button aria-label="Start Game" className='menu-btn'>
              <img src={menuBtns} aria-hidden="true" />
              <span className='menu-btn__text'>Level {gameLevel.order}: {gameLevel.level}</span>
              <span className='menu-btn__sub'>{gameLevel.text}</span>
            </button>
            <button aria-label="Start Game" className='menu-btn'>
              <img src={menuBtns} aria-hidden="true" />
              <span className='menu-btn__text'>How to play?</span>
            </button>
          </div>
        </div>
      </div>
      <div className="yugi-container">
        <img src={yugi} alt="yugi" className='yugi' />
        <div className="Entrance-message">
          {entranceMessage()}
        </div>
        <img src={ori} alt="orichalcos ring" className='ori' />
      </div>
    </div>
  )
}