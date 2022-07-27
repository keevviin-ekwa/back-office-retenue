import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { getAllOcmUserAction } from "../store/reducers/ocm-user/ocm-user.actions";

import { selectOcmUsersList } from "./../store/reducers/ocm-user/ocm-user.selectors";

function UserPage({ getAllOcmUsers, ocmUsers }) {
  useEffect(() => {
    console.log("UserPage", ocmUsers);
    setTimeout(() => {
      getAllOcmUsers();
    }, 500);
  }, []);

  const appHeaders = [
    {
      id: "lastName",
      name: "Nom",
    },
    {
      id: "username",
      name: "CUID",
    },
    {
      id: "email",
      name: "Email",
    },
  ];

  const actions = [
    {
      isVisible: (item) => true,
      label: "Editer",
      action: (e, item) => {
        e.preventDefault();
        console.log(item);
      },
    },
    {
      isVisible: (item) => true,
      label: "Supprimer",
      action: (e, item) => {
        e.preventDefault();
        console.log(item);
      },
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Autres utilisateurs</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button type="button" className="btn btn-sm btn-secondary">
              Exporter
            </button>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-secondary dropdown-toggle"
          >
            <span data-feather="calendar"></span>
            Cette semaine
          </button>
        </div>
      </div>

      <div className="row"></div>

      <div className="row mt-5 mb-5">
        <div className="col-md-12 card">
          {/* <DataTable
                       data={ocmUsers}
                        headers={appHeaders}
                        actions={actions}
                    /> */}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  ocmUsers: selectOcmUsersList,
});

const mapDispatchToProps = (dispatch) => ({
  getAllOcmUsers: () => dispatch(getAllOcmUserAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
