/***
 * props: {
    plant,
 * }
 */
import { Link } from "react-router-dom";
import "./smallplantcard.css";

export default function SmallPlantCard({ plant }) {
  return (
    <div className="container-fluid">
      <Link
        to={`/plants/${plant.sciname}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="smallPlantCard card">
          <div className="smallPlantCardBody card-body">
            {plant.plantphoto && (
              <img
                src={plant.plantphoto}
                alt="plant database"
                className="smallPlantCardImage float-left"
              />
            )}

            <h2 className="plantName">
              {plant.comname}
            </h2>

            <p className="mb-0" style={{ whiteSpace: 'pre-wrap' /* needed for line breaks */ }}>
              Scientific Name: {plant.sciname}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}