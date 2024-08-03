import  '../assets/css/inviteFriend.css'
import gift from '../assets/images/invtieImage.png'
import textImage from '../assets/images/textImage.png'
import { FaRegCopy } from "react-icons/fa";
import { RiContactsBookUploadLine } from "react-icons/ri";

const InviteFriends = () => {
  
  return (
    <>
      <div className="inviteFriend">
      <div className="heading">
          <h1>invite Friends !</h1>
          <p>You and your friend will receive bonuses </p>
        </div>
        <div className="note">
          <h1>Note :</h1>
          <p>
            You are detected as Pakistani user so you can withdraw all of your
            earned balance in Pakistani E-Wallets. Thanks You
          </p>
        </div>
        <div className="gift">
          <img src={gift} alt="" />
          <div className="inner_text_gift">
            <h2>invite a friend</h2>
            <span><img src={textImage} alt="" /> <p>+ 5000</p> for you and your friend</span>
          </div>
        </div>

       <div className="inviteCopyLink">
          <button type='button'>invite friend<RiContactsBookUploadLine/></button>
          <button type='button'><FaRegCopy/></button>
       </div>
      </div>
    </>
  );
};

export default InviteFriends;
