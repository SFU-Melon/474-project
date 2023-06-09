import axios from "axios";
import { useEffect, useState } from "react";
import PlantCard from "@components/PlantCard";
import "./plants.css";

const Plants = () => {
  const [plants, setPlants] = useState([]);

  const fetchPlants = async () => {
    const res = await axios.get("/api/getAllPlants");
    setPlants(res.data.plants);
  };

  useEffect(() => {
    fetchPlants();
  }, []);
  return (
    <div className ="mainContainer">
      {plants.map((plant, i) => {
        return <PlantCard key={i} plant={plant} />;
      })}
    </div>
  );
};

export default Plants;
