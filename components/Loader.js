import React from "react";
const Loader = () => {
  return (
    <div className="absolute w-11/12 mx-auto text-center z-50 p-2 px-4 rounded backdrop-blur">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ margin: "auto", background: "none", display: "block" }}
        width="100px"
        height="100px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle cx="50" cy="50" r="0" fill="none" stroke="#000" strokeWidth="2">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1.5s"
            values="0; 40"
            keyTimes="0; 1"
            keySplines="0 0.2 0.8 1"
            calcMode="spline"
          ></animate>
          <animate
            attributeName="opacity"
            repeatCount="indefinite"
            dur="1.5s"
            values="1; 0"
            keyTimes="0; 1"
            keySplines="0.2 0 0.8 1"
            calcMode="spline"
          ></animate>
        </circle>
        <circle
          cx="50"
          cy="50"
          r="0"
          fill="none"
          stroke="#000"
          strokeWidth="2"
          transform="rotate(90 50 50)"
        >
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1.5s"
            values="0; 40"
            keyTimes="0; 1"
            keySplines="0 0.2 0.8 1"
            calcMode="spline"
          ></animate>
          <animate
            attributeName="opacity"
            repeatCount="indefinite"
            dur="1.5s"
            values="1; 0"
            keyTimes="0; 1"
            keySplines="0.2 0 0.8 1"
            calcMode="spline"
          ></animate>
        </circle>
      </svg>
    </div>
  );
};
export default Loader;
