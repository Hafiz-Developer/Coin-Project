import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import textImage from "../assets/images/textImage.png";
import 'react-toastify/dist/ReactToastify.css';
import telegramTaskList from "../assets/images/telegramTaskList.png";
import youtubeTaskLisk from "../assets/images/youtubeTaskLisk.png";
import WhatsapptaskList from "../assets/images/WhatsapptaskList.png";
import QuoraTaskList from "../assets/images/QuoraTaskList.png"; 
import { IoCloseCircle } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { CiNoWaitingSign } from "react-icons/ci"; 
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
  const [totalCoins, setTotalCoins] = useState<number>(0);

  const tasks: Task[] = [
    {
      id: 1,
      points: "+1000",
      title: "Join Telegram Group",
      img: telegramTaskList,
      link: " https://t.me/pumapunch"
    },
    {
      id: 2,
      points: "+1000",
      title: "Subscribe Youtube",
      img: youtubeTaskLisk,
      link: "https://youtube.com/@pumapunchgame"
    },
    {
      id: 3,
      points: "+1000",
      title: "Join Whatsapp Group",
      img: WhatsapptaskList,
      link: " https://whatsapp.com/channel/0029VafEfMZLtOjJNcWbyp2E"
    },
    {
      id: 4,
      points: "+1000",
      title: "Follow Quora",
      img: QuoraTaskList,
      link: " https://pumapunch.quora.com/?ch=10&oid=6259170&share=396067ef&srid=u8UzBq&target_type=tribe"
    },
  ];

  useEffect(() => {
    const savedTotalCoins = localStorage.getItem('totalCoinsTaskList');
    if (savedTotalCoins) {
      setTotalCoins(parseInt(savedTotalCoins, 10));
    }

    const storedStates = tasks.reduce((acc, task) => {
      const joinClicked = localStorage.getItem(`joinClicked-${task.id}`) === 'true';
      const claimVisible = localStorage.getItem(`claimVisible-${task.id}`) === 'true';
      const coinsAdded = localStorage.getItem(`coinsAdded-${task.id}`) === 'true';
      const joinTimestamp = localStorage.getItem(`joinTimestamp-${task.id}`);
      const timePassed = joinTimestamp ? Date.now() - parseInt(joinTimestamp, 10) : 0;
      const timeLeft = 3600000  - timePassed; // 6 seconds in milliseconds

      acc[task.id] = {
        joinClicked,
        waitMessage: joinClicked && timeLeft > 0,
        claimVisible: claimVisible || (joinClicked && timeLeft <= 0),
        coinsAdded,
      };
      return acc;
    }, {} as Record<number, { joinClicked: boolean; waitMessage: boolean; claimVisible: boolean; coinsAdded: boolean }>);

    setTasksState(storedStates);

    const total = tasks.reduce((sum, task) => {
      const { claimVisible, coinsAdded } = storedStates[task.id] || {};
      if (claimVisible && !coinsAdded) {
        const points = parseInt(task.points.replace(/[^0-9]/g, '')); 
        return sum + points;
      }
      return sum;
    }, 0);
    setTotalCoins(total);

    localStorage.setItem('totalCoinsTaskList', total.toString());

    const intervalId = setInterval(() => {
      const newState = tasks.reduce((acc: any, task: any) => {
        const joinTimestamp = localStorage.getItem(`joinTimestamp-${task.id}`);
        if (joinTimestamp) {
          const timePassed = Date.now() - parseInt(joinTimestamp, 10);
          if (timePassed >= 3600000  && !tasksState[task.id]?.coinsAdded) {
            acc[task.id] = {
              ...tasksState[task.id],
              waitMessage: false,
              claimVisible: true,
              coinsAdded: true
            };
            localStorage.setItem(`claimVisible-${task.id}`, 'true');
            localStorage.setItem(`coinsAdded-${task.id}`, 'true');
          }
        }
        return acc;
      }, {});

      if (Object.keys(newState).length > 0) {
        setTasksState(prevState => ({
          ...prevState,
          ...newState
        }));

        const total = tasks.reduce((sum, task) => {
          const { claimVisible, coinsAdded } = tasksState[task.id] || {};
          if (claimVisible && coinsAdded) {
            const points = parseInt(task.points.replace(/[^0-9]/g, ''));
            return sum + points;
          }
          return sum;
        }, 0);
        setTotalCoins(total);

        localStorage.setItem('totalCoinsTaskList', total.toString());
      }
    }, 1000);

    return () => clearInterval(intervalId); 
  }, [tasks, tasksState]);

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

    window.location.href = task.link || '#';
  };

  const handleClaimClick = (taskId: number, points: string) => {
    toast.info(`You have already collected the coin for task ${taskId}. Points: ${points}`);
};


  return (
    <>
      <ToastContainer />
      <div className="lastTask">
        <h1>Tasks List</h1>
        <h2 style={{
          display: 'none'
        }}>Total Coins: {totalCoins.toLocaleString()}</h2>
        {tasks.map(task => (
          <div key={task.id} className={`lastTask_Click ${tasksState[task.id]?.claimVisible ? "ahmad" : ""}`}>
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
              {tasksState[task.id]?.claimVisible ? (
                <TiTick className="tick" />
              ) : tasksState[task.id]?.waitMessage ? (
                <CiNoWaitingSign />
              ) : (
                <IoIosArrowForward />
              )}
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
            <p>You can collect the coin from here after 1 hour.</p>
          ) : tasksState[linkVisible].claimVisible ? (
            <>
              <button type="button" className="btn" onClick={() => handleClaimClick(linkVisible, tasks.find(task => task.id === linkVisible)?.points || '')}>Claimed</button>
            </>
          ) : null}
        </div>
      )}
    </>
  );
};

export default LastTask;
``
