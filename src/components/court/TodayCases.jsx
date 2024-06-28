import React from 'react'
import api from '../../api'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const TodayCases = () => {

    const[cases, setCases] = useState([])

    useEffect(() => {
        async function fetchData(){
            try{
                const response = await api.get("api/bail/petition/list/")
                setCases(response.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchData();
    },[])

    return (
        <>
            <div className="content-wrapper" style={{minHeight:'600px'}}>
                <div className="container-fluid mt-3">
                    <div className="card card-outline card-primary">
                        <div className="card-header">
                            <h3 className="card-title"><i className="fas fa-edit mr-2"></i><strong>My Cases</strong></h3>
                        </div>
                        <div className="card-body p-2">
                            <table className="table table-bordered table-striped">
                                <thead className="bg-secondary">
                                    <tr>
                                        <th>S. No.</th>
                                        <th>Court</th>
                                        <th>Case Type</th>
                                        <th>Bail Type</th>
                                        <th>Crime Number/Year</th>
                                        <th>Petitioners</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { cases && (
                                        <>
                                            { cases.map((c, index) => (
                                                <tr key={index}>
                                                    <td>{ index + 1 }</td>
                                                    <td>
                                                        { c.petition.court_type.id === 2 && (
                                                        <span>{ c.petition.court.court_name }<br/>{ c.petition.establishment.establishment_name }<br/>{ c.petition.district.district_name }</span>
                                                        )}
                                                        { c.petition.court_type.id === 1 && (
                                                        <span>{ c.petition.court_type.name }<br/>{ c.petition.bench_type.name }</span> 
                                                        )}
                                                    </td>
                                                    <td>{ c.petition.case_type.type_name }</td>
                                                    <td>{ c.petition.bail_type.type_name }</td>
                                                    <td>
                                                        { c.petition.crime_number } / { c.petition.crime_year }<br/>
                                                        { c.petition.police_station && (
                                                            <span>{ c.petition.police_station.station_name}, {c.petition.crime_district.district_name}</span>
                                                        )}   
                                                    </td>
                                                    <td>
                                                        <ol style={{ paddingBottom:1}}>
                                                            { c.petitioner.map((p, index) => (
                                                                <li key={index}>{p.petitioner_name}</li>
                                                                )) 
                                                            }
                                                    </ol>
                                                    </td>
                                                    <td>
                                                        { !c.petition.filing_type && !c.petition.filing_number && (
                                                            <span className="badge bg-info">
                                                                <Link to="/court/case/scrutiny" state={{ id: 'TN20240607000001' }}>Scrutiny</Link>
                                                            </span>
                                                        )}
                                                        { c.petition.filing_type && c.petition.filing_number && !c.petition.reg_type && !c.petition.reg_number && (
                                                            <span className="badge bg-warning">
                                                                <Link to="/court/case/registration" state={{ id: 'TN20240607000001' }}>Registration</Link>
                                                            </span>
                                                        )}
                                                        { c.petition.filing_type && c.petition.filing_number && c.petition.reg_type && c.petition.reg_number && (
                                                            <span className="badge bg-primary">
                                                                <Link to="/court/case/registration" state={{ id: 'TN20240607000001' }}>Post to Cause List</Link>
                                                            </span>
                                                        )}
                                                        {/* { c.petition.filing_type && c.petition.filing_number && c.petition.reg_type && c.petition.reg_number && (
                                                            <span className="badge bg-primary">
                                                                <Link to="/court/case-registration" state={{ id: 'TN20240606000003' }}>Post to Cause List</Link>
                                                            </span>
                                                        )} */}
                                                    </td>
                                                </tr>
                                                ))
                                            }
                                        </>

                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>    
        </>
  )
}

export default TodayCases