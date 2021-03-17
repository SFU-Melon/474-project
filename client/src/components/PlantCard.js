/***
 * props: {
    plant,
 * }
 */

export default function PlantCard({ plant }) {
  return (
    <div className="card flex-row p-3 m-2">
      <div>
        <h2>
          <u>{plant.comname}</u>
        </h2>
        <p>Scientific Name: {plant.sciname}</p>
        <p>Description:</p>
        <p style={{ whiteSpace: 'pre-wrap' /* needed for line breaks */ }}>
          {plant.description}
        </p>
        <p>Plant Instruction:</p>
        <p style={{ whiteSpace: 'pre-wrap' /* needed for line breaks */ }}>
          {plant.plantinstr}
        </p>
        <p>Grow Instruction:</p>
        <p style={{ whiteSpace: 'pre-wrap' /* needed for line breaks */ }}>
          {plant.growinstr}
        </p>
        <p>Care Instruction:</p>
        <p style={{ whiteSpace: 'pre-wrap' /* needed for line breaks */ }}>
          {plant.careinstr}
        </p>
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
