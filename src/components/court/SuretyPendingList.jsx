import React, {useState,useEffect} from 'react'
import api from '../../api'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

const SuretyPendingList = () => {
    const[sureties, setSureties] = useState([])

    useEffect(() => {
        async function fetchData(){
            try{
                const response = await api.get("api/bail/surety/pending/list/")
                setSureties(response.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchData();
    },[])

    return (
        <div className="content-wrapper">
            <div className="container-fluid mt-3">
                <div className="card card-outline card-primary">
                    <div className="card-header">
                        <h3 className="card-title"><i className="fas fa-edit mr-2"></i><strong>Surety Pending List</strong></h3>
                    </div>
                    <div className="card-body p-1">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped">
                                        <thead className="bg-secondary">
                                            <tr>
                                                <th>S. NO</th>
                                                <th>Petition Number</th>
                                                <th>Court</th>
                                                <th>Crime Number/Year</th>
                                                <th>Surety Name</th>
                                                <th>Surety Amount</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { sureties && (
                                                <>
                                                    { sureties.map((surety, index) => (
                                                        <tr key={index}>
                                                            <td>{ index+1 }</td>
                                                            <td>{ surety.cino }</td>
                                                            <td>{ surety.court.court_name }<br/>{ surety.establishment.establishment_name}</td>
                                                            <td>{ surety.crime_number}/{surety.crime_year}</td>
                                                            <td>{ surety.surety_name }</td>
                                                            <td>{ surety.surety_amount }</td>
                                                            <td>
                                                                <Link
                                                                    to={`/court/surety/verify/`}
                                                                    state={{cino: surety.id}}
                                                                >
                                                                    <Button
                                                                        variant="contained"
                                                                        color="success"
                                                                    >Verify</Button>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                        ))
                                                    }
                                                </>
                                            )}
                                            { sureties.length === 0 && (
                                                <tr>
                                                    <td colSpan={6} className="text-center text-danger"><strong>***** No petitions found *****</strong></td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuretyPendingList