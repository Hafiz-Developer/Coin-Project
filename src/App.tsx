import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./component/home";
import Daily from "./component/dailyRewards";
import InviteFriends from "./component/inviteFrieds";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/DailyRewards" element={<Daily />} />
          <Route path="/InviteFriends" element={<InviteFriends />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
