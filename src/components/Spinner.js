import React from "react";
import loading from "./loading.gif";

const Spinner = () => {
  return (
    <div>
      <div className="text-center">
        <img src={loading} className="my-3" alt="loading" />
      </div>
    </div>
  );
};

export default Spinner;
