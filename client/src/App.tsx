import { Routes, Route } from "react-router-dom";
import UserAuth from "./utils/UserAuth";
import SignIn from "./pages/Auth/SingIn";
import OAuth2RedirectHandler from "./components/Oauth2/OAuth2RedirectHandler";

const App: React.FC = () => {
  return (
    // <UserAuth>
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/oauth2/callback/:service"
        element={<OAuth2RedirectHandler />}
      />
    </Routes>
    // </UserAuth>
  );
};

export default App;
