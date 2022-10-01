import { useState } from "react";
import Navbar from "./components/Navbar";
import PhotoForm from "./components/PhotoForm";
import foodHandler from "./services/food";

const App = () => {
  const [submitted, setSubmitted] = useState(false);

  const uploadPhoto = async (fd) => {
    setSubmitted(true);
    const newNutriData = await foodHandler.process(fd);
    console.log(newNutriData);
    setSubmitted(false);
  };

  return (
    <div className="h-screen flex-auto bg-base-100 text-black">
      <Navbar></Navbar>
      <div className="flex justify-center items-center h-full">
        <PhotoForm uploadPhoto={uploadPhoto} submitted={submitted} />
      </div>
    </div>
  );
};

export default App;
