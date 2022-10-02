import { useState } from "react";

const Chart = ({ nutriInfo }) => {
  const [selectedData, setSelectedData] = useState("total");
  const dataOptions = nutriInfo.map((item) => item.name.toLowerCase());
  const data = nutriInfo.find(
    (item) => item.name.toLowerCase() === selectedData
  );
  console.log(data);

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
          className="select select-bordered select-sm w-1/5 bg-white border-gray-500"
          onChange={(e) => setSelectedData(e.target.value.toLowerCase())}
          defaultValue={"total"}
        >
          {dataOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="flex flex-row items-center justify-center space-y-4">
          <h2 className="w-1/5 ">Calories</h2>
          <progress
            className="progress h-12 w-4/5 progress-primary"
            value={data.nutrients.calories}
            max="1"
          ></progress>
        </div>
        <div className="flex flex-row items-center justify-center space-y-4">
          <h2 className="w-1/5 ">Fat</h2>
          <progress
            className="progress h-12 w-4/5 progress-primary"
            value={data.nutrients.fat}
            max="1"
          ></progress>
        </div>
        <div className="flex flex-row items-center justify-center space-y-4">
          <h2 className="w-1/5 ">Carbs</h2>
          <progress
            className="progress h-12 w-4/5 progress-primary"
            value={data.nutrients.carbs}
            max="1"
          ></progress>
        </div>
        <div className="flex flex-row items-center justify-center space-y-4">
          <h2 className="w-1/5 ">Protein</h2>
          <progress
            className="progress h-12 w-4/5 progress-primary"
            value={data.nutrients.protein}
            max="1"
          ></progress>
        </div>
      </div>
    </div>
  );
};

export default Chart;
