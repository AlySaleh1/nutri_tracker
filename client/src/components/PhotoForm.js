import { useState } from "react";

const PhotoForm = ({ uploadPhoto, submitted }) => {
  const [photo, setPhoto] = useState(null);

  const submitForm = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("photo", photo[0], "photo");
    uploadPhoto(fd);
  };

  return (
    <form className="card w-1/5 shadow-lg bg-white hover:shadow-gray-500">
      <div className="card-body">
        <h2 className="card-title">Record Your Meal</h2>
        <input
          className="form-control"
          type="file"
          name="photo"
          onChange={(e) => setPhoto(e.target.files)}
          multiple
          accept=".jpg, .jpeg"
          required
        />
        <button className="btn" onClick={submitForm} disabled={submitted}>
          Record Nutrients
        </button>
      </div>
    </form>
  );
};

export default PhotoForm;
