import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./component/home";
import Daily from "./component/dailyRewards";
import InviteFriends from "./component/inviteFrieds";
import FooterBtn from "./component/homeFooterBtn";

function App() {
  return (
    <>
      <Router>
      <div className="mainContainer">
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/DailyRewards" element={<Daily />} />
          <Route path="/InviteFriends" element={<InviteFriends />}/>
        </Routes>
        <FooterBtn />
        </div>
      </Router>
    </>
  );
}

export default App;
