import { useEffect, useState } from "react";

export default function individualPlantPage() {
  const [plant, setPlant] = useState();

  useEffect(() => {
    //call api with the individual id
    //set the plant data
  }, []);

  return <div>{plant.content}</div>;
}