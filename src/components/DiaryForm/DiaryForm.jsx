import { useState } from "react";
import { useNavigate } from "react-router";
import * as diaryService from "../../services/diaryService.js"

const DiaryForm = () => {

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    cuisine: "",
    rating: ""
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

const handleSubmit = async (event) => {
  event.preventDefault();
  await diaryService.create(formData);
  navigate("/diary");
};
  return (
    <main>
      <h1>New Diary</h1>

      <form onSubmit={handleSubmit}>

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <label>Cuisine</label>
        <input
          type="text"
          name="cuisine"
          value={formData.cuisine}
          onChange={handleChange}
        />

        <label>Rating</label>
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>

      </form>
    </main>
  );
};

export default DiaryForm;