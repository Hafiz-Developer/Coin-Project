import React, { useState, useEffect } from 'react';
import facebook from "../assets/images/facebok.png";
import textImage from "../assets/images/textImage.png";
import instagram from "../assets/images/instagram.png";
import ticktok from "../assets/images/ticktok.png"; 
import { IoCloseCircle } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
// import { SiTicktick } from "react-icons/si";
import "../assets/css/popup.css";

// Define a type for tasks
interface Task {
  id: number;
  points: string;
  title: string;
  img: string;
  link?: string;  // Ensure link is optional
}

const LastTask: React.FC = () => {
  const [linkVisible, setLinkVisible] = useState<number | null>(null);
  const [tasksState, setTasksState] = useState<Record<number, { joinClicked: boolean; waitMessage: boolean; claimVisible: boolean; coinsAdded: boolean }>>({});
  const [totalCoins, setTotalCoins] = useState(0);

  const tasks: Task[] = [
    {
      id: 1,
      points: "+100,000",
      title: "Join Facebook Group",
      img: facebook,
      link: "https://www.facebook.com"
    },
    {
      id: 2,
      points: "+150,000",
      title: "Follow Instagram",
      img: instagram,
      link: "https://www.instagram.com"
    },
    {
      id: 3,
      points: "+200,000",
      title: "Follow TikTok",
      img: ticktok,
      link: "https://www.tiktok.com"
    },
    // Add more tasks as needed
  ];

  useEffect(() => {
    const storedStates = tasks.reduce((acc, task) => {
      const joinClicked = localStorage.getItem(`joinClicked-${task.id}`) === 'true';
      const claimVisible = localStorage.getItem(`claimVisible-${task.id}`) === 'true';
      const coinsAdded = localStorage.getItem(`coinsAdded-${task.id}`) === 'true';
      const joinTimestamp = localStorage.getItem(`joinTimestamp-${task.id}`);
      const timePassed = joinTimestamp ? Date.now() - parseInt(joinTimestamp, 10) : 0;
      const timeLeft = 100000 - timePassed; // 1 hour in milliseconds

      acc[task.id] = {
        joinClicked,
        waitMessage: joinClicked && timeLeft > 0,
        claimVisible: claimVisible || (joinClicked && timeLeft <= 0),
        coinsAdded,
      };
      return acc;
    }, {} as Record<number, { joinClicked: boolean; waitMessage: boolean; claimVisible: boolean; coinsAdded: boolean }>);

    setTasksState(storedStates);

    // Calculate total coins based on completed tasks
    const total = tasks.reduce((sum, task) => {
      const { claimVisible, coinsAdded } = storedStates[task.id] || {};
      if (claimVisible && !coinsAdded) {
        const points = parseInt(task.points.replace(/[^0-9]/g, '')); // Remove non-numeric characters
        return sum + points;
      }
      return sum;
    }, 0);
    setTotalCoins(total);
  }, [tasks]);

  const openCoin = (task: Task) => {
    setLinkVisible(task.id);
  };

  const closeCoin = () => {
    setLinkVisible(null);
  };

  const handleJoinClick = (task: Task, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setTasksState(prevState => {
      const newState = { ...prevState };
      newState[task.id] = { ...newState[task.id], joinClicked: true, waitMessage: true };
      return newState;
    });

    localStorage.setItem(`joinClicked-${task.id}`, 'true');
    localStorage.setItem(`joinTimestamp-${task.id}`, Date.now().toString());
    localStorage.setItem(`currentDynamicId`, task.id.toString());

    // Navigate to the URL
    window.location.href = task.link || '#';

    setTimeout(() => {
      setTasksState(prevState => {
        const newState = { ...prevState };
        newState[task.id] = { ...newState[task.id], waitMessage: false, claimVisible: true };
        return newState;
      });
      localStorage.setItem(`claimVisible-${task.id}`, 'true');

      // Update total coins after 1 hour
      localStorage.setItem(`coinsAdded-${task.id}`, 'false');
    }, 100000); // 1 hour in milliseconds
  };

  
  return (
    <>
      <div className="lastTask">
        <h1>Tasks List</h1>
        <h2>Total Coins: {totalCoins}</h2>
        {tasks.map(task => (
          <div key={task.id} className="lastTask_Click">
            <div className="lastTask_first">
              <img src={task.img} alt={task.title} />
              <div className="lastTask_text">
                <h1>{task.title}</h1>
                <div className="lastTask_insideText">
                  <img src={textImage} alt="" />
                  {task.points}
                </div>
              </div>
            </div>
            <div className="lastTask_second" onClick={() => openCoin(task)}>
              <IoIosArrowForward />
            </div>
          </div>
        ))}
      </div>
      {linkVisible !== null && tasksState[linkVisible] && (
        <div className="form-popup">
          <IoCloseCircle className="close" onClick={closeCoin} />
          <img src={tasks.find(task => task.id === linkVisible)?.img} alt={tasks.find(task => task.id === linkVisible)?.title} />
          <h1>{tasks.find(task => task.id === linkVisible)?.title}</h1>
          <div className="smallImageCoin">
            <img src={textImage} alt="" />
            {tasks.find(task => task.id === linkVisible)?.points}
          </div>
          {!tasksState[linkVisible].claimVisible && !tasksState[linkVisible].joinClicked ? (
            <a href={tasks.find(task => task.id === linkVisible)?.link} onClick={(e) => handleJoinClick(tasks.find(task => task.id === linkVisible)!, e)}>Join</a>
          ) : !tasksState[linkVisible].claimVisible && tasksState[linkVisible].waitMessage ? (
            <p>You can collect the coin from here after one hour.</p>
          ) : tasksState[linkVisible].claimVisible ? (
            <button type="button" className="btn" >Claimed</button>
          ) : null}
        </div>
      )}
    </>
  );
};

export default LastTask;
