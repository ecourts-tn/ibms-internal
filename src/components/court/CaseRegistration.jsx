import React from 'react'
import api from '../../api'
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import BasicDetails from './scrutiny/BasicDetails';
import Petitioner from './scrutiny/Petitioner';
import Respondent from './scrutiny/Respondent';
import Grounds from './scrutiny/Grounds';
import AdvocateDetails from './scrutiny/AdvocateDetails';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

const CaseRegistration = () => {

    const {state} = useLocation();
    const navigate = useNavigate()

    const[petition, setPetition] = useState({})
    const[crime, setCrime] = useState({})
    const[litigant, setLitigant] = useState([])
    const[advocates, setAdvocates] = useState([])
    const[grounds, setGrounds] = useState([])

    const initialState = {
        date_of_registration: '',
        first_hearing: ''
    }
    const[form, setForm] = useState(initialState)
    const[errors, setErrors] = useState({})

    const validationSchema = Yup.object({
        date_of_registration: Yup.string().required("Registration date cannot be empty"),
        first_hearing : Yup.string().required("Hearing date cannot be empty")
    })

    useEffect(() => {
        async function fetchData(){
            try{
                const response = await api.get(`court/petition/detail/`, {params:{efile_no:state.efile_no}})
                if(response.status === 200){
                    const { petition, litigant, grounds, advocate, crime} = response.data
                    setPetition(petition)
                    setLitigant(litigant)
                    setCrime(crime)
                    setGrounds(grounds)
                    setAdvocates(advocate)
                }
            }catch(err){
                console.log(err)
            }
        }
        fetchData()
    }, [])

    const handleSubmit = async() => {
        try{
            await validationSchema.validate(form, {abortEarly:false})
            const response = await api.post(`court/registration/`, form, {params:{efile_no:state.efile_no}})
            if(response.status === 200){
                toast.success("Petition registered successfully", {
                    theme:"colored"
                })
                setForm(initialState)
                setTimeout(() => {
                    navigate("/court/petition/registration/list/")
                }, 2000)
            }
        }catch(error){
            if(error.inner){
                const newErrors = {}
                error.inner.forEach((err) => {
                    newErrors[err.path] = err.message
                })
                setErrors(newErrors);
            }
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="card card-outline card-primary" style={{minHeight:'600px'}}>
                        <div className="card-header">
                            <h3 className="card-title"><i className="fas fa-edit mr-2"></i><strong>Registration</strong></h3>
                        </div>
                        <div className="card-body">
                            {/* <div className="row mb-3">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label htmlFor="filing_number" className="col-sm-3">Filing Number</label>
                                        <div className="col-sm-5">
                                            <select 
                                                name="filingNumber" 
                                                id="filing_number" 
                                                className="form-control"
                                                value={filingNumber}
                                                onChange={(e) => setFilingNumber(e.target.value)}
                                            >
                                                { Object.keys(numbers).length > 0 ? (
                                                    <>
                                                        <option value="">Select Filing Number</option>
                                                        { numbers.map((number, index) => (
                                                            <option value={number.cino} key={index}>{number.filing_type.type_name}/{ number.filing_number }/{number.filing_year}</option>
                                                        ))}
                                                        </>
                                                    ) : (<option value="">Select Filing Number</option>)
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                                <>
                                    <div>
                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" id="basic-tab" data-toggle="tab" href="#basic" role="tab" aria-controls="basic" aria-selected="true">Basic Details</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="litigant-tab" data-toggle="tab" href="#litigant" role="tab" aria-controls="litigant" aria-selected="false">Litigant</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="grounds-tab" data-toggle="tab" href="#grounds" role="tab" aria-controls="grounds" aria-selected="false">Grounds</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="previous-tab" data-toggle="tab" href="#previous" role="tab" aria-controls="previous" aria-selected="false">Previous Details</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="advocate-tab" data-toggle="tab" href="#advocate" role="tab" aria-controls="advocate" aria-selected="false">Advocate Details & Documents</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="registration-tab" data-toggle="tab" href="#registration" role="tab" aria-controls="registration" aria-selected="false">Registration</a>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active mt-3" id="basic" role="tabpanel" aria-labelledby="basic-tab">
                                                <BasicDetails petition={petition} crime={crime}/>
                                            </div>
                                            <div className="tab-pane fade" id="litigant" role="tabpanel" aria-labelledby="litigant-tab">
                                                <div className="my-3">
                                                    <Petitioner litigant={litigant} />
                                                    <Respondent litigant={litigant} />
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="grounds" role="tabpanel" aria-labelledby="grounds-tab">
                                                <div className="my-2">
                                                    <Grounds grounds={grounds} />
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="previous" role="tabpanel" aria-labelledby="previous-tab">

                                            </div>
                                            <div className="tab-pane fade" id="advocate" role="tabpanel" aria-labelledby="advocate-tab">
                                                <AdvocateDetails 
                                                    advocates={advocates} 
                                                    petition={petition}
                                                />
                                            </div>
                                            <div className="tab-pane fade" id="registration" role="tabpanel" aria-labelledby="registration-tab">
                                                <form>
                                                    <div className="row mt-5">
                                                        <div className="col-md-6 offset-3">
                                                            <div className="form-group row">
                                                                <label htmlFor="date_of_registration" className="col-sm-3">Date of Registration</label>
                                                                <div className="col-sm-4">
                                                                    <input 
                                                                        type="date" 
                                                                        className={`form-control ${errors.date_of_registration ? 'is-invalid' : null}`}
                                                                        name="date_of_registration"
                                                                        value={form.date_of_registration}
                                                                        onChange={(e) => setForm({...form, [e.target.name]: e.target.value })}
                                                                    />
                                                                    <div className="invalid-feedback">
                                                                        { errors.date_of_registration }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label htmlFor="first_hearing" className="col-sm-3">Date of Hearing</label>
                                                                <div className="col-sm-4">
                                                                    <input 
                                                                        type="date" 
                                                                        className={`form-control ${errors.first_hearing ? 'is-invalid' : null }`}
                                                                        name="first_hearing"
                                                                        value={form.first_hearing}
                                                                        onChange={(e) => setForm({...form, [e.target.name]: e.target.value})} 
                                                                    />
                                                                    <div className="invalid-feedback">
                                                                        { errors.first_hearing }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 offset-md-4">
                                                            <Button 
                                                                variant="contained" 
                                                                color="success"
                                                                onClick={handleSubmit}
                                                            >Submit</Button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

export default CaseRegistration








