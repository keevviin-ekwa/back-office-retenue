import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  addSignatureAction,
  deleteSignatureAction,
  getAllSignaturesAction,
  updateSignatureAction,
} from "../store/reducers/Signature/signature.actions";
import { selectUserRoles } from "../store/reducers/user/user.selectors";
import {
  selectAllSignatures,
  selectResponseStatus,
  selectUserSignatures,
} from "./../store/reducers/Signature/signature.selectors";
import { selectUserKeycloak } from "./../store/reducers/user/user.selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faAdd,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { addSignature } from "./../store/reducers/Signature/signature.actions";
import EditSignature from "../components/EditSignatureForm/EditSignature";
import settings from "../config/settings";

function ConfigurationPage({
  addSignature,
  status,
  allSignatures,
  userRole,
  user,
  deleteSignature,
  userSignature,
}) {
  const [signatureExists, setSignatureExists] = useState(false);
  const [signatures, SetSignature] = useState(allSignatures);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectStatus, setSelectStatus] = useState(0);
  const [isOpen,setIsOpen] = useState(false);

  useEffect(() => {
    //console.log("actf",userSignature)
    checkUserSignature();
    checkSignature();
  }, [allSignatures]);

  const checkSignature = () => {
    if (
      signatures.length === 1 &&
      signatures[0].userCuid === user.tokenParsed.preferred_username
    ) {
      setSignatureExists(true);
    } else {
      setSignatureExists(false);
    }
  };
  const handleDeleteClick = () => { 
    setIsOpen(true);
  }

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log("file", selectedFile);
  };

  const handleDelete = (id) => {
    console.log("delete", id);
    deleteSignature(id)
      .then((res) => {
        if (res.status === 200) {
          const del = signatures.filter((sig) => sig.id !== id);
          // SetSignature(del)
          setSignatureExists(false);
        }
      })
      .catch((err) => {});
  };

  const checkUserSignature = () => {
    //si l'utilisetur est un admin alors on renvoie toutes les signatures, sinon on ne renvoie que ceux du
    // signataire connecté
    if (userRole[0] !== "ADMINISTRATEUR") {
      var filter = allSignatures.filter(
        (signature) => signature.userCuid == user.tokenParsed.preferred_username
      );
      SetSignature(filter);
    }
  };

  function upLoadFile(id) {
    const formData = new FormData();

    formData.append("file", selectedFile);
    console.log("add");
    addSignature(formData).then((res) => {
      if (res.status === 200) {
      }
    });

    setSelectStatus(status);
  }

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Gestion des signatures</h1>
      </div>

      <div className="d-flex justify-content-between">
        {userRole[0] === "ADMINISTRATEUR" || signatureExists ? (
          ""
        ) : (
          <div className="d-flex">
            <input
              onChange={(e) => onFileChange(e)}
              accept="image/*"
              className="form-control"
              type="file"
              id="formFile"
            />
            <button
              onClick={upLoadFile}
              data-bs-toggle="collapse"
              data-bs-target="#collapse-2"
              aria-expanded="false"
              aria-controls="collapse-2"
              type="button"
              className="btn btn-primary "
            >
              <div>
                <FontAwesomeIcon icon={faAdd} />
              </div>{" "}
              <div className="mx-2">Ajouter</div>
            </button>
          </div>
        )}
      </div>

      <div className="row mt-5 mb-5">
        <div className="col-md-12 card">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Signature</th>
                <th scope="col">Auteur</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {signatures.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">1</th>
                    <td>
                      <img
                        style={{ width: 75, height: 100 }}
                        src={settings.baseUrl + item.signaturePath}
                      />
                    </td>
                    <td>{item.userCuid}</td>
                    <td>
                      <div className="d-grid gap-2  d-flex justify-content-center">
                        {/* modal pour modifications de la signature\ */}
                        <EditSignature item={item} />
                        {/* fin modal signaturres */}

                        <button
                          //
                          onClick={handleDeleteClick}
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          className="btn btn-icon btn-sm btn-primary"
                          type="button"
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                        {/* confirmation modal */}
                        <div
                          className={`${isOpen ? "modal fade show" : "modal fade "}`}
                          id="staticBackdrop"
                          data-bs-backdrop="static"
                          data-bs-keyboard="false"
                          tabindex="-1"
                          style={{ display: `${isOpen ? "block" : "none"}` }}
                          aria-labelledby="staticBackdropLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-body">
                                Voulez supprimer cette signature?
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  data-bs-dismiss="modal"
                                >
                                  NON
                                </button>
                                <button
                                  onClick={() => handleDelete(item.id)}
                                  type="button"
                                  className="btn btn-success"
                                >
                                  OUI
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* end confirmation modal */}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* modal start */}

        {/* modal end */}
      </div>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  allSignatures: selectAllSignatures,
  userRole: selectUserRoles,
  user: selectUserKeycloak,
  status: selectResponseStatus,
  userSignature: selectUserSignatures,
});

const mapDispatchToProps = (dispatch) => ({
  deleteSignature: (id) => dispatch(deleteSignatureAction(id)),
  addSignature: (signature) => dispatch(addSignatureAction(signature)),
  getAllSignatures: () => dispatch(getAllSignaturesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationPage);
