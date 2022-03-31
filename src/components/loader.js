import React from "react";
import Spin from "react-reveal/Spin";
const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin forever="true">
        <img
          style={{ width: "60px", alignSelf: "center" }}
          src="/covidHome.png"
          alt=""
        />
      </Spin>
    </div>
  );
};

export default Loader;
