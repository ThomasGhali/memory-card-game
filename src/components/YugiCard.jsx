import { useState } from "react"
import frontCard from "../assets/front.jpg"
import frontCard1 from "../assets/front1.jpg"
import backCard from "../assets/card.jpg"
import Tilt from 'react-parallax-tilt'

export default function YugiCard({ imgUrl }) {
  const [flipped, setFlipped] = useState(false)
  const [currentCard, setCurrentCard] = useState(frontCard);

  function handleFlip() {
      setFlipped(true);

      setTimeout(() => {
        setCurrentCard(frontCard1);
        setFlipped(false);
      }, 800);
    
  }
  return (
      <Tilt
        tiltReverse={true}
        glareEnable={true}
        glareMaxOpacity={0.6}
        glareColor="silver"
        glarePosition="bottom"
        glareBorderRadius="20px"
        className='tilt'
      >
        <button 
          className="card-container"
        >
          <div className={`card ${flipped ? "flipped" : ""}`}>
            <img onClick={handleFlip} src={imgUrl} className="front" />
            <img src={backCard} width="299.5px" className="back" />
          </div>
        </button>
      </Tilt>
  )
}