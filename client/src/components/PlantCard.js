import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/***
 * props: {
    plant,
 * }
 */

export default function PlantCard({ plant }) {
  return (
    <div className="card flex-row p-3 m-2">
      <div>
        <h2>{plant.comname}</h2>
        <p>({plant.sciname})</p>
        <p style={{ whiteSpace: "pre-wrap" /* needed for line breaks */ }}>
          {plant.description}
        </p>
        <p>Plant Instruction:</p>
        <p style={{ whiteSpace: "pre-wrap" /* needed for line breaks */ }}>
          {plant.plantInstr}
        </p>
        <p>Grow Instruction:</p>
        <p style={{ whiteSpace: "pre-wrap" /* needed for line breaks */ }}>
          {plant.growInstr}
        </p>
        <p>Care Instruction:</p>
        <p style={{ whiteSpace: "pre-wrap" /* needed for line breaks */ }}>
          {plant.careInstr}
        </p>
        <div>
          {plant.plantphoto && (
            <img src={plant.imageurl} className="post-card" />
          )}
        </div>
      </div>
    </div>
  );
}
