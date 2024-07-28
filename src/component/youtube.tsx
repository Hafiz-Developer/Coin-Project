import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YoutubeImage from "../assets/images/youtubeLogo.png";
import textImage from "../assets/images/textImage.png";
import { IoIosArrowForward } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { CiNoWaitingSign } from "react-icons/ci";
import "../assets/css/popup.css";

interface fetchDatas {
  id: number;
  title: string;
  description: string;
  link: string;
}

const Youtube = () => {
  const POINTS = 3000; 
  const [formVisible, setFormVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [data, setData] = useState<fetchDatas[]>([]);
  const [totalCoinsYoutube, setTotalCoinsYoutube] = useState<number>(0);
  const [taskStates, setTaskStates] = useState<Record<number, { joinClickedYoutube: boolean; waitMessage: boolean; claimVisibleYoutube: boolean; coinsAddedYoutube: boolean }>>({});

  const openForm = (id: number) => {
    setSelectedId(id);
    setFormVisible(true);
  };

  const closeForm = () => {
    setSelectedId(null);
    setFormVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = await fetch(`http://localhost:3800/api/lead/list`);
      const res = await url.json();
      setData(res.result);

      const savedTotalCoinsYoutube = localStorage.getItem('totalCoinsYoutube');
      if (savedTotalCoinsYoutube) {
        setTotalCoinsYoutube(parseInt(savedTotalCoinsYoutube, 10));
      }

      const storedState = res.result.reduce((acc: any, task: fetchDatas) => {
        const joinClickedYoutube = localStorage.getItem(`joinClickedYoutube-${task.id}`) === 'true';
        const claimVisibleYoutube = localStorage.getItem(`claimVisibleYoutube-${task.id}`) === 'true';
        const coinsAddedYoutube = localStorage.getItem(`coinsAddedYoutube-${task.id}`) === 'true';
        const joinTimestampYoutube = localStorage.getItem(`joinTimestampYoutube-${task.id}`);
        const timePassedYoutube = joinTimestampYoutube ? Date.now() - parseInt(joinTimestampYoutube, 10) : 0;
        const timeLeftYoutube = 3000 - timePassedYoutube; // 1 hour in milliseconds

        acc[task.id] = {
          joinClickedYoutube,
          waitMessage: joinClickedYoutube && timeLeftYoutube > 0,
          claimVisibleYoutube: claimVisibleYoutube || (joinClickedYoutube && timeLeftYoutube <= 0),
          coinsAddedYoutube,
        };
        return acc;
      }, {});

      setTaskStates(storedState);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newState = data.reduce((acc: any, task: fetchDatas) => {
        const joinTimestampYoutube = localStorage.getItem(`joinTimestampYoutube-${task.id}`);
        if (joinTimestampYoutube) {
          const timePassedYoutube = Date.now() - parseInt(joinTimestampYoutube, 10);
          if (timePassedYoutube >= 3000 && !taskStates[task.id]?.coinsAddedYoutube) {
            acc[task.id] = {
              ...taskStates[task.id],
              waitMessage: false,
              claimVisibleYoutube: true,
              coinsAddedYoutube: true,
            };
            localStorage.setItem(`claimVisibleYoutube-${task.id}`, 'true');
            localStorage.setItem(`coinsAddedYoutube-${task.id}`, 'true');
          }
        }
        return acc;
      }, {});

      if (Object.keys(newState).length > 0) {
        setTaskStates((prevState) => ({
          ...prevState,
          ...newState,
        }));

        const total = Object.keys(newState).reduce((sum, taskId) => {
          const { claimVisibleYoutube, coinsAddedYoutube } = newState[taskId] || {};
          if (claimVisibleYoutube && coinsAddedYoutube) {
            return sum + POINTS; // Use the points constant
          }
          return sum;
        }, totalCoinsYoutube);

        setTotalCoinsYoutube(total);

        localStorage.setItem('totalCoinsYoutube', total.toString());
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [data, taskStates, totalCoinsYoutube]);

  const handleJoinClickYoutube = (task: fetchDatas, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setTaskStates((prevState) => {
      const newState = { ...prevState };
      newState[task.id] = { ...newState[task.id], joinClickedYoutube: true, waitMessage: true };
      return newState;
    });

    localStorage.setItem(`joinClickedYoutube-${task.id}`, 'true');
    localStorage.setItem(`joinTimestampYoutube-${task.id}`, Date.now().toString());

    window.location.href = task.link || '#';
  };

  const handleClaimClickYoutube = (taskId: number) => {
    const task = data.find((t) => t.id === taskId);
    if (task) {
      toast.info(`You have already collected the coin. ${POINTS}`); // Use the points constant
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="youtube">
        <h1>Hamster Youtube</h1>
        {data.map((dataAll) => (
          <div className={`youtubeClick ${taskStates[dataAll.id]?.claimVisibleYoutube ? "ahmad" : ""}`} key={dataAll.id}>
            <div className="first">
              <img src={YoutubeImage} alt="Hamster Youtube" />
              <div className="textYoutube">
                <h1>{dataAll.title}</h1>
                <div className="insideText">
                  <img src={textImage} alt="" />
                  +{POINTS} 
                </div>
              </div>
            </div>
            <div className="second" onClick={() => openForm(dataAll.id)}>
              {taskStates[dataAll.id]?.claimVisibleYoutube ? (
                <TiTick className="tick" />
              ) : taskStates[dataAll.id]?.waitMessage ? (
                <CiNoWaitingSign />
              ) : (
                <IoIosArrowForward />
              )}
            </div>
          </div>
        ))}
      </div>

      {formVisible && selectedId !== null && (
        <div className="form-popup">
          <IoCloseCircle className="close" onClick={closeForm} />
          <img src={YoutubeImage} alt="Hamster Youtube" />
          {data
            .filter((dataAll) => dataAll.id === selectedId)
            .map((filteredData) => (
              <div key={filteredData.id} className="youtubeDivInside">
                <h1>{filteredData.title}</h1>
                <div className="smallImageCoin">
                  <img src={textImage} alt="" />
                  +{POINTS} {/* Use the points constant */}
                </div>
                {!taskStates[selectedId]?.claimVisibleYoutube && !taskStates[selectedId]?.joinClickedYoutube ? (
                  <a href={filteredData.link} onClick={(e) => handleJoinClickYoutube(filteredData, e)}>Join</a>
                ) : !taskStates[selectedId]?.claimVisibleYoutube && taskStates[selectedId]?.waitMessage ? (
                  <p>You can collect the coin from here after one hour.</p>
                ) : taskStates[selectedId]?.claimVisibleYoutube ? (
                  <button type="button" className="btn" onClick={() => handleClaimClickYoutube(selectedId)}>Claimed</button>
                ) : null}
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Youtube;
