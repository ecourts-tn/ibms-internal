import React, { useState, useEffect } from 'react'
import Proceeding from './Proceeding'
import api from '../../api'
import './style.css'
import PPRemarks from './PPRemarks'


const DailyProceedings = () => {

    const[regNumber, setRegNumber] = useState('')
    const[numbers, setNumbers] = useState([])

    const[petition, setPetition]        = useState({
        court_type: '',
        case_type: '',
        bail_type: '',
        complaint_type: ''
    })
    const[petitioner, setPetitioner]    = useState([])
    const[respondent, setRespondent]    = useState([])
    const[grounds, setGrounds] = useState([])
    const[advocates, setAdvocates] = useState([])
    const[policeResponse, setPoliceResponse] = useState([])
    const[prosecutionRemarks, setProsecutionRemarks] = useState({})

    useEffect(() => {
        async function fetchData(){
            if(regNumber !== ''){
                try{
                    const response = await api.get(`api/bail/petition/detail/`, {params:{cino:regNumber}})
                    const { petition, petitioner, grounds, respondent,advocate, police_response, ppremarks } = response.data
                    setPetition(petition)
                    setPetitioner(petitioner)
                    setRespondent(respondent)
                    setAdvocates(advocate)
                    setGrounds(grounds)
                    setPoliceResponse(police_response)
                    setProsecutionRemarks(ppremarks)
                }catch(err){
                    console.log(err)
                }
            }
        }
        fetchData();
    }, [regNumber])

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
                                <div className="col-md-7 h-100">
                                <div id="accordion">
                                <div className="card m-1">
                                    <div className="card-header" id="headingOne">
                                        <a data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" href="/#">Petition Details</a>
                                    </div>
                                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                        <div className="card-body p-2">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    { Object.keys(petition).length > 0 && (
                                                        <table className="table table-bordered table-striped table-sm">
                                                            { petition && (
                                                            <tbody>
                                                                <tr>
                                                                    <td>Court Type</td>
                                                                    <td>{ petition.court_type.court_type }</td>
                                                                    <td>Bench Type</td>
                                                                    <td>{ petition.bench_type ? petition.bench_type.bench_type : null}</td>
                                                                </tr>
                                                                { parseInt(petition.court_type.id) === 2 && (
                                                                <>
                                                                <tr>
                                                                    <td>State</td>
                                                                    <td>{ petition.state ? petition.state.state_name : null }</td>
                                                                    <td>District</td>
                                                                    <td>{ petition.district ? petition.district.district_name : null }</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Establishment</td>
                                                                    <td>{ petition.establishment ? petition.establishment.establishment_name : null }</td>
                                                                    <td>Court</td>
                                                                    <td>{ petition.court ? petition.court.court_name : null }</td>
                                                                </tr>    
                                                                </>
                                                                )}
                                                                <tr>
                                                                    <td>Case Type</td>
                                                                    <td>{ petition.case_type.type_name }</td>
                                                                    <td>Bail Type</td>
                                                                    <td>{ petition.bail_type.type_name }</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Crime Registered</td>
                                                                    <td>{ parseInt(petition.crime_registered) === 1 ? 'Yes' : null}</td>
                                                                    <td>Compliant Type</td>
                                                                    <td>{ petition.complaint_type.type_name }</td>
                                                                </tr>
                                                            </tbody>
                                                            )}
                                                        </table>
                                                    )}
                                                   
                                                    <table className="table table-bordered table-striped table-sm">
                                                        <thead className="bg-secondary">
                                                            <tr>
                                                                <th colSpan={5} style={{ textAlign:'center'}}>Advocates</th>
                                                            </tr>
                                                            <tr>
                                                                <th>S. No.</th>
                                                                <th>Advocate&nbsp;Name</th>
                                                                <th>Enrolment Number</th>
                                                                <th>Mobile Number</th>
                                                                <th>e-Mail Address</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            { advocates.map((radvocate, index) => (
                                                                <tr key={index}>
                                                                    <td>{ index+1 }</td>
                                                                    <td>{ radvocate.radvocate_name }</td>
                                                                    <td>{ radvocate.entrolment_number }</td>
                                                                    <td>{ radvocate.advocate_mobile }</td>
                                                                    <td>{ radvocate.advocate_email }</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card m-1">
                                    <div className="card-header" id="headingTwo">
                                        <a data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" href="/#">
                                            Litigants
                                        </a>
                                    </div>
                                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                        <div className="card-body p-2">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <table className="table table-bordered table-striped table-sm">
                                                        <thead className="bg-secondary">
                                                            <tr>
                                                                <th colSpan={7} style={{textAlign:'center'}}>Petitioners</th>
                                                            </tr>
                                                            <tr>
                                                                <th>S.&nbsp;No.</th>
                                                                <th>Petitioner&nbsp;Name</th>
                                                                <th>Gender</th>
                                                                <th>Age</th>
                                                                <th width="500">Address</th>
                                                                <th>Act</th>
                                                                <th>Section</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            { petitioner.map((petitioner, index) => (
                                                                <tr key={index}>
                                                                    <td>{ index+1 }</td>
                                                                    <td>{ petitioner.petitioner_name }</td>
                                                                    <td>{ petitioner.gender }</td>
                                                                    <td>{ petitioner.age }</td>
                                                                    <td>{ petitioner.address }</td>
                                                                    <td>{ petitioner.act }</td>
                                                                    <td>{ petitioner.section }</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    <table className="table table-bordered table-striped table-sm">
                                                        <thead className="bg-secondary">
                                                            <tr>
                                                                <th colSpan={5} style={{ textAlign:'center'}}>Respondents</th>
                                                            </tr>
                                                            <tr>
                                                                <th>S. No.</th>
                                                                <th>Respondent&nbsp;Name</th>
                                                                <th>Designation</th>
                                                                <th>Address</th>
                                                                <th>District</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            { respondent.map((respondent, index) => (
                                                                <tr key={index}>
                                                                    <td>{ index+1 }</td>
                                                                    <td>{ respondent.respondent_name }</td>
                                                                    <td>{ respondent.designation }</td>
                                                                    <td>{ respondent.address }</td>
                                                                    <td>{ respondent.district }</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card m-1">
                                    <div className="card-header" id="headingThree">
                                        <a data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" href="/#">
                                            Grounds
                                        </a>
                                    </div>
                                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                        <div className="card-body p-2">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    { grounds.map((ground, index) => (
                                                        <div className="card" key={index}>
                                                        <div className="card-body">
                                                            { ground.description}
                                                        </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card m-1">
                                    <div className="card-header" id="headingFive">
                                        <a data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive" href="/#">
                                            Police Response
                                        </a>
                                    </div>
                                    <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordion">
                                        <div className="card-body p-2">
                                        { policeResponse.map((r, index) => (
                                        <table className="table table-bordered table-striped table-sm mt-2" key={index}>
                                            <tbody>
                                                <tr>
                                                    <td>Offences</td>
                                                    <td>{r.offences}</td>
                                                </tr>
                                                <tr>
                                                    <td>Date of Arrest</td>
                                                    <td>{ r.date_of_arrest }</td>
                                                </tr>
                                                <tr>
                                                    <td>Name of the accused/suspected person(s)</td>
                                                    <td>{r.accused_name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Specific Allegations /Overt Acts against the Petitioner(s)</td>
                                                    <td>{ r.specific_allegations}</td>
                                                </tr>
                                                <tr>
                                                    <td>Materials & Circumstances against the Petitioner</td>
                                                    <td>{ r.materials_used}</td>
                                                </tr>
                                                <tr>
                                                    <td>Injured discharged</td>
                                                    <td>{r.discharged}</td>
                                                </tr>
                                                <tr>
                                                    <td>Hospital Name</td>
                                                    <td>{r.hospital_name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Condition of Victim</td>
                                                    <td>{r.victim_condition}</td>
                                                </tr>
                                                <tr>
                                                    <td>Particulars of Injury</td>
                                                    <td>{r.injury_particulars}</td>
                                                </tr>
                                                <tr>
                                                    <td>Stage of Investigation / Trial</td>
                                                    <td>{r.investigation_stage}</td>
                                                </tr>
                                                <tr>
                                                    <td>CNR Number</td>
                                                    <td>{r.cnr_number}</td>
                                                </tr>
                                                <tr>
                                                    <td>Court</td>
                                                    <td>{r.court}</td>
                                                </tr>
                                                <tr>
                                                    <td>Stage of the Case</td>
                                                    <td>{r.case_stage}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="card m-1">
                                    <div className="card-header" id="headingSix">
                                        <a data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix" href="/#">
                                            PP / APP Remarks
                                        </a>
                                    </div>
                                    <div id="collapseSix" className="collapse" aria-labelledby="headingSix" data-parent="#accordion">
                                        <div className="card-body p-3">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    {prosecutionRemarks.length < 1 ?(
                                                        <PPRemarks accused={petitioner}/>
                                                    ): (
                                                        <>
                                                            { prosecutionRemarks.map((p, index) => (
                                                                <table className="table table-bordered table-striped table-sm mt-2" key={index}>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>Accused Name</td>
                                                                            <td>{ p.accused_name }</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Accused Type</td>
                                                                            <td>{ p.accused_type }</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Response Type</td>
                                                                            <td>{ p.response_type === 'c' ? 'Contested' : 'Uncontested' }</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Discharged</td>
                                                                            <td>{ p.discharged ? 'Yes' : 'No'}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Hospital Name</td>
                                                                            <td>{ p.hospital_name }</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Victim Condition</td>
                                                                            <td>{ p.victim_condition }</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Remarks</td>
                                                                            <td>{p.remarks}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            ))}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                </div>
                                <div className="col-md-5">
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