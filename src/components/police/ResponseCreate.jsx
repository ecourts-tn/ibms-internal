import React from 'react'
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import FormControl from 'react-bootstrap/FormControl'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel'
import Button from '@mui/material/Button'
import api from '../../api'
import { toast, ToastContainer } from 'react-toastify';
import { CreateMarkup } from '../../utils';
import * as Yup from 'yup'

const ResponseCreate = () => {
    const {state} = useLocation()
    const navigate = useNavigate()
    const[arrestModify, setArrestModify] = useState(true)
    const[petition, setPetition] = useState({
        filing_type: {}
    })
    const[accused, setAccused] = useState([])
    const initialState = {
        cino                : '',
        offences            : '',
        date_of_arrest      : '',
        accused_name        : '',
        specific_allegations: '',
        materials_used      : '',
        discharged          : false,
        hospital_name       : '',
        victim_condition    : '',
        injury_particulars  : '',
        investigation_stage : '',
        cnr_number          : '',
        court               : '',
        case_stage          : '',
        next_hearing        : '',
        no_of_witness       : '',
        previous_case       : '',
        previous_bail       : '',
        other_accused_status: '',
        reason_not_given    : '',
        other_information   : '',
        court_details       : '',
    }

    const validationSchema = Yup.object({
        offences: Yup.string().required(),
        date_of_arrest: Yup.string().required(),
        accused_name: Yup.string().required(),
        specific_allegations: Yup.string().required(),
        materials_used: Yup.string().required(),
        discharged: Yup.string().required(),
        investigation_stage: Yup.string().required(),
        previous_case: Yup.string().required(),
        previous_bail: Yup.string().required(),
        other_accused_status: Yup.string().required(),
        reason_not_given: Yup.string().required(),
        other_information: Yup.string().required(),
        court_details: Yup.string().required(),
    })
    
    const[form, setForm] = useState(initialState)
    const[errors, setErrors] = useState({})

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



    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await validationSchema.validate(form, {abortEarly:false})
            const response = await api.post("api/bail/police/response/create/", form)
            if(response.status === 201){
                toast.success("Response added successfully", {
                    theme: "colored"
                })
                setForm(initialState)
                navigate("/police/dashboard")
            }
        }catch(error){
            if(error.inner){
                const newErrors = {};
                error.inner.forEach((err) => {
                    newErrors[err.path] = err.message;
                });
                setErrors(newErrors);
            }
        }
    }

    return (
    <>
        <ToastContainer />
        <div className="content-wrapper">
        <div className="container-fluid mt-3">
            <div className="card card-outline card-primary">
                <div className="card-header">
                    <h3 className="card-title"><i className="fas fa-edit mr-2"></i><strong>Police Response</strong></h3>
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
                                        <td colSpan={5} dangerouslySetInnerHTML={CreateMarkup(petition.gist_of_fir)}></td>
                                    </tr>
                                    <tr>
                                        <td>Gist&nbsp;in&nbsp;Local&nbsp;Language</td>
                                        <td colSpan={5} dangerouslySetInnerHTML={CreateMarkup(petition.gist_in_local)}></td>
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
                        <div className="card-header">
                            <strong>Response</strong>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <FormGroup className='mb-3'>
                                            <FormLabel>Offences</FormLabel>
                                            <FormControl 
                                                as="textarea" 
                                                rows={1}
                                                name="offences"
                                                value={form.offences}
                                                className={`form-control ${errors.offences ? 'is-invalid' : null }`}
                                                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                            ></FormControl>
                                            <div className="invalid-feedback">
                                                { errors.offences}
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="">Date of Arrest</label>
                                        <div className="input-group mb-3">
                                            <input 
                                                type="date" 
                                                className={`form-control ${errors.date_of_arrest ? 'is-invalid' : ''}`} 
                                                name="date_of_arrest"
                                                value={form.date_of_arrest}
                                                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                            />
                                            <div className="invalid-feedback">
                                                { errors.date_of_arrest }
                                            </div>
                                            {/* <div className="input-group-append">
                                                <button 
                                                    className="btn btn-outline-primary" 
                                                    type="button"
                                                    onClick={(e) => setArrestModify(!arrestModify)}
                                                >Modify</button>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup className='mb-3'>
                                            <FormLabel>Name of the accused/suspected person(s)</FormLabel>
                                            <FormControl 
                                                type="text"
                                                name="accused_name"
                                                value={form.accused_name}
                                                className={`form-control ${errors.accused_name ? 'is-invalid' : null }`}
                                                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                            ></FormControl>
                                            <div className="invalid-feedback">
                                                { errors.accused_name }
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup className='mb-3'>
                                            <FormLabel>Specific Allegations /Overt Acts against the Petitioner(s)</FormLabel>
                                            <FormControl 
                                                as="textarea"
                                                rows={1}
                                                name="specific_allegations"
                                                className={`form-control ${errors.specific_allegations ? 'is-invalid' : null }`}
                                                value={form.specific_allegations}
                                                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                            ></FormControl>
                                            <div className="invalid-feedback">
                                                { errors.specific_allegations }
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-12">
                                        <FormGroup className='mb-3'>
                                            <FormLabel>Materials & Circumstances against the Petitioner</FormLabel>
                                            <FormControl 
                                                as="textarea" 
                                                rows={2}
                                                name="materials_used"
                                                className={`form-control ${errors.materials_used ? 'is-invalid' : null }`}
                                                value={form.materials_used}
                                                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                            ></FormControl>
                                            <div className="invalid-feedback">
                                                { errors.materials_used }
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-12">
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
                                            <div className="form-group row">
                                                <label htmlFor="" className="col-sm-3">Particulars of Injury</label>
                                                <div className="col-sm-9">
                                                    <FormControl 
                                                        as="textarea" 
                                                        rows={2}
                                                        name="injury_particulars"
                                                        value={form.injury_particulars}
                                                        onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                    ></FormControl>
                                                </div>
                                            </div>
                                        </>
                                        )}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <p><strong>Stage of Investigation / Trial</strong></p>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <select 
                                            name="investigation_stage"
                                            value={form.investigation_stage}
                                            className={`form-control ${errors.investigation_stage ? 'is-invalid' : null}`}
                                            onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                        >
                                            <option value="">Select</option>
                                            <option value="1">Pending Investigation</option>
                                            <option value="2">Chargesheet filed</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            { errors.investigation_stage }
                                        </div>
                                    </div>
                                </div>
                                { parseInt(form.investigation_stage) === 2 && (
                                <div className="row mt-3">    
                                    <div className="col-md-2">
                                        <FormGroup className="mb-3">
                                            <label htmlFor="">CNR Number</label>
                                            <FormControl
                                                name="cnr_number"
                                                value={form.cnr_number}
                                                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                            ></FormControl>
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-3">
                                        <FormGroup className="mb-3">
                                            <label htmlFor="">Court</label>
                                            <select 
                                                name="court" 
                                                className="form-control"
                                                value={form.court}
                                                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                            >
                                                <option value="">Select Court</option>
                                            </select>
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-2">
                                        <FormGroup className="mb-3">
                                            <label htmlFor="">Stage of the Case</label>
                                            <FormControl
                                                name="case_stage"
                                                value={form.case_stage}
                                                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                            ></FormControl>
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-2">
                                        <FormGroup className="mb-3">
                                            <label htmlFor="">Next Hearing Date</label>
                                            <FormControl 
                                                type="date"
                                                name="next_hearing"
                                                value={form.next_hearing}
                                                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                            ></FormControl>
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-2">
                                        <FormGroup className="mb-3">
                                            <label htmlFor="">No. Of. Witness</label>
                                            <FormControl
                                                name="no_of_witness"
                                                value={form.no_of_witness}
                                                onChange={(e) => setForm({...form, [e.target.name]: e.target.value })}
                                            ></FormControl>
                                        </FormGroup>
                                    </div>
                                </div>
                                )}
                                <div className="row">
                                    <div className="col-md-6">
                                        <FormGroup className="mb-3">
                                            <FormLabel>Antecedents/Previous Cases against the Petitioner(s)</FormLabel>
                                            <FormControl
                                                name="previous_case"
                                                value={form.previous_case}
                                                className={`form-control ${errors.previous_case ? 'is-invalid' : null}`}
                                                onChange={(e) => setForm({...form, [e.target.name]: e.target.value })}
                                            ></FormControl>
                                            <div className="invalid-feedback">
                                                { errors.previous_case}
                                            </div>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <FormGroup className="mb-3">
                                            <FormLabel>Details of Previous Bail Applications</FormLabel>
                                            <FormControl 
                                                as="textarea" 
                                                rows={2}
                                                name="previous_bail"
                                                className={`form-control ${errors.previous_bail ? 'is-invalid' : null}`}
                                                value={form.previous_bail}
                                                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                            ></FormControl>
                                            <div className="invalid-feedback">
                                                { errors.previous_bail }
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup className="mb-3">
                                            <FormLabel>Status of other accused</FormLabel>
                                            <FormControl 
                                                as="textarea" 
                                                rows={2}
                                                name="other_accused_status"
                                                value={form.other_accused_status}
                                                className={`form-control ${errors.other_accused_status ? 'is-invalid' : null}`}
                                                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                ></FormControl>
                                                <div className="invalid-feedback">
                                                    { errors.other_accused_status }
                                                </div>
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup className="mb-3">
                                            <FormLabel>Why Bail/AB Should Not be Granted</FormLabel>
                                            <FormControl 
                                                as="textarea" 
                                                rows={2}
                                                name="reason_not_given"
                                                className={`form-control ${errors.reason_not_given ? 'is-invalid' : null}`}
                                                value={form.reason_not_given}
                                                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                            ></FormControl>
                                            <div className="invalid-feedback">
                                                { errors.reason_not_given }
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup className="mb-3">
                                            <FormLabel>Any other Information</FormLabel>
                                            <FormControl 
                                                as="textarea" 
                                                rows={2}
                                                name="other_information"
                                                className={`form-control ${errors.other_information ? 'is-invalid' : null}`}
                                                value={form.other_information}
                                                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                            ></FormControl>
                                            <div className="invalid-feedback">
                                                { errors.other_information }
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-12">
                                        <FormGroup className="mb-3">
                                            <FormLabel>Court Details: FIR/ Committal/Trial/ Appellate</FormLabel>
                                            <FormControl 
                                                as="textarea" 
                                                rows={2}
                                                name="court_details"
                                                value={form.court_details}
                                                className={`form-control ${errors.court_details ? 'is-invalid' : null}`}
                                                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                            ></FormControl>
                                            <div className="invalid-feedback">
                                                { errors.court_details }
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-12">
                                        <Button 
                                            variant='contained' 
                                            color="success"
                                            type='submit'
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
    </>
  )
}

export default ResponseCreate