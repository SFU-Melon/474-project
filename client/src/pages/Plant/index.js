import axios from "axios";
import { useEffect, useState } from "react";

export default function Plant() {
  const [plant, setPlant] = useState();

  const fetchPlant = async () => {
    const res = await axios.get("/api/getPlant");
    setPlant(res.data.plant);
  };

  useEffect(() => {
    fetchPlant();
  }, []);
  return (
    <div>
      
    </div>
  );
}