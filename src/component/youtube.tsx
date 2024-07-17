import YoutubeImage from "../assets/images/youtubeLogo.png";
import textImage from "../assets/images/textImage.png";
import { IoIosArrowForward } from "react-icons/io";
const Youtube = () => {
  return (
    <>
      <div className="youtube">
        <h1>Hamster Youtube</h1>

        <div className="youtubeClick">
          <div className="first" >
            <img src={YoutubeImage} alt="" />

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
        <div className="youtubeClick">
          <div className="first">
            <img src={YoutubeImage} alt="" />

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
    </>
  );
};

export default Youtube;
