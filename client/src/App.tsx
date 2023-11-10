import { Routes, Route } from "react-router-dom";
import Messenger from "./pages/Messenger";
import UserAuth from "./utils/UserAuth";
import RequireAuth from "./utils/RequireAuth";
import Auth from "./pages/Auth";

const App: React.FC = () => {
  return (
    <UserAuth>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Messenger />
            </RequireAuth>
          }
        />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </UserAuth>
  );
};

export default App;
