import { useParams } from 'react-router-dom';
const Plant = () => {
  const { id } = useParams();

  return <div> PLANT PAGE - {id}</div>;
};

export default Plant;
