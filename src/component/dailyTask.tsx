import React, { useState, useEffect } from "react";
import dailyTask from "../assets/images/dailyTask.png";
import textImage from "../assets/images/textImage.png";
import { IoIosArrowForward } from "react-icons/io";
import "../assets/css/popup.css";
import { IoCloseCircle } from "react-icons/io5";

interface Day {
  id: number;
  day: string;
  coin: number;
}

const DailyTask: React.FC = () => {
  const days: Day[] = [
    { id: 1, day: "day1", coin: 500 },
    { id: 2, day: "day2", coin: 600 },
    { id: 3, day: "day3", coin: 700 },
    { id: 4, day: "day4", coin: 800 },
    { id: 5, day: "day5", coin: 900 },
    { id: 6, day: "day6", coin: 1000 },
    { id: 7, day: "day7", coin: 1200 },
    { id: 8, day: "day8", coin: 1300 },
    { id: 9, day: "day9", coin: 1400 },
    { id: 10, day: "day10", coin: 1500 },
  ];

  const [state, setState] = useState(false);
  const [selectedDayId, setSelectedDayId] = useState<number | null>(null);
  const [activeDayId, setActiveDayId] = useState<number>(1);
  const [claimedDays, setClaimedDays] = useState<number[]>([]);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    const calculateRemainingTime = () => {
      const currentTimestamp = new Date().getTime();
      const lastClaimTimestamp = localStorage.getItem("lastClaimTimestamp");
      const claimedDays = JSON.parse(localStorage.getItem("claimedDays") || "[]");

      if (lastClaimTimestamp) {
        const elapsedTime = currentTimestamp - parseInt(lastClaimTimestamp, 10);
        const hoursPassed = elapsedTime / (1000 * 60 * 60); // Convert to hours

        if (hoursPassed >= 24) {
          const nextDayId = claimedDays.length + 1;
          setActiveDayId(nextDayId <= days.length ? nextDayId : days.length);
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
    setSelectedDayId(null);
  };

  const handleDayClick = (id: number) => {
    setSelectedDayId(id);
  };

  const handleClaimNow = () => {
    if (selectedDayId !== null && selectedDayId === activeDayId) {
      const selectedDay = days.find((day) => day.id === selectedDayId);
      if (selectedDay) {
        const currentCoins = localStorage.getItem("totalCoins3");
        const totalCoins = currentCoins ? parseInt(currentCoins, 10) : 0;
        localStorage.setItem("totalCoins3", (totalCoins + selectedDay.coin).toString());

        const currentTimestamp = new Date().getTime();
        localStorage.setItem("lastClaimTimestamp", currentTimestamp.toString());

        const claimedDays = JSON.parse(localStorage.getItem("claimedDays") || "[]");
        claimedDays.push(selectedDayId);
        localStorage.setItem("claimedDays", JSON.stringify(claimedDays));

        setClaimedDays(claimedDays); // Update the claimed days
        alert(`You have claimed ${selectedDay.coin} coins!`);
      }
    } else {
      alert("This day is not yet active. Please wait until the previous day has been available for 24 hours.");
    }
  };

  return (
    <>
      <div className="DailyTask">
        <h1>Daily Task</h1>
        <div className="DailyTaskClick">
          <div className="DailyTask_first">
            <img src={dailyTask} alt="" />
            <div className="textDailyTask">
              <h1>the trend you can't ignore</h1>
              <div className="DailyTask_insideText">
                <img src={textImage} alt="" />
                +100,000
              </div>
            </div>
          </div>
          <div className="DailyTask_second" onClick={openForm}>
            <IoIosArrowForward />
          </div>
        </div>
      </div>
      {state && (
        <div className="form-popup">
          <IoCloseCircle className="close" onClick={closeForm} />
          <img src={dailyTask} alt="Hamster Youtube" />
          <h1>the trend you can't ignore</h1>
          <div className="mainFlex">
            {days.map((day) => (
              <div
                className={`boxFlex ${selectedDayId === day.id ? 'selected' : ''} ${claimedDays.includes(day.id) ? 'boxFlex2' : ''}`}
                key={day.id}
                onClick={() => handleDayClick(day.id)}
                style={{ opacity: day.id <= activeDayId ? 1 : 0.5 }}
              >
                <h1>{day.day}</h1>
                <img src={textImage} alt="" />
                <h2>{day.coin}</h2>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="btnClaim"
            onClick={remainingTime <= 0 ? handleClaimNow : undefined} // Only handle click if time is up
            disabled={remainingTime > 0} // Disable button if remainingTime > 0
          >
            {remainingTime > 0 ? `Back to Tomorrow (${Math.ceil(remainingTime / 1000)}s)` : "Claim Now"}
          </button>
        </div>
      )}
    </>
  );
};

export default DailyTask;
