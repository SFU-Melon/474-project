import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./plantpage.css";

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
    <div class="container">
      <div class="main-body">
        <div class="row gutters-sm">
          <div class="col-md-11">
            <div class="card mb-3">
              <div className="card-body">

                <div class="row">
                  <h1 class="mb-3">
                    {plant?.comname}
                  </h1>
                </div>

                <hr />

                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">
                      Scientific Name:
                    </h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {plant?.sciname}
                  </div>
                </div>

                <hr />

                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">
                      Description:
                    </h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {plant?.description}
                  </div>
                </div>

                <hr />

                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">
                      Plant Instruction:
                    </h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {plant?.plantinstr}
                  </div>
                </div>

                <hr />

                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">
                      Grow Instruction:
                    </h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {plant?.growinstr}
                  </div>
                </div>

                <hr />

                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">
                      Care Instruction:
                    </h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {plant?.careinstr}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}