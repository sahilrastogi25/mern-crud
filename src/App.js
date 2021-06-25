import { useState, useEffect } from "react";
import Axios from "axios";
export default function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState("");
  const [foodList, setFoodList] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      days: days,
    });
  };
  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
    });
  });
  return (
    <div className="App">
      <h1>MERN CRUD</h1>
      <label htmlFor="foodName">FoodName:</label>
      <input
        type="text"
        id="foodName"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
      />
      <label htmlFor="days">Days Since you ate it:</label>
      <input
        type="number"
        id="days"
        value={days}
        onChange={(e) => {
          setDays(e.target.value);
        }}
      />
      <button className="btn btn-large btn-primary" onClick={handleSubmit}>
        Add to list
      </button>
      <br />
      <h2>Food list</h2>
      {foodList.map((foodItem, key) => {
        return (
          <ul key={key}>
            <li>{foodItem.foodName}</li>
            <li>{foodItem.daysSinceIAte}</li>
          </ul>
        );
      })}
    </div>
  );
}
