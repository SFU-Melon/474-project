import axios from "axios";
import { useEffect, useState } from "react";
import PlantCard from "../../components/PlantCard";

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
    <div>
      <h1>PLANT PAGE</h1>
      {plants.map((plant) => {
        return <PlantCard plant={plant} />;
      })}
    </div>
  );
};

export default Plants;
