import React, {useState, useEffect} from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useLocation } from 'react-router-dom';
import { CreateMarkup } from '../../utils';

import Button from '@mui/material/Button'
import api from '../../api'

const ResponseCreate = () => {

    const {state} = useLocation()
    const[petition, setPetition] = useState({
        filing_type: {}
    })
    const[accused, setAccused] = useState([])
    const initialState = {
        cino               : '',
        response_type      : '',
        accused_name       : '',
        accused_type       : '',
        discharged         : false,
        hospital_name      : '',
        victim_condition   : '',
        remarks            : ''
    }

    const[form, setForm] = useState(initialState)

    useEffect(() => {
        async function fetchData(){
            const response = await api.get(`api/bail/petition/detail/`, {params:{cino:state.cino}})
            if(response.status === 200){
                setForm({
                    ...form,
                    cino: response.data.petition.cino
                })
                setPetition(response.data.petition)
                setAccused(response.data.petitioner)
            }
        }
        fetchData()
    }, [])


    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await api.post("api/bail/prosecution/remarks/create/", form)
            if(response.status === 201){
                toast.success("Remarks added successfully", {
                    theme: "colored"
                })
                setForm(initialState)
            }
        }catch(error){
            console.log(error)
        }
    }
    return (
        <>
            <ToastContainer />
            <div className="content-wrapper">
                <div className="container-fluid mt-3">
                    <div className="card card-outline card-primary">
                        <div className="card-header">
                            <h3 className="card-title"><i className="fas fa-edit mr-2"></i><strong>Prosecution Remarks</strong></h3>
                        </div>
                        <div className="card-body">
                            <div className="card card-outline card-warning">
                                <div className="card-header">
                                    <strong>Petition Details</strong>
                                </div>
                                <div className="card-body p-1">
                                <table className="table table-bordered table-striped table-sm">
                                    <tbody>
                                        <tr>
                                            <td>Petition&nbsp;Number</td>
                                            <td>
                                                {`${petition.filing_type.type_name}/${petition.filing_number}/${petition.filing_year}`}
                                            </td>
                                            <td>Crime&nbsp;Number</td>
                                            <td>{`${petition.crime_number }/${ petition.crime_year }`}</td>
                                            <td>Date of FIR</td>
                                            <td>{ petition.fir_date_time }</td>
                                        </tr>
                                        <tr>
                                            <td>Police&nbsp;Station</td>
                                            <td>{ petition.police_station ? petition.police_station.station_name : null }</td>
                                            <td>Date of Occurence</td>
                                            <td>{ petition.date_of_occurrence }</td>
                                            <td>Complainant&nbsp;Name</td>
                                            <td>{petition.complainant_name}</td>
                                        </tr>
                                        <tr>
                                            <td>Gist of FIR</td>
                                            <td colSpan={5}>{ petition.gist_of_fir }</td>
                                        </tr>
                                        <tr>
                                            <td>Gist&nbsp;in&nbsp;Local&nbsp;Language</td>
                                            <td colSpan={5}><span dangerouslySetInnerHTML={CreateMarkup(petition.gist_in_local)}></span></td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                            </div>
                            <div className="card card-outline card-secondary">
                                <div className="card-header">
                                    <strong>Accused Details</strong>
                                </div>
                                <div className="card-body p-1">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-striped table-sm">
                                            <thead>
                                                <tr className="bg-secondary">
                                                    <th>#</th>
                                                    <th>Accused Name</th>
                                                    <th>Age</th>
                                                    <th>Rank</th>
                                                    <th>Relative</th>
                                                    <th>Relative Name</th>
                                                    <th>Address</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { accused.map((a, index) => (
                                                    <tr>
                                                        <td>{ index+1 }</td>
                                                        <td>{ a.petitioner_name }</td>
                                                        <td>{ a.age }</td>
                                                        <td>{ a.rank }</td>
                                                        <td>{ a.relation }</td>
                                                        <td>{ a.relation_name }</td>
                                                        <td>{ a.address }</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="card card-outline card-danger">
                                <div className="card-header"><strong>Remarks</strong></div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <form method="POST" onSubmit={handleSubmit}>
                                                <div className="form-group row">
                                                    <label className="col-sm-3">Response Type</label>
                                                    <div className="col-sm-8">
                                                        <div className="icheck-success d-inline mx-2">
                                                            <input 
                                                                type="radio" 
                                                                id="radioResponseType1" 
                                                                name="response_type" 
                                                                onChange={(e) => setForm({...form, [e.target.name] : 'c'})} 
                                                                checked={form.response_type === 'c' ? true : false}
                                                            />
                                                            <label htmlFor="radioResponseType1">Contested</label>
                                                        </div>
                                                        <div className="icheck-danger d-inline mx-2">
                                                            <input 
                                                                type="radio" 
                                                                id="radioResponseType2" 
                                                                name="response_type" 
                                                                onChange={(e) => setForm({...form, [e.target.name] : 'u'})} 
                                                                checked={ form.response_type === 'u' ? true : false}/>
                                                            <label htmlFor="radioResponseType2">Uncontested</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3"></label>
                                                    <div className="col-sm-5">
                                                        <label htmlFor="">Accused Name</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control mb-3" 
                                                            name="accused_name"
                                                            value={form.accused_name}
                                                            onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                        />
                                                        <input type="text" className="form-control mb-3" />
                                                        <input type="text" className="form-control mb-3" />
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label htmlFor="">Accused Type</label>
                                                        <select 
                                                            name="accused_type" 
                                                            className="form-control mb-3"
                                                            value={form.accused_type}
                                                            onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                        >
                                                            <option value="">Select type</option>
                                                            <option value="First time offender">First time offender</option>
                                                            <option value="Habitual offender">Habitual offender</option>
                                                        </select>
                                                        <select name="petitioner_name" id="" className="form-control mb-3">
                                                            <option value="">Select type</option>
                                                            <option value="">First time offender</option>
                                                            <option value="">Habitual offender</option>
                                                        </select>
                                                        <select name="petitioner_name" id="" className="form-control mb-3">
                                                            <option value="">Select type</option>
                                                            <option value="">First time offender</option>
                                                            <option value="">Habitual offender</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3">Injured discharged</label>
                                                    <div className="col-sm-8">
                                                        <div className="icheck-success d-inline mx-2">
                                                            <input 
                                                                type="radio" 
                                                                id="radioDischarged1" 
                                                                name="discharged" 
                                                                onChange={(e) => setForm({...form, [e.target.name] : true})} 
                                                                checked={form.discharged ? true : false}
                                                            />
                                                            <label htmlFor="radioDischarged1">Yes</label>
                                                        </div>
                                                        <div className="icheck-danger d-inline mx-2">
                                                            <input 
                                                                type="radio" 
                                                                id="radioDischarged2" 
                                                                name="discharged" 
                                                                onChange={(e) => setForm({...form, [e.target.name] : false})} 
                                                                checked={!form.discharged ? true : false}/>
                                                            <label htmlFor="radioDischarged2">No</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                { !form.discharged && (
                                                    <>
                                                        <div className="form-group row">
                                                    <label htmlFor="" className="col-sm-3">Hospital Name</label>
                                                    <div className="col-sm-9">
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            name="hospital_name"
                                                            value={form.hospital_name}
                                                            onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="" className="col-sm-3">Condition of Victim</label>
                                                    <div className="col-sm-9">
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            name="victim_condition"
                                                            value={form.victim_condition}
                                                            onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                                )}
                                                <div className="form-group row">
                                                    <label htmlFor="" className="col-sm-3">Remarks</label>
                                                    <div className="col-sm-9">
                                                        <textarea 
                                                            name="remarks" 
                                                            rows="5" 
                                                            className="form-control"
                                                            value={form.remarks}
                                                            onChange={(e) => setForm({...form, [e.target.name]: e.target.value })}
                                                        ></textarea>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-sm-3"></div>
                                                    <div className="col-sm-9 d-flex justify-content-center">
                                                        <Button
                                                            variant='contained'
                                                            color="success"
                                                            type="submit"
                                                        >Submit</Button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    

        </>
    )
}

export default ResponseCreate