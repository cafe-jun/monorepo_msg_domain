import { Routes, Route } from "react-router-dom";
import UserAuth from "./utils/UserAuth";
import SignIn from "./pages/Auth/Login";
import styled from "styled-components";

const App: React.FC = () => {
  return (
    <UserAuth>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </UserAuth>
  );
};

export default App;
