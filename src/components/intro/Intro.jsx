import "./Intro.scss"
import { init } from 'ityped'
import { useEffect, useRef } from "react"

import { useNavigate } from 'react-router-dom';

export default function Intro() {
  const textRef = useRef(null)

  useEffect(() => {
    if (textRef.current) {
      if (!textRef.current.dataset.initialized) {
        init(textRef.current, {
          showCursor: true,
          backDelay: 1500,
          backSpeed: 60,
          strings: ["დაიწყე სწავლა", "მიიღე სერთიფიკატი", "გამოიყენე პრაქტიკაში"]
        });
        textRef.current.dataset.initialized = "true";
      }
    }
  }, []);

  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="intro" id="intro">
      <div className="left">
        <div className="container">
          <h1>მოძებნე შენთვის სასურველი კურსი</h1>
          <h2>შენთვის სასურველ პროფესიაში და შემდეგ</h2>
          <h3><span ref={textRef}></span></h3>
          <button className="my-button" onClick={goToRegister}>დაიწყე ახლავე</button>

        </div>
      </div>
      <div className="right">
        <div className="wrapper">
          <img src="assets/intro/4.png" alt="" />
        </div>
        <a href="#portfolio">
          <img src="assets/down arrow.png" alt="" />
        </a>
      </div>
    </div>
  )
}
