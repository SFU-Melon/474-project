/***
 * props: {
    plant,
 * }
 */
import { Link } from "react-router-dom";
import "./plantcard.css";

export default function PlantCard({ plant }) {
  return (
    <div className="container-fluid" id="plantcardID">
      <Link
        to={`/plants/${plant.sciname}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="plantsCard card">
          <div className="plantsBody card-body">
            {plant.plantphoto && (
              <img
                src={plant.plantphoto}
                alt="plant database"
                className="plantsImage float-left"
              />
            )}

            <h2 className="headingPlants">
              {plant.comname}
            </h2>
            <p className="mb-0" style={{ whiteSpace: 'pre-wrap' /* needed for line breaks */ }}>
              {plant.description}
            </p>

          </div>
        </div>
      </Link>
    </div>
  );
}
