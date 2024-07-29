import React, { useState, useEffect } from "react";
import dailyTask from "../assets/images/dailyTask.png";
import textImage from "../assets/images/textImage.png";
import { IoIosArrowForward } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { IoCloseCircle } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../assets/css/popup.css";

interface Day {
  id: number;
  day: string;
  coin: number;
}

const DailyTask: React.FC = () => {
  const days: Day[] = [
    { id: 1, day: "day1", coin: 500 },
    { id: 2, day: "day2", coin: 1000 },
    { id: 3, day: "day3", coin: 15000 },
    { id: 4, day: "day4", coin: 25000 },
    { id: 5, day: "day5", coin: 50000 },
    { id: 6, day: "day6", coin: 100000 },
    { id: 7, day: "day7", coin: 500000 },
    { id: 8, day: "day8", coin: 1000000 },
    { id: 9, day: "day9", coin: 5000000 },
    { id: 10, day: "day10", coin: 10000000 },
  ];

  const [state, setState] = useState(false);
  const [activeDayId, setActiveDayId] = useState<number>(1);
  const [claimedDays, setClaimedDays] = useState<number[]>([]);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [totalCoinsCollected, setTotalCoinsCollected] = useState<number>(0);

  useEffect(() => {
    const calculateRemainingTime = () => {
      const currentTimestamp = new Date().getTime();
      const lastClaimTimestamp = localStorage.getItem("lastClaimTimestamp");
      const claimedDays = JSON.parse(localStorage.getItem("claimedDays") || "[]");
      const startTimestamp = localStorage.getItem("startTimestamp");
      const totalCoins = localStorage.getItem("totalCoinsDailyRewards");

      if (totalCoins) {
        setTotalCoinsCollected(parseInt(totalCoins, 10));
      }

      if (startTimestamp) {
        const elapsedTime = currentTimestamp - parseInt(startTimestamp, 10);
        const daysPassed = Math.floor(elapsedTime / (1000 * 60 * 60 * 24)); // Convert to days

        if (daysPassed >= 10) {
          // Reset days after 10 days but keep existing coins
          localStorage.setItem("startTimestamp", currentTimestamp.toString());
          setActiveDayId(1);
          setClaimedDays([]);
        } else {
          setActiveDayId(Math.min(daysPassed + 1, days.length));
        }
      } else {
        // Initialize startTimestamp if not set
        localStorage.setItem("startTimestamp", currentTimestamp.toString());
      }

      if (lastClaimTimestamp) {
        const elapsedTime = currentTimestamp - parseInt(lastClaimTimestamp, 10);
        const hoursPassed = elapsedTime / (1000 * 60 * 60); // Convert to hours

        if (hoursPassed >= 24) {
          // User missed the claim time; reset to the next day or day 1
          const nextDayId = claimedDays.length + 1;
          setActiveDayId(nextDayId <= days.length ? nextDayId : 1); // Reset to day 1 if past last day
          setRemainingTime(0); // No remaining time
        } else {
          const nextClaimTimestamp = parseInt(lastClaimTimestamp, 10) + 24 * 60 * 60 * 1000; // 24 hours in milliseconds
          setRemainingTime(Math.max(0, nextClaimTimestamp - currentTimestamp));
        }
      } else {
        setRemainingTime(0); // Default to 0 if there's no lastClaimTimestamp
      }
      setClaimedDays(claimedDays);
    };

    calculateRemainingTime();
    const interval = setInterval(calculateRemainingTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const openForm = () => setState(true);
  const closeForm = () => {
    setState(false);
  };

  const handleClaimNow = () => {
    const dayToClaim = days.find((day) => day.id === activeDayId);
    if (dayToClaim) {
      if (claimedDays.includes(activeDayId)) {
        toast.error("You have already claimed the coins for this day.");
      } else {
        const currentCoins = localStorage.getItem("totalCoinsDailyRewards");
        const totalCoins = currentCoins ? parseInt(currentCoins, 10) : 0;
        const updatedTotalCoins = totalCoins + dayToClaim.coin;
        localStorage.setItem("totalCoinsDailyRewards", updatedTotalCoins.toString());

        const currentTimestamp = new Date().getTime();
        localStorage.setItem("lastClaimTimestamp", currentTimestamp.toString());

        const updatedClaimedDays = [...claimedDays, activeDayId];
        localStorage.setItem("claimedDays", JSON.stringify(updatedClaimedDays));

        setClaimedDays(updatedClaimedDays); // Update the claimed days
        setTotalCoinsCollected(updatedTotalCoins); // Update total coins collected
        toast.info(`You have claimed ${dayToClaim.coin} coins!`); // Show toast
      }
    }
  };

  const formatCoins = (coin:any) => {
    if (coin >= 1000000) {
      return (coin / 1000000).toFixed(1) + 'm';
    } else if (coin >= 1000) {
      return (coin / 1000).toFixed(1) + 'k';
    } else {
      return coin;
    }
  };

  const formatRemainingTime = (milliseconds: number) => {
    const totalSeconds = Math.ceil(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <>
      <ToastContainer />
      <div className="DailyTask">
        <h1>Daily Task</h1>
        <div className={`DailyTaskClick ${remainingTime ? "ahmad" : ""}`}>
          <div className="DailyTask_first">
            <img src={dailyTask} alt="" />
            <div className="textDailyTask">
              <h1>the trend you can't ignore</h1>
              <div className="DailyTask_insideText">
                <img src={textImage} alt="" />
                +{formatCoins(totalCoinsCollected)} {/* Display total coins collected */}
              </div>
            </div>
          </div>
          <div className="DailyTask_second" onClick={openForm}>
            {remainingTime > 0 ? (
              <TiTick className="tick" />
            ) : (
              <IoIosArrowForward />
            )}
          </div>
        </div>
      </div>
      {state && (
        <div className="form-popup">
          <IoCloseCircle className="close" onClick={closeForm} />
          <img src={dailyTask} alt="Hamster Youtube" />
          <div className="mainFlex">
            {days.map((day) => (
              <div
                className={`boxFlex ${day.id === activeDayId ? 'active' : ''} ${claimedDays.includes(day.id) ? 'boxFlex2' : ''}`}
                key={day.id}
                style={{ opacity: day.id <= activeDayId ? 1 : 0.5 }}
              >
                <h1>{day.day}</h1>
                <img src={textImage} alt="" />
                <h2>{formatCoins(day.coin)}</h2> 
              </div>
            ))}
          </div>
          <button
            type="button"
            className="btnClaim backTO"
            onClick={handleClaimNow} // Handle claim click
            disabled={remainingTime > 0} // Disable button if remainingTime > 0
          >
            {remainingTime > 0 ? `Back to this time (${formatRemainingTime(remainingTime)})` : `Claim Now`}
          </button>
        </div>
      )}
    </>
  );
};

export default DailyTask;
