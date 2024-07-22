import  { useState, useEffect } from 'react';
import YoutubeImage from "../assets/images/youtubeLogo.png";
import textImage from "../assets/images/textImage.png";
import { IoIosArrowForward } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import { CiNoWaitingSign } from "react-icons/ci";
import { TiTick } from "react-icons/ti";
import "../assets/css/popup.css";

const Youtube = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [joinClicked, setJoinClicked] = useState(false);
  const [waitMessage, setWaitMessage] = useState(false);
  const [claimVisible, setClaimVisible] = useState(false);
  const [totalCoins2, setTotalCoins2] = useState(0);
  const [coinCollected, setCoinCollected] = useState(false);

  const taskId = 'youtube-task';
  const points = 100000;

  useEffect(() => {
    const savedTotalCoins2 = localStorage.getItem('totalCoins2');
    if (savedTotalCoins2) {
      setTotalCoins2(parseInt(savedTotalCoins2, 10));
    }

    const joinClicked = localStorage.getItem(`joinClicked-${taskId}`) === 'true';
    const joinTimestamp = localStorage.getItem(`joinTimestamp-${taskId}`);
    const claimVisible = localStorage.getItem(`claimVisible-${taskId}`) === 'true';
    const coinCollected = localStorage.getItem(`coinCollected-${taskId}`) === 'true';

    setCoinCollected(coinCollected);

    if (joinClicked && joinTimestamp) {
      const timePassed = Date.now() - parseInt(joinTimestamp, 10);
      const timeLeft4Sec = 4000 - timePassed; // 4 seconds
      const timeLeft6Sec = 6000 - timePassed; // 6 seconds

      setJoinClicked(true);
      setWaitMessage(timeLeft4Sec > 0);
      setClaimVisible(timeLeft6Sec <= 0);

      if (timeLeft4Sec > 0) {
        const timerId4Sec = setTimeout(() => {
          setWaitMessage(false);
        }, timeLeft4Sec);

        const timerId6Sec = setTimeout(() => {
          setClaimVisible(true);
          localStorage.setItem(`claimVisible-${taskId}`, 'true');
        }, timeLeft6Sec);

        return () => {
          clearTimeout(timerId4Sec);
          clearTimeout(timerId6Sec);
        };
      }
    } else {
      setJoinClicked(joinClicked);
      setClaimVisible(claimVisible);
    }
  }, []);

  useEffect(() => {
    if (claimVisible) {
      const updatedTotalCoins2 = totalCoins2 + points;
      setTotalCoins2(updatedTotalCoins2);
      localStorage.setItem('totalCoins2', updatedTotalCoins2.toString());
      console.log(`Coins added: ${points}. Total Coins: ${updatedTotalCoins2}`);
      localStorage.setItem(`coinCollected-${taskId}`, 'true');
      setCoinCollected(true);
      localStorage.removeItem(`joinClicked-${taskId}`);
      localStorage.removeItem(`joinTimestamp-${taskId}`);
      localStorage.removeItem(`claimVisible-${taskId}`);
    }
  }, [claimVisible]);

  const openForm = () => {
    if (!coinCollected) {
      setFormVisible(true);
    }
  };

  const closeForm = () => setFormVisible(false);

  const handleJoinClick = (e: any) => {
    e.preventDefault();
    setJoinClicked(true);
    setWaitMessage(true);
    localStorage.setItem(`joinClicked-${taskId}`, 'true');
    localStorage.setItem(`joinTimestamp-${taskId}`, Date.now().toString());
    window.location.href = "https://www.youtube.com";
  };

  return (
    <>
      <div className="youtube">
        <h1>Hamster Youtube</h1>
        <div className="youtubeClick">
          <div className="first">
            <img src={YoutubeImage} alt="Hamster Youtube" />
            <div className="textYoutube">
              <h1>the trend you can't ignore</h1>
              <div className="insideText">
                <img src={textImage} alt="" />
                +100,000
              </div>
            </div>
          </div>
          <div className="second" onClick={openForm}>
            {!joinClicked ? (
              <IoIosArrowForward />
            ) : !claimVisible && waitMessage ? (
              <CiNoWaitingSign />
            ) : claimVisible ? (
              <TiTick />
            ) : null}
          </div>
        </div>
      </div>

      {formVisible && (
        <div className="form-popup">
          <IoCloseCircle className="close" onClick={closeForm} />
          <img src={YoutubeImage} alt="Hamster Youtube" />
          <h1>the trend you can't ignore</h1>
          <div className="smallImageCoin">
            <img src={textImage} alt="" />
            +100,000
          </div>
          {!claimVisible && !joinClicked ? (
            <a href="https://www.youtube.com" onClick={handleJoinClick}>Join</a>
          ) : !claimVisible && waitMessage ? (
            <p>You can collect the coin from here after one hour.</p>
          ) : claimVisible ? (
            <button type="button" className="btn" onClick={() => setFormVisible(false)}>
              Claimed
            </button>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Youtube;
