/***
 * props: {
    plant,
 * }
 */

export default function SmallPlantCard({ plant }) {
  return (
    <div className="card flex-row p-3 m-2">
      <div>
        <h2>
          <u>{plant.comname}</u>
        </h2>
        <p>Scientific Name: {plant.sciname}</p>
        <div>
          {plant.plantphoto && (
            <img
              src={plant.plantphoto}
              alt="plant database"
              className="post-card"
            />
          )}
        </div>
      </div>
    </div>
  );
}
