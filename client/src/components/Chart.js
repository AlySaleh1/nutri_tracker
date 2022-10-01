import { useState } from "react";

const Chart = ({ nutriInfo }) => {
  const today = new Date();
  const date = today.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="card w-3/5 shadow-lg bg-white hover:shadow-gray-500">
      <div className="card-body">
        <h2 className="card-title">Nutrient Consumption - {date}</h2>
      </div>
    </div>
  );
};

export default Chart;
