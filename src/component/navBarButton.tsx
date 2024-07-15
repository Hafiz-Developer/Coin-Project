
import { IoIosContact } from "react-icons/io";
import { FaFireFlameCurved } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
const NavBarButton = () => {
  return (
    <>
    <div className="navBarButton">
        <a href="">
            <IoIosContact id="iconNavbar"/>
            Code It Down
        </a>
        <a href="">
            <FaFireFlameCurved id="iconNavbar"/>
            Boost
        </a>
        <a href="">
            <FaWallet id="iconNavbar"/>
            Wallet
        </a>
    </div>
    
    </>
  )
}

export default NavBarButton