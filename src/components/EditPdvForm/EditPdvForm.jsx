import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { updatePdvActionAsync } from "../../store/reducers/pdv/pdv.actions";

function EditPdvForm({ errors, open, pdv, doUpdate, close }) {
  const [phoneNumber, setPhoneNumber] = useState(pdv?.phoneNumber);
  const [companyName, setCompanyName] = useState(pdv?.companyName);
  const [regime, setRegime] = useState(pdv?.regime);
  const [id, setId] = useState(pdv?.key);
  const [niu, setNiu] = useState(pdv?.niu);
  const [submit, setSubmitted] = useState(false);

 
    const handleSubmit = (e) => {
      console.log(pdv)
    e.preventDefault();
    const _pdv = {
      companyName: companyName,
      niu: niu,
      regime: regime,
      phoneNumber: phoneNumber,
    };

    setSubmitted(true);
    console.log("_pdv", _pdv);
    doUpdate(id, _pdv).then((response) => {
      if (response.status === 200) {
        setSubmitted(false);
        close();
      }
    });
  };

  const handleCLoseClick = (e) => {

    setSubmitted(false);
    close();
    setPhoneNumber(null);
    setNiu("");
    setCompanyName("");
  };

  return (
    <>
      <div
        className={`${open ? "modal fade show" : "modal fade "}`}
        id="modalForm"
        style={{ display: `${open ? "block" : "none"}` }}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            {/* <div className="modal-header">
               <h5 className="modal-title" id="exampleModalLabel">Bootstrap 5 Modal Form</h5>
               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
           </div> */}
            <div className="modal-body">
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="needs-validation"
                noValidate
              >
                <div className="mb-3 row">
                  <label
                    htmlFor="phoneNumber"
                    className="col-sm-2 col-form-label is-required"
                  >
                    Numéro
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      className={`form-control`}
                      id="phoneNumber"
                      disabled
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      value={phoneNumber}
                    />
                    <div className="invalid-feedback">
                      Example invalid feedback text
                    </div>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="companyname"
                    className="col-sm-2 col-form-label is-required"
                  >
                    Raison sociale
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className={`form-control ${
                        errors != null && errors.CompanyName != null
                          ? "is-invalid"
                          : ""
                      }`}
                      value={companyName}
                      disabled
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      id="companyname"
                    />
                    <div className="invalid-feedback">
                      {errors != null && errors.CompanyName != null
                        ? errors.CompanyName[0]
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="niu" className="col-sm-2 col-form-label">
                    NIU
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className={`form-control ${
                        errors != null && errors.NIU != null ? "is-invalid" : ""
                      }`}
                      value={niu}
                      onChange={(e) => setNiu(e.target.value)}
                      id="niu"
                    />
                    <div className="invalid-feedback">
                      {errors != null && errors.NIU != null
                        ? errors.NIU[0]
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="regime" className="col-sm-2 col-form-label">
                    Régime
                  </label>
                  <div className="col-sm-10">
                    <select
                      className="form-select  mb-3"
                      defaultValue={pdv?.regime}
                      onChange={(e) => setRegime(e.target.value)}
                      aria-label=".form-select-lg example"
                    >
                      <option value="SIMPLIFIE">SIMPLIFIE</option>
                      <option value="LIBERATOIRE">LIBERATOIRE</option>
                      <option value="REEL">REEL</option>
                      <option value="NON IDENTIFIE">NON IDENTIFIE</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    onClick={handleCLoseClick}
                    type="button"
                    className="btn btn-secondary"
                  >
                    Fermer
                  </button>
                  <button type="submit" className="btn btn-warning float-end">
                    {submit ? (
                      <div class="text-center">
                        <div
                          class="spinner-border spinner-border-sm"
                          role="status"
                        >
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      "Enregistrer"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
  doUpdate: (id, pdv) => dispatch(updatePdvActionAsync(id, pdv)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPdvForm);
