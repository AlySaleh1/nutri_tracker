import { useState } from "react";
import foodHandler from "./services/food";
import Navbar from "./components/Navbar";
import PhotoForm from "./components/PhotoForm";
import Chart from "./components/Chart";

const App = () => {
  const [submitted, setSubmitted] = useState(false);
  const [nutriInfo, setNutriInfo] = useState([]);

  useState(async () => {
    const cur_nutriInfo = await foodHandler.getNutriInfo();
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
  }, []);

  const uploadPhoto = async (fd) => {
    setSubmitted(true);
    const newNutriData = await foodHandler.process(fd);
    console.log(newNutriData);
    setSubmitted(false);
  };

  return (
    <div className="h-screen flex-auto bg-base-100 text-black">
      <Navbar></Navbar>
      <div className="flex justify-center items-center h-full space-x-10">
        <PhotoForm uploadPhoto={uploadPhoto} submitted={submitted} />
        <Chart nutriInfo={nutriInfo} />
      </div>
    </div>
  );
};

export default App;
