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
    <div className="container-fluid" id="parentID">
      <div className="row">
        <div className="col align-self-start">
          <div className="plantCard card mb-3" >
            <div className="plantBody card-body">

              <div className="row">
                <h1 className="mb-3">
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

              <hr />

              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">
                    Hardiness Rating:
                  </h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {plant?.hardiness}
                </div>
              </div>

              <hr />

              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">
                    Exposure:
                  </h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {plant?.exposure}
                </div>
              </div>

              <hr />

              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">
                    Water Use:
                  </h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {plant?.waterneed}
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="col-md-12 col-lg-4">
          <div className="row">
            <div className="col">
              <img src={plant?.plantphoto} className="plantImage" />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="plantCard card mb-3" >
                <div className="plantBody card-body">
                  Disease
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}