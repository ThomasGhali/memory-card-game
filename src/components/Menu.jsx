import '../styles/Menu.css'
import yugi from '../assets/yugi.png'
import demo from '../assets/demo2.png'
import ori from '../assets/orichalcos.png'

export default function Menu() {
  return (
    <div className="container">
      <div className="empty"></div>
      <div className="menu-window">
        {/* <img src={demo} alt="" width="500px"/> */}
      </div>
      <div className="yugi-container">
        <img src={yugi} alt="yugi" className='yugi' />
        <img src={ori} alt="orichalcos ring" className='ori' />
      </div>
    </div>
  )
}