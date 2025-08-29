import { useState } from "react"
import backCard from "../assets/card.jpg"
import useSound from "use-sound"
import cardFlip from "../assets/cardFlip.mp3"
import Tilt from 'react-parallax-tilt'

export default function YugiCard({ imgUrl, flipped, isGameOverRef, onClick}) {
  const [cardFlipSound] = useSound(cardFlip, {volume: 0.7})

  function handleClick() {
    onClick();
    
    if(!isGameOverRef.current) {
      cardFlipSound();
    }
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
          onClick={handleClick}
        >
          <div className={`card ${flipped ? "flipped" : ""}`}>
            <img src={imgUrl} className="front" />
            <img src={backCard} width="299.5px" className="back" />
          </div>
        </button>
      </Tilt>
  )
}