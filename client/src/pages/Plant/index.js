import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./plantpage.css";

export default function Plant() {
  const [plant, setPlant] = useState();
  const [diseases, setDiseases] = useState();
  const [pests, setPests] = useState();
  const { sciname } = useParams();
  const decodedSciName = decodeURIComponent(sciname);

  const fetchInfo = async () => {
    const res_plant = await axios.get(`/api/getPlant/${decodedSciName}`);
    const res_diseases = await axios.get(`/api/getDiseasesByPlantSciName/${decodedSciName}`);
    const res_pests = await axios.get(`/api/getPestsByPlantSciName/${decodedSciName}`);

    setPlant(res_plant.data.plant);
    setDiseases(res_diseases.data.diseases);
    setPests(res_pests.data.pests);
  };

  useEffect(() => {
    fetchInfo();
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

                  <h3>
                    Susceptible To
                  </h3>

                  <h4 class="headers">
                    Diseases:
                  </h4>

                  <div>
                    <ul>
                      {diseases?.map((disease, index) => {
                        return <li key={index}>{disease.diseasename}</li>
                      })}
                    </ul>
                  </div>

                  <h4 class="headers">
                    Pests:
                  </h4>

                  <div>
                    <ul>
                      {pests?.map((pest, index) => {
                        return <li key={index}>{pest.pestname}</li>
                      })}
                    </ul>
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