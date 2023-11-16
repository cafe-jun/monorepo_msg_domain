import { Routes, Route } from "react-router-dom";
import UserAuth from "./utils/UserAuth";
import SignIn from "./pages/Auth/Login";
import styled from "styled-components";
import Hello from "./pages/Hello";

const App: React.FC = () => {
  return (
    // <UserAuth>
    <Routes>
      <Route path="/signin" element={<Hello />} />
    </Routes>
    // </UserAuth>
  );
};

export default App;
