import dailyTask from "../assets/images/dailyTask.png";
import textImage from "../assets/images/textImage.png";
import { IoIosArrowForward } from "react-icons/io";

const DailyTask = () => {
  return (
    <div className="youtube">
        <h1>Daily Task</h1>

        <div className="youtubeClick " id="dailyP">
          <div className="first">
            <img src={dailyTask} alt="" />

            <div className="textYoutube">
              <h1>the trend you can't ignore</h1>
              <div className="insideText">
                <img src={textImage} alt="" />
                +100,000
              </div>
            </div>
          </div>

          <div className="second">
            <IoIosArrowForward />
          </div>
        </div>
       
      </div>
  )
}

export default DailyTask