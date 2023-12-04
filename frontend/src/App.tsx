import React, { lazy, Suspense } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "@pages/auth/SingIn";
import Lobby from "@pages/Lobby";
import { RecoilRoot } from "recoil";
import Loading from "@components/Loading";
import Main from "@pages/Main";
import ProtectRoute from "@components/route/ProtectRoute";
import Game from "@pages/Game";

const App: React.FC = () => {
  const Main = lazy(async () => await import("@pages/Main"));
  const Lobby = lazy(async () => await import("@pages/Lobby"));
  return (
    <RecoilRoot>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/lobby"
            element={
              <ProtectRoute>
                <Lobby />
              </ProtectRoute>
            }
          />
          <Route
            path="/game"
            element={
              <ProtectRoute>
                <Game />
              </ProtectRoute>
            }
          />
          {/* <Route path="/share-result/:id" element={<ShareResult />} /> */}
          <Route path="/*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </Suspense>
    </RecoilRoot>
  );
};

export default App;
