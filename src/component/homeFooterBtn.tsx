import { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdEnergySavingsLeaf } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const FooterBtn = () => {
  const [activation, setActivation] = useState("home");
  const navigate = useNavigate();
  const handleClick = (path: string) => {
    setActivation(path);
    navigate(`${path}`);
  };
  return (
    <>
      <div className="footerBtn">
        <button
          className={activation === "home" ? "active" : ""}
          onClick={() => handleClick("home")}
        >
          <FaUserFriends className="footerIcon" />
          home
        </button>
        <button
          className={activation === "DailyRewards" ? "active" : ""}
          onClick={() => handleClick("DailyRewards")}
        >
          <FaHome className="footerIcon" />
          daily rewards
        </button>
        <button
          className={activation === "InviteFriends" ? "active" : ""}
          onClick={() => handleClick("InviteFriends")}
        >
          <MdEnergySavingsLeaf className="footerIcon" />
          invite friends
        </button>
        <button
          className={activation === "setting" ? "active" : ""}
          onClick={() => handleClick("setting")}
        >
          <MdEnergySavingsLeaf className="footerIcon" />
          setting
        </button>
      </div>
    </>
  );
};

export default FooterBtn;
