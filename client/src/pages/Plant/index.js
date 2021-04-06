import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Plant() {
  const [plant, setPlant] = useState();
  const { sciname } = useParams();
  const decodedSciName = decodeURIComponent(sciname);

  const fetchPlant = async () => {
    const res = await axios.get(`/api/getPlant/${decodedSciName}`);

    setPlant(res.data.plant);
  };

  useEffect(() => {
    fetchPlant();
  }, []);
  return (
    <div class="test">
      <h1>
        {plant?.comname}
      </h1>
      <p>
        <b>Scientific Name:</b> {plant?.sciname}
      </p>
      <p>
        <b>Description:</b>
      </p>
      <p style={{ whiteSpace: 'pre-wrap' }}>
        {plant?.description}
      </p>
      <p>
        <b>Plant Instruction:</b>
      </p>
      <p style={{ whiteSpace: 'pre-wrap' }}>
        {plant?.plantinstr}
      </p>
      <p>
        <b>Grow Instruction:</b>
      </p>
      <p style={{ whiteSpace: 'pre-wrap' }}>
        {plant?.growinstr}
      </p>
      <p>
        <b>Care Instruction:</b>
      </p>
      <p style={{ whiteSpace: 'pre-wrap' }}>
        {plant?.careinstr}
      </p>
    </div>
  );
}