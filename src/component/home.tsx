import Mid from "../component/mid";
import NavBarButton from "../component/navBarButton";
import FooterBtn from "../component/homeFooterBtn";
import "../assets/css/homePage.css";


function Home() {
  return (
    <>
      <div className="mainContainer">
        <NavBarButton />
        <Mid />
        <FooterBtn />
      </div>
    </>
  );
}

export default Home;
