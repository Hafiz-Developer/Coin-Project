import Mid from "../component/mid";
import NavBarButton from "../component/navBarButton";
import "../assets/css/homePage.css";
import img from '../assets/images/coin.ico'


function Home() {
  return (
    <div className="homeMain">
      <div className="profile">
      <h1 >Puma Punch</h1>
      <div className="inner_profile">
        <img src={img} alt="" />
        <div className="text">
        <h2>hafiz ahmad</h2>
        <h3>@hafizwebdev</h3>
        </div>
      </div>
      </div>
        <NavBarButton />
        <Mid />
      {/* </div> */}
    </div>
  );
}

export default Home;
