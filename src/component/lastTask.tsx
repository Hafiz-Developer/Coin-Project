import facebook from "../assets/images/facebok.png";
import instagram from "../assets/images/instagram.png";
import ticktok from "../assets/images/ticktok.png";
import textImage from "../assets/images/textImage.png";
import { IoIosArrowForward } from "react-icons/io";

const LastTask = () => {
  return (
    <div className="youtube">
        <h1>Tasks List</h1>

        <div className="youtubeClick " id="dailyP">
          <div className="first" id="first">
            <img src={facebook} alt="" />
            <div className="textYoutube">
              <h1>Join Fcaebook Group</h1>
              <div className="insideText" >
                <img src={textImage} alt="" />
                +100,000
              </div>
            </div>
          </div>

          <div className="second">
            <IoIosArrowForward />
          </div>
        </div>
        <div className="youtubeClick " id="dailyP">
          <div className="first" id="first">
            <img src={instagram} alt="" />
            <div className="textYoutube">
              <h1>Follow our i account</h1>
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
        <div className="youtubeClick " id="dailyP">
          <div className="first" id="first">
            <img src={ticktok} alt="" />
            <div className="textYoutube">
              <h1>Follow our t/t account</h1>
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

export default LastTask