import facebook from "../assets/images/facebok.png";
import instagram from "../assets/images/instagram.png";
import ticktok from "../assets/images/ticktok.png";
import textImage from "../assets/images/textImage.png";
import { IoIosArrowForward } from "react-icons/io";

const LastTask = () => {
  return (
    <div className="lastTask">
      <h1>Tasks List</h1>
      <div className="lastTask_Click ">
        <div className="lastTask_first">
          <img src={facebook} alt="" />
          <div className="lastTask_text">
            <h1>Join Fcaebook Group</h1>
            <div className="lastTask_insideText">
              <img src={textImage} alt="" />
              +100,000
            </div>
          </div>
        </div>
        <div className="lastTask_second">
          <IoIosArrowForward />
        </div>
      </div>
      <div className="lastTask_Click ">
        <div className="lastTask_first">
          <img src={instagram} alt="" />
          <div className="lastTask_text">
            <h1>Join Fcaebook Group</h1>
            <div className="lastTask_insideText">
              <img src={textImage} alt="" />
              +100,000
            </div>
          </div>
        </div>
        <div className="lastTask_second">
          <IoIosArrowForward />
        </div>
      </div>
      <div className="lastTask_Click ">
        <div className="lastTask_first">
          <img src={ticktok} alt="" />
          <div className="lastTask_text">
            <h1>Join Fcaebook Group</h1>
            <div className="lastTask_insideText">
              <img src={textImage} alt="" />
              +100,000
            </div>
          </div>
        </div>
        <div className="lastTask_second">
          <IoIosArrowForward />
        </div>
      </div>
      <div className="lastTask_Click ">
        <div className="lastTask_first">
          <img src={ticktok} alt="" />
          <div className="lastTask_text">
            <h1>Join Fcaebook Group</h1>
            <div className="lastTask_insideText">
              <img src={textImage} alt="" />
              +100,000
            </div>
          </div>
        </div>
        <div className="lastTask_second">
          <IoIosArrowForward />
        </div>
      </div>
      
    </div>
  );
};

export default LastTask;
