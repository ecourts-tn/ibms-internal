import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Proceeding from './Proceeding'
import { CreateMarkup } from '../../utils'
import api from '../../api'
import './style.css'
import PPRemarks from './PPRemarks'


const DailyProceedings = () => {

    const {state} = useLocation();
    const navigate = useNavigate()
    if(!state){
        navigate("/petition/proceedings")
    }

    const[petition, setPetition]        = useState({
        court_type: '',
        case_type: '',
        bail_type: '',
        complaint_type: ''
    })

    const[litigant, setLitigant]    = useState([])
    const[crime, setCrime] = useState({})
    const[grounds, setGrounds] = useState([])
    const[advocates, setAdvocates] = useState([])
    const[policeResponse, setPoliceResponse] = useState([])
    const[prosecutionRemarks, setProsecutionRemarks] = useState({})

    useEffect(() => {
        async function fetchData(){
            // if(regNumber !== ''){
                try{
                    const response = await api.get(`court/petition/detail/`, {params:{efile_no:state.efile_no}})
                    if(response.status === 200){
                        const { petition, grounds, advocate, police_response, ppremarks, crime, litigant } = response.data
                        setPetition(petition)
                        setLitigant(litigant)
                        setAdvocates(advocate)
                        setGrounds(grounds)
                        setCrime(crime)
                        setProsecutionRemarks(ppremarks)
                    }
                }catch(err){
                    console.log(err)
                }
            // }
        }
        fetchData();
    }, [state.cino])

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
                                                                <tr>
                                                                    <td>Registration Number</td>
                                                                    <td>{ petition.reg_number }</td>
                                                                    <td>Registration Year</td>
                                                                    <td>{ petition.reg_year }</td>
                                                                </tr>
                                                            </tbody>
                                                            )}
                                                        </table>
                                                    )}
                                                    {/* <table className="table table-bordered table-striped table-sm">
                                                        <tbody>
                                                            <tr>
                                                                <td colSpan={4} className="bg-secondary"><strong>FIR Details</strong></td>
                                                            </tr>
                                                        </tbody>
                                                        <tr>
                                                            <td>Date&nbsp;of&nbsp;Occurrence</td>
                                                            <td>{ crime.date_of_occurrence }</td>
                                                            <td>FIR Date & Time</td>
                                                            <td>{ crime.fir_date_time }</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Place of Occurence</td>
                                                            <td colSpan={3}>{ crime.place_of_occurrence }</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Investigation Officer</td>
                                                            <td>{ crime.investigation_officer }</td>
                                                            <td>Investigation Officer Rank</td>
                                                            <td>{ crime.investigation_officer_rank }</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Complaintant&nbsp;Name</td>
                                                            <td>{ crime.complainant_name }</td>
                                                            <td>Complaintant&nbsp;Age</td>
                                                            <td>{ crime.complainant_age }</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Complaintant&nbsp;Guardian</td>
                                                            <td>{ crime.complainant_guardian }</td>
                                                            <td>Complaintant&nbsp;Guardian Name</td>
                                                            <td>{ crime.complainant_guardian_name }</td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={4}>
                                                                <p><strong>Gist of FIR / Allegations</strong></p>
                                                                <span dangerouslySetInnerHTML={CreateMarkup(crime.gist_of_fir)}></span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={4}>
                                                                <p><strong>Gist of FIR / Allegations (In Local Language)</strong></p>
                                                                <span dangerouslySetInnerHTML={CreateMarkup(crime.gist_in_local)}></span>
                                                            </td>
                                                        </tr>
                                                    </table> */}

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
                                                            { advocates.map((a, index) => (
                                                                <tr key={index}>
                                                                    <td>{ index+1 }</td>
                                                                    <td>{ a.advocate_name }</td>
                                                                    <td>{ a.enrolment_number }</td>
                                                                    <td>{ a.advocate_mobile }</td>
                                                                    <td>{ a.advocate_email }</td>
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
                                                { litigant.filter(l=>l.litigant_type===1).map((p, index) => (
                                                    <table className="table table-bordered table-striped table-sm mb-2" key={index}>
                                                        <thead className="bg-info">
                                                            <tr>
                                                                <th colSpan={4}><strong>Petitioner - { index+1 }. {p.litigant_name}</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Petitioner&nbsp;Name</td>
                                                                <td>{ p.litigant_name }</td>
                                                                <td>Age</td>
                                                                <td>{ p.age }</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Gender</td>
                                                                <td>{ p.gender }</td>
                                                                <td>Rank</td>
                                                                <td>{ p.rank }</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Relation</td>
                                                                <td>{p.relation}</td>
                                                                <td>Relation Name</td>
                                                                <td>{p.relation_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Mobile Number</td>
                                                                <td>{p.mobile_number}</td>
                                                                <td>Email Address</td>
                                                                <td>{p.email_address}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Address</td>
                                                                <td colSpan="7">{p.address}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    ))}
                                                    { litigant.filter(l=>l.litigant_type===2).map((res, index) => (
                                                    <table className="table table-bordered table-striped mb-2 table-sm" key={index}>
                                                        <thead className="bg-olive">
                                                            <tr>
                                                                <td colSpan={4}><strong>Respondent - {index+1}</strong></td>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Respondent Name</td>
                                                                <td>{ res.litigant_name } { res.designation }</td>
                                                                <td>Address</td>
                                                                <td>{ res.address }</td>
                                                            </tr>
                                                            <tr>
                                                                <td>District</td>
                                                                <td>{ res.district.district_name }</td>
                                                                <td>Police Station</td>
                                                                <td>{ res.police_station.station_name }</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    ))}
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
                                                                 <p dangerouslySetInnerHTML={CreateMarkup(ground.description)}></p>
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
                                                        <PPRemarks accused={litigant}/>
                                                    ): (
                                                        <>
                                                            {/* { prosecutionRemarks.map((p, index) => (
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
                                                            ))} */}
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
                                    <Proceeding efile_no={state.efile_no}/>
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