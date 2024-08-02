import { useState, useEffect } from "react";
import { FaUserFriends, FaHome } from "react-icons/fa";
import { MdEnergySavingsLeaf } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const FooterBtn = () => {
  const [activation, setActivation] = useState<string>("home");
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the stored path from localStorage or default to "home"
    const storedPath = localStorage.getItem("activePath") || "home";
    setActivation(storedPath);
    navigate(`/${storedPath}`);
  }, [navigate]);

  const handleClick = (path: string) => {
    setActivation(path);
    localStorage.setItem("activePath", path); // Store the path in localStorage
    navigate(`/${path}`);
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
          wallet
        </button>
      </div>
    </>
  );
};

export default FooterBtn;
