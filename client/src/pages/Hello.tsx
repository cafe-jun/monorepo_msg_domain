import React from "react";

const Hello = () => {
  return (
    <div
      style={{
        backgroundImage: 'url("./assets/background.png")',
        backgroundRepeat: "no-repeat",
        border: 0,
        padding: 0,
        height: "100vh",

        backgroundPosition: "center",
        backgroundSize: "center",
      }}
    >
      <div>hello</div>
    </div>
  );
};

export default Hello;
