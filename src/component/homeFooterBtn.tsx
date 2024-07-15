import { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdEnergySavingsLeaf } from "react-icons/md";
const FooterBtn = () => {
  const [activation, setActivation] = useState("home");
  const handleClick = (e: any) => {
    setActivation(e);
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
          className={activation === "daily rewards" ? "active" : ""}
          onClick={() => handleClick("daily rewards")}
        >
          <FaHome className="footerIcon" />
          daily rewards
        </button>
        <button
          className={activation === "invite friends" ? "active" : ""}
          onClick={() => handleClick("invite friends")}
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
