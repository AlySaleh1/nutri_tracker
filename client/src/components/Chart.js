import { useState } from "react";

const Chart = ({ nutriInfo }) => {
  const [selectedData, setSelectedData] = useState("total");
  const dataOptions = nutriInfo.map((item) => item.name);

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
        <select
          className="form-select w-full max-w-xs"
          value={selectedData}
          onChange={(e) => setSelectedData(e.target.value)}
        >
          {dataOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Chart;
