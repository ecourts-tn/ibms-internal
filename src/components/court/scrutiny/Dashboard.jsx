import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import api from '../../../api'
import '../style.css'
import BasicDetails from './BasicDetails'
import Petitioner from './Petitioner'
import Respondent from './Respondent'
import Grounds from './Grounds'

const CaseScrutiny = () => {

    const {state} = useLocation();
    const navigate = useNavigate()

    const[petition, setPetition]        = useState({
        court_type: '',
        case_type: '',
        bail_type: '',
        complaint_type: ''
    })
    const[petitioner, setPetitioner]    = useState([])
    const[respondent, setRespondent]    = useState([])
    const[grounds, setGrounds] = useState([])
    const[verify, setVerify] = useState('')

    useEffect(() => {
        async function fetchData(){
            try{
                const response = await api.get(`api/bail/petition/${state.cino}/detail/`)
                console.log(response.data)
                const { petition, petitioner, grounds, respondent} = response.data
                setPetition(petition)
                setPetitioner(petitioner)
                setRespondent(respondent)
                setGrounds(grounds)
            }catch(err){
                console.log(err)
            }
        }
        fetchData();
    }, [state.cino])

    if(!state){
        return (
            <div className="content-wrapper">
                <div className="container-fluid pt-5">
                    <div className="alert alert-danger">
                        Details not found
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="card card-outline card-primary">
                        <div className="card-header">
                            <h3 className="card-title"><i className="fas fa-edit mr-2"></i><strong>Petition Details</strong></h3>
                        </div>
                        <div className="card-body">
                            <div id="accordion">
                                <div className="card m-1">
                                    <div className="card-header" id="headingOne">
                                        <a data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Basic Details</a>
                                    </div>
                                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                        <div className="card-body">
                                            <BasicDetails petition={petition}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="card m-1">
                                    <div className="card-header" id="headingTwo">
                                        <a data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Litigant Details
                                        </a>
                                    </div>
                                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                        <div className="card-body p-2">
                                            <div className="card">
                                                <div className="card-header bg-secondary">
                                                    <strong>Petitioner Details</strong>
                                                </div>
                                                <div className="card-body p-2">
                                                    <Petitioner petitioner={petitioner} />
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-header bg-secondary">
                                                    <strong>Respondent Details</strong>
                                                </div>
                                                <div className="card-body p-2">
                                                    <Respondent respondent={respondent} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card m-1">
                                    <div className="card-header" id="headingThree">
                                        <a data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Grounds & Previous Case Details
                                        </a>
                                    </div>
                                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                        <div className="card-body p-2">
                                            <Grounds grounds={grounds} />
                                        </div>
                                    </div>
                                </div>
                                <div className="card m-1">
                                    <div className="card-header" id="headingFour">
                                        <a data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                            Advocate Details & Documents
                                        </a>
                                    </div>
                                    <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordion">
                                        <div className="card-body">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-md-6 offset-3">
                                    <div className="form-group row">
                                        <label htmlFor="date" className="col-sm-3">Verification Date</label>
                                        <div className="col-sm-3">
                                            <input type="date" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group row mt-4">
                                        <label htmlFor="verify" className="col-sm-3">Verify</label>
                                        <div className="col-sm-9">
                                            <div className="icheck-success d-inline mx-2">
                                                <input type="radio" id="radioVerify1" name="verify" onChange={(e) => setVerify(1)}/>
                                                <label htmlFor="radioVerify1">Accept</label>
                                            </div>
                                            <div className="icheck-danger d-inline mx-2">
                                                <input type="radio" id="radioVerify2" name="verify" onChange={(e) => setVerify(2)}/>
                                                <label htmlFor="radioVerify2">Return</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                { verify === 2 && (
                                <>
                                    <div className="col-md-6 offset-3">
                                        <div className="form-group row">
                                            <label htmlFor="date" className="col-sm-3">Complaince Date</label>
                                            <div className="col-sm-3">
                                                <input type="date" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 offset-3">
                                        <div className="form-group">
                                            <label htmlFor="remarks">Remarks</label>
                                            <textarea name="remarks" id="remarks" className="form-control" rows="2"></textarea>
                                        </div>
                                    </div>
                                </>
                                )}
                                { verify !== '' && verify === 1 && (
                                <div className="col-md-12 d-flex justify-content-center">
                                    <button className="btn btn-success px-3">Submit</button>
                                </div>
                                )}
                                { verify !== '' && verify === 2 && (
                                <div className="col-md-12 d-flex justify-content-center">
                                    <button className="btn btn-danger px-3">Return</button>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

export default CaseScrutiny
