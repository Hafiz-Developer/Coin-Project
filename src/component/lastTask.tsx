import facebook from "../assets/images/facebok.png";

import textImage from "../assets/images/textImage.png";
import { IoCloseCircle } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import "../assets/css/popup.css";
import { useState } from "react";

const LastTask = () => {
  const [linkVisible, setLinkVisible] = useState(false);

  const openCoin = () => setLinkVisible(true);
  const closeCoin = () => setLinkVisible(false);
  return (
    <>
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
          <div className="lastTask_second" onClick={openCoin}>
            <IoIosArrowForward />
          </div>
        </div>
      </div>
      {linkVisible && (
        <div className="form-popup">
          <IoCloseCircle className="close" onClick={closeCoin}/>
          <img src={facebook} alt="" />
          <h1>join our facebook</h1>
            <div className="smallImageCoin">
              <img src={textImage} alt="" />
              +100,000
            </div>
          <a href=""> join </a>
          <div className="btn">
            {/* <button type="button">claim Now</button> */}
          
          </div>
        </div>
      )}
    </>
  );
};

export default LastTask;
