import { useState, useEffect } from "react";
import Axios from "axios";
export default function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [newFoodName, setnewFoodName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      days: days,
    });
    setFoodName("");
    setDays("");
  };
  const handleUpdate = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      newFoodName: newFoodName,
    });
    setnewFoodName("");
  };
  const handleDelete = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };
  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
    });
  });
  return (
    <div className="App">
      <h1>MERN CRUD</h1>
      <br />
      <label htmlFor="foodName">
        <h5>FoodName:</h5>
      </label>
      <input
        type="text"
        id="foodName"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
      />
      <label htmlFor="days">
        <h5>Days Since you ate it:</h5>
      </label>
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
          <div className="items" key={key}>
            <h4>{foodItem.foodName}</h4>
            <h4>{foodItem.daysSinceIAte}</h4>
            <input
              type="text"
              placeholder="New food name"
              onChange={(e) => setnewFoodName(e.target.value)}
            />
            <button
              className="btn btn-success btn-sm"
              onClick={() => {
                handleUpdate(foodItem._id);
              }}
            >
              Update
            </button>
            <br />
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(foodItem._id)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
