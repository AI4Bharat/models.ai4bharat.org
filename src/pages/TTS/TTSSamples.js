import React from "react";
import Button from "@mui/material/Button";
import { FaLaptopCode } from "react-icons/fa";
import { Link } from "react-router-dom";

export default class TTSSamples extends React.Component {
  render() {
    return (
      <div className="a4b-interface">
        <section className="title-section">
          <h1 className="title">
            <img
              className="a4b-logo"
              alt="a4blogo"
              width={50}
              height={50}
              src={require("../../media/ai4bharat.jpg")}
            ></img>
            <span className="orange-color">AI4Bharat </span>
            Indic Text-to-Speech (TTS)
          </h1>
          <p className="subtitle">
            Check out some of the sample TTS Outputs here!
            <Button
              color="warning"
              component={Link}
              to={`/tts`}
              sx={{
                height: 50,
                margin: 2,
                width: 100,
                display: "flex",
                justifyContent: "right",
              }}
              size="small"
            >
              <div style={{ height: "100%", width: "auto" }}>
                <p
                  style={{
                    textDecorationStyle: "solid",
                    fontWeight: 600,
                  }}
                >
                  Try it!
                </p>
              </div>
              <div
                style={{
                  height: "100%",
                  width: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaLaptopCode style={{ margin: 5 }} size={20} />
              </div>
            </Button>
          </p>
        </section>
        <div touch-action="none" className="tts-sample-table-container">
          <table className="tts-sample-table">
            <thead className="tts-sample-head">
              <tr>
                <th scope="col">Language</th>
                <th scope="col">Speaker</th>
                <th scope="col">AI4Bharat</th>
                <th scope="col">Ground Truth</th>
                <th scope="col">DON Lab</th>
                <th scope="col">Vakyansh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Assamese</th>
                <td>Female</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/as/train_assamesefemale_00538_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/as/train_assamesefemale_00538_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td></td>
                <td></td>
              </tr>

              <tr>
                <th scope="row">Assamese</th>
                <td>Male</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/as/train_assamesemale_01066_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/as/train_assamesemale_01066_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td></td>
                <td></td>
              </tr>

              <tr>
                <th scope="row">Bengali</th>
                <td>Female</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/bn/train_bengalifemale_01034_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/bn/train_bengalifemale_01034_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td></td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/bn/train_bengalifemale_01034_c.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
              </tr>

              <tr>
                <th scope="row">Bengali</th>
                <td>Male</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/bn/train_bengalimale_01633_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/bn/train_bengalimale_01633_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td></td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/bn/train_bengalimale_01633_c.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
              </tr>

              <tr>
                <th scope="row">Bodo</th>
                <td>Female</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/brx/train_bodofullfemale_00538_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/brx/train_bodofullfemale_00538_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td></td>
                <td></td>
              </tr>

              <tr>
                <th scope="row">Gujarati</th>
                <td>Female</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/gu/train_gujaratifemale_00545_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/gu/train_gujaratifemale_00545_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td></td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/gu/train_gujaratifemale_00545_c.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
              </tr>

              <tr>
                <th scope="row">Gujarati</th>
                <td>Male</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/gu/train_gujaratimale_00564_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/gu/train_gujaratimale_00564_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td></td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/gu/train_gujaratimale_00564_c.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
              </tr>

              <tr>
                <th scope="row">Hindi</th>
                <td>Female</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/hi/train_hindifullfemale_00424_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/hi/train_hindifullfemale_00424_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/hi/train_hindifullfemale_00424_d.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/hi/train_hindifullfemale_00424_c.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
              </tr>

              <tr>
                <th scope="row">Hindi</th>
                <td>Male</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/hi/train_hindifullmale_00272_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/hi/train_hindifullmale_00272_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/hi/train_hindifullmale_00272_d.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/hi/train_hindifullmale_00272_c.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
              </tr>

              <tr>
                <th scope="row">Kannada</th>
                <td>Female</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/kn/train_kannadafemale_00100_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/kn/train_kannadafemale_00100_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/kn/train_kannadafemale_00100_d.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/kn/train_kannadafemale_00100_c.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
              </tr>

              <tr>
                <th scope="row">Kannada</th>
                <td>Male</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/kn/train_kannadafullmale_00087_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/kn/train_kannadafullmale_00087_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/kn/train_kannadafullmale_00087_d.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/kn/train_kannadafullmale_00087_c.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
              </tr>

              <tr>
                <th scope="row">Malayalam</th>
                <td>Female</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/ml/train_malayalamfemale_00545_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/ml/train_malayalamfemale_00545_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/ml/train_malayalamfemale_00545_d.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/ml/train_malayalamfemale_00545_c.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
              </tr>

              <tr>
                <th scope="row">Malayalam</th>
                <td>Male</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/ml/train_malayalammale_00536_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/ml/train_malayalammale_00536_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/ml/train_malayalammale_00536_d.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/ml/train_malayalammale_00536_c.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
              </tr>

              <tr>
                <th scope="row">Manipuri</th>
                <td>Female</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/mni/train_manipurifemale_00660_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/mni/train_manipurifemale_00660_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td></td>
                <td></td>
              </tr>

              <tr>
                <th scope="row">Manipuri</th>
                <td>Male</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/mni/train_manipurimale_00235_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/mni/train_manipurimale_00235_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td></td>
                <td></td>
              </tr>

              <tr>
                <th scope="row">Marathi</th>
                <td>Female</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/mr/train_marathifemale_00706_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/mr/train_marathifemale_00706_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/mr/train_marathifemale_00706_d.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/mr/train_marathifemale_00706_c.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
              </tr>

              <tr>
                <th scope="row">Marathi</th>
                <td>Male</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/mr/train_marathimale_0789_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/mr/train_marathimale_0789_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/mr/train_marathimale_0789_d.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td></td>
              </tr>

              <tr>
                <th scope="row">Odia</th>
                <td>Female</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/or/train_odiafemale_0660_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/or/train_odiafemale_0660_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/or/train_odiafemale_0660_d.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/or/train_odiafemale_0660_c.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
              </tr>

              <tr>
                <th scope="row">Odia</th>
                <td>Male</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/or/train_odiamale_1693_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/or/train_odiamale_1693_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/or/train_odiamale_1693_d.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/or/train_odiamale_1693_c.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
              </tr>

              <tr>
                <th scope="row">Rajasthani</th>
                <td>Female</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/raj/train_rajasthanifemale_00100_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/raj/train_rajasthanifemale_00100_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/raj/train_rajasthanifemale_00100_d.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td></td>
              </tr>

              <tr>
                <th scope="row">Rajasthani</th>
                <td>Male</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/raj/train_rajasthanimale_01280_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/raj/train_rajasthanimale_01280_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/raj/train_rajasthanimale_01280_d.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td></td>
              </tr>

              <tr>
                <th scope="row">Tamil</th>
                <td>Female</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/ta/train_tamilfemale_00538_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/ta/train_tamilfemale_00538_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/ta/train_tamilfemale_00538_d.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/ta/train_tamilfemale_00538_c.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
              </tr>

              <tr>
                <th scope="row">Tamil</th>
                <td>Male</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/ta/train_tamilmale_01446_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/ta/train_tamilmale_01446_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/ta/train_tamilmale_01446_d.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/ta/train_tamilmale_01446_c.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
              </tr>

              <tr>
                <th scope="row">Telugu</th>
                <td>Female</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/te/train_telugufemale_00278_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/te/train_telugufemale_00278_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td></td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/te/train_telugufemale_00278_c.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
              </tr>

              <tr>
                <th scope="row">Telugu</th>
                <td>Male</td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/te/train_telugumale_00354_a.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/te/train_telugumale_00354_b.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/te/train_telugumale_00354_d.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={require("../../media/ttssamples/te/train_telugumale_00354_c.wav")}
                      type="audio/wav"
                    />
                  </audio>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
