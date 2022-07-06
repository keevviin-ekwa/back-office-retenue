import React from 'react'
import './dashbord-card-component.css'


export default function DashboardCard(props) {
  return (
    <div>
        <div className="card-box bg-orange">
                    <div className="inner d-flex flex-column align-items-start">
                        <h3> {props.value} </h3>
                        <p> {props.title} </p>
                       
                    </div>
                    <div className="icon">
                   
                    {props.children}
                    </div>
                    
                </div>
    </div>
  )
}
