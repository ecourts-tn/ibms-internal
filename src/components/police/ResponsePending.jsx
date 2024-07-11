import React from 'react'
import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import api from '../../api'



const ResponsePending = () => {

    const navigate = useNavigate()

    const[petitions, setPetitions] = useState([])

    useEffect(() => {
        async function fetchPetitions() {
          const response = await api.get("api/bail/police/response/pending/list/");
          setPetitions(response.data)
        }
        fetchPetitions();
      }, []); 


    const getPetition = async (cino) => {
        try{
            const response = await api.get(`api/bail/${cino}/filing/`)
            navigate("/police-response/create/", { state: { petition: response.data } });
        }catch(err){
            console.log(err)
        }
    }
    console.log(petitions)

    return (
        <>
            <div className="content-wrapper">
                <div className="container-fluid mt-3">
                    <div className="card card-outline card-primary">
                        <div className="card-header">
                            <h3 className="card-title"><i className="fas fa-edit mr-2"></i><strong>Pending Response</strong></h3>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <table className="table table-bordered table-striped">
                                    <thead className="bg-secondary">
                                        <tr>
                                            <th>S.No</th>
                                            <th>CNR Number</th>
                                            <th>Date of Occurrence</th>
                                            <th>Crime Number/Year</th>
                                            <th>Complainant Name</th>
                                            <th>Investigation Officer</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { petitions.map((petition, index) => (
                                        <tr key={index}>
                                            <td>{ index + 1 }</td>
                                            <td>{ petition.cino }</td>
                                            <td>{ petition.date_of_occurrence }</td>
                                            <td>{ petition.crime_number }/{ petition.crime_year }</td>
                                            <td>{ petition.complainant_guardian }</td>
                                            <td>{ petition.investigation_officer }</td>
                                            <td>
                                                <Link to='/police/response/create/' state={{ cino: petition.cino }}>
                                                    <Button
                                                        variant='contained'
                                                        color='success'
                                                    >Proceed</Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>          
        </>
  )
}

export default ResponsePending