import "../assets/css/DailyRewards.css";
import DailyImage from "../assets/images/DailyImage.png";
import DailyTask from "./dailyTask";
import LastTask from "./lastTask";
import Youtube from "./youtube";
const DailyRewards = () => {
  return (
    <div className="DailyRewards">
      <div className="dataFirst">
        <img src={DailyImage} alt="" />
        <h1>Earn More Coins</h1>
      </div>
      <Youtube/>
      <DailyTask/>
      <LastTask/>
    </div>
  );
};

export default DailyRewards;
