import React from 'react';

function FilePage() {
    return (
        <div>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Gestion des fichiers</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2">

                        <button type="button" className="btn btn-sm btn-secondary">Exporter</button>
                    </div>
                    <button type="button" className="btn btn-sm btn-secondary dropdown-toggle">
                        <span data-feather="calendar"></span>
                        Cette semaine
                    </button>
                </div>
            </div>

            <div className="row">

            </div>

            <div className="row mt-5 mb-5">
                <div className="col-md-12 card">
                    {/*<DataTables/>*/}
                </div>


            </div>

        </div>
    );
}

export default FilePage;