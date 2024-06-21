import React, { useState, useEffect } from 'react'
import Proceeding from './Proceeding'
import api from '../../api'
import PetitionDetails from './PetitionDetails'


const DailyProceedings = () => {

    const[regNumber, setRegNumber] = useState('')
    const[numbers, setNumbers] = useState([])

    useEffect(() => {
        async function fetchData(){
            try{
                const response = await api.get(`api/bail/register-number/list/`)
                setNumbers(response.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return (
        <>
            <div className="content-wrapper">
                <div className="container-fluid mt-3">
                    <div className="card card-outline card-primary">
                        <div className="card-header">
                            <h3 className="card-title"><i className="fas fa-edit mr-2"></i><strong>Daily Proceedings</strong></h3>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4 offset-4">
                                    <div className="form-group row">
                                        <label htmlFor="" className="col-sm-3">Case Number</label>
                                        <div className="col-sm-6">
                                            <select 
                                                name="regNumber"
                                                className="form-control"
                                                value={regNumber}
                                                onChange={(e) => setRegNumber(e.target.value)}
                                            >
                                                <option value="">Select case</option>
                                                { numbers.map((number, index) => (
                                                    <option value={number.cino} key={index}>{ number.reg_type.type_name}/{number.reg_number}/{number.reg_year}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-8 h-100">
                                    <PetitionDetails cino={regNumber}/>
                                </div>
                                <div className="col-md-4">
                                    <Proceeding cino={regNumber}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DailyProceedings