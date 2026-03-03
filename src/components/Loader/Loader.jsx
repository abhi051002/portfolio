import React from "react";

const Loader = ({ text = "Loading...", size = "60px", minHeight = "300px" }) => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4"
      style={{ minHeight }}
    >
      <div
        className="rounded-full border-4 border-violet-900 border-t-violet-500 animate-spin"
        style={{ width: size, height: size }}
      />
      <p className="text-violet-400 text-sm font-medium tracking-widest uppercase animate-pulse">
        {text}
      </p>
    </div>
  );
};

export default Loader;