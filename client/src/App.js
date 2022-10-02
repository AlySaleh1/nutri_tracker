import { useState } from "react";
import foodHandler from "./services/food";
import Navbar from "./components/Navbar";
import PhotoForm from "./components/PhotoForm";
import Chart from "./components/Chart";

const App = () => {
  const [submitted, setSubmitted] = useState(false);
  const [nutriInfo, setNutriInfo] = useState([]);

  // useState(() => {
  //   setNutriInfo([
  //     {
  //       name: "Apple",
  //       nutrients: {
  //         calories: 0.05,
  //         fat: 0.0,
  //         carbs: 0.2,
  //         protein: 0.0,
  //       },
  //     },
  //     {
  //       name: "burger",
  //       nutrients: {
  //         calories: 0.2,
  //         fat: 0.6,
  //         carbs: 0.3,
  //         protein: 0.5,
  //       },
  //     },
  //     {
  //       name: "Total",
  //       nutrients: {
  //         calories: 0.7,
  //         fat: 0.6,
  //         carbs: 0.5,
  //         protein: 0.5,
  //       },
  //     },
  //   ]);
  // });

  useState(async () => {
    const cur_nutriInfo = await foodHandler.getNutriInfo();
    if (cur_nutriInfo) {
      const cur_total = {
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      };
      cur_nutriInfo.forEach((item) => {
        cur_total.calories += item.nutrients.calories;
        cur_total.fat += item.nutrients.fat;
        cur_total.carbs += item.nutrients.carbs;
        cur_total.protein += item.nutrients.protein;
      });
      cur_total.calories = cur_total.calories < 1 ? cur_total.calories : 1;
      cur_total.fat = cur_total.fat < 1 ? cur_total.fat : 1;
      cur_total.carbs = cur_total.carbs < 1 ? cur_total.carbs : 1;
      cur_total.protein = cur_total.protein < 1 ? cur_total.protein : 1;
      cur_nutriInfo.push({
        name: "total",
        nutrients: cur_total,
      });
      setNutriInfo(cur_nutriInfo);
    }
  }, []);

  const uploadPhoto = async (fd) => {
    setSubmitted(true);
    const newNutriData = await foodHandler.process(fd);
    console.log(newNutriData.data);
    setSubmitted(false);
  };

  return (
    <div className="h-screen flex-auto bg-base-100 text-black">
      <Navbar></Navbar>
      <div className="flex justify-center items-center h-4/5 space-x-10">
        <PhotoForm uploadPhoto={uploadPhoto} submitted={submitted} />
        {nutriInfo.length !== 0 ? (
          <Chart nutriInfo={nutriInfo} />
        ) : (
          <div className="card w-3/5 shadow-lg bg-white hover:shadow-gray-500">
            <div className="card-body">
              <h2 className="card-title">Nutrient Consumption</h2>
              <p className="card-subtitle">
                No data yet, so go on and record your first meal!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
