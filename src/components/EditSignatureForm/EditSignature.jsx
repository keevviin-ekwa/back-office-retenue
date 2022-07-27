import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { updateSignatureAction } from "../../store/reducers/Signature/signature.actions";
import settings from "./../../config/settings";

function EditSignature({ item, updateSignature }) {
  const [submit, setSubmit] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [open, setOpen] = useState(false);

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log("file", selectedFile);
  };

  function updateFile(id) {
    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log("formData", id);
    setSubmit(true);
    updateSignature(id, formData)
      .then((res) => {
        if (res.status === 200) {
          setSubmit(false);
          setOpen(false);
          setSelectedFile(null);
        }
      })
      .catch((err) => {});
  }

  const handleModal = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button
        onClick={handleModal}
        data-bs-target={"#" + item.userCuid}
        className="btn btn-icon btn-sm btn-primary mx-1"
        type="button"
      >
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>

      <div
        className={`${open ? "modal fade show" : "modal fade "}`}
        style={{ display: `${open ? "block" : "none"}` }}
        id={item.userCuid}
        tabindex="-1"
        // aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="mb-3 row">
                <label for="staticUser" className="col-sm-2 col-form-label">
                  CUID
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    readOnly
                    className="form-control"
                    id="staticUser"
                    value={item.userCuid}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  for="staticUser"
                  className="col-sm-2 col-form-label"
                ></label>
                <div className="col-sm-10">
                  <input
                    onChange={(e) => onFileChange(e)}
                    accept="image/*"
                    type="file"
                    className="form-control"
                    id="formFile"
                  />
                </div>
              </div>
              <div className="mb-3  row ">
                <label
                  for="staticUser"
                  className="col-sm-2 col-form-label"
                ></label>
                <div className="col-sm-10 d-flex justify-content-start">
                  <img
                    style={{ width: 75, height: 100 }}
                    src={settings.baseUrl + item.signaturePath}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleModal}
                type="button"
                className="btn btn-secondary"
                disabled={submit}
              >
                Annuler
              </button>
              <button
                onClick={(id) => updateFile(item.id)}
                type="button"
                className="btn btn-primary"
              >
                {submit ? (
                  <div class="d-flex justify-content-center">
                    <div class="spinner-border spinner-border-sm" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  "Modifier"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
  updateSignature: (id, signature) =>
    dispatch(updateSignatureAction(id, signature)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSignature);
