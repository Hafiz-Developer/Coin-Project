import dailyTask from "../assets/images/dailyTask.png";
import textImage from "../assets/images/textImage.png";
import { IoIosArrowForward } from "react-icons/io";

const DailyTask = () => {
  return (
    <div className="DailyTask">
        <h1>Daily Task</h1>

        <div className="DailyTaskClick " >

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

          <div className="DailyTask_second">
            <IoIosArrowForward />
          </div>
        </div>
       
      </div>
  )
}

export default DailyTask