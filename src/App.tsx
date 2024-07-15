import Main from "./component/main"
import NavBarButton from "./component/navBarButton"
import './assets/css/firtsPage.css'
import FooterBtn from "./component/homeFooterBtn"


function App() {

  return (
    <>
   <div className="mainContainer">
    <NavBarButton/>
    <Main/>
    <FooterBtn/>
   </div>
    </>
  )
}

export default App
