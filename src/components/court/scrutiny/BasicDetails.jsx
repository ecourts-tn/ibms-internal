import React from 'react'
import Form from 'react-bootstrap/Form'
import { CreateMarkup } from '../../../utils'

const BasicDetails = ({petition, crime}) => {

    const doNothing = () => {}

    return (
        <>
            {Object.keys(petition).length > 0 && (
                <>
            <div className="row">
                <div className="col-md-12">
                    <Form.Group className="row mb-2">
                        <Form.Label className="col-sm-3">Court Type</Form.Label>
                        <div className="col-sm-9">
                            <Form.Control
                                value={petition.court_type.court_type}
                                readOnly={true}
                                ></Form.Control>
                        </div>
                    </Form.Group>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    { petition.court_type.id === 1 && (
                    <div className="form-group row">
                        <label htmlFor="bench_type" className="col-sm-3">High Court Bench</label>
                        <div className="col-sm-9">
                            <Form.Control
                                value={petition.bench_type.bench_type}
                                readOnly={true}
                                ></Form.Control>
                        </div>
                    </div>
                    )}
                </div>
            </div>  
            { petition.court_type.id === 2 && (
                <div className="row mb-0">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="state">State</label>
                            <Form.Control
                                value={petition.state.state_name}
                                readOnly={true}
                                ></Form.Control>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="district">District</label>
                            <Form.Control
                                value={petition.district.district_name}
                                readOnly={true}
                                ></Form.Control>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="establishment">Establishment Name</label>
                            <Form.Control
                                value={petition.establishment.establishment_name}
                                readOnly={true}
                                ></Form.Control>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="court">Court Name</label>
                            <Form.Control
                                value={petition.court.court_name}
                                readOnly={true}
                                ></Form.Control>
                    </div>
                </div>
            </div>
            )}
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="caseType">Case Type</label>
                            <Form.Control
                                value={petition.case_type.type_name}
                                readOnly={true}
                                ></Form.Control>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="bailType">Bail Type</label>
                            <Form.Control
                                value={petition.bail_type.type_name}
                                readOnly={true}
                                ></Form.Control>
                    </div>
                </div>
                <div className="col-md-4">
                    <Form.Group>
                        <Form.Label>Compliant Type</Form.Label>
                            <Form.Control
                                value={petition.complaint_type.type_name}
                                readOnly={true}
                                ></Form.Control>
                    </Form.Group>
                </div>
                <div className="col-sm-12">
                    <div className="form-group clearfix">
                    <label htmlFor="" className="mr-2">Crime Registered?</label>
                    <div className="icheck-success d-inline mx-2">
                        <input type="radio" id="radioPrimary1" name="crime_registered" checked={petition.crime_registered === "1" ? true : false} onChange={doNothing}/>
                        <label htmlFor="radioPrimary1">Yes</label>
                    </div>
                    <div className="icheck-danger d-inline mx-2">
                        <input type="radio" id="radioPrimary2" name="crime_registered" checked={petition.crime_registered === "2" ? true : false} onChange={doNothing}/>
                        <label htmlFor="radioPrimary2">No</label>
                    </div>
                    <div className="icheck-primary d-inline mx-2">
                        <input type="radio" id="radioPrimary3" name="crime_registered" checked={petition.crime_registered === "3" ? true : false} onChange={doNothing}/>
                        <label htmlFor="radioPrimary3">Not Known</label>
                    </div>
                    </div>
                </div>
                {/* { crime.crime_state && (
                    <div className="col-md-2">
                    <div className="form-group">
                        <label htmlFor="crime_state">Crime State</label>
                        <input type="text" readOnly={true} className="form-control" value={crime.crime_state.state_name}/>
                    </div>
                </div>
                )}
                { crime.crime_district && (
                    <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="crime_district">Crime District</label><br />
                        <input type="text" className="form-control" readOnly={true} value={crime.crime_district.district_name} /> 
                    </div>
                </div>
                )}
                { crime.police_station && (
                    <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="police_station">Police Station Name</label><br />
                        <input type="text" className="form-control" readOnly={true} value={crime.police_station} />
                    </div>
                </div>
                )}
                <div className="col-md-2">
                    <div className="form-group">
                    <Form.Group className="mb-3">
                        <Form.Label>Crime Number</Form.Label>
                        <Form.Control 
                            type="text"
                            name="crime_number"
                            value={crime.fir_number}
                            readOnly={true}
                            ></Form.Control>
                    </Form.Group>
                    </div>
                </div>
                <div className="col-md-1">
                    <Form.Group>
                        <Form.Label>Year</Form.Label>
                        <Form.Control 
                            type="text"
                            name="crime_year"
                            value={crime.fir_year}
                            readOnly={true}
                            ></Form.Control>
                    </Form.Group>   
                </div>  
                <div className="col-md-2">
                    <Form.Group className="mb-3">
                    <Form.Label>Date of Occurrence</Form.Label>
                    <Form.Control 
                        type="date"
                        name="dateOfOccurence"
                        readOnly={ crime.date_of_occurrence ? `readOnly` : ''}
                        value={ crime.date_of_occurrence }
                        ></Form.Control>
                    </Form.Group>
                </div>
                <div className="col-md-2">
                    <Form.Group className="mb-3">
                    <Form.Label>FIR Date & Time</Form.Label>
                    <Form.Control 
                        type="date" 
                        name="FIRDateTime"
                        readOnly={ crime.fir_date_time ? `readOnly` : '' }
                        value={ crime.fir_date_time }
                        ></Form.Control>
                    </Form.Group>
                </div>
                <div className="col-md-8">
                    <Form.Group className="mb-3">
                        <Form.Label>Place of Occurrence</Form.Label>
                        <Form.Control 
                            name="placeOfOccurence"
                            readOnly={ crime.place_of_occurrence ? "readOnly" : ''}
                            value={ crime.place_of_occurrence }
                            ></Form.Control>
                    </Form.Group>
                </div>
                <div className="col-md-4">
                    <Form.Group>
                        <Form.Label>Investigation Officer</Form.Label>
                        <Form.Control 
                            name="investigationOfficer"
                            readOnly={ crime.investigation_officer ? 'readOnly' : ''}
                            value={ crime.investigation_officer }
                            ></Form.Control>
                    </Form.Group>
                </div>
                <div className="col-md-4">
                    <Form.Group className="mb-3">
                        <Form.Label>Complaintant Name</Form.Label>
                        <Form.Control 
                            name="compliantantName"
                            readOnly={ crime.complainant_name ? 'readOnly' : ''}
                            value={ crime.complainant_name }></Form.Control>
                    </Form.Group>
                </div> */}
                <div className="col-md-12">
                    <table className="table table-bordered table-striped">
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
                    </table>
                </div>
                {/* <div className="col-md-6">
                    <Form.Group className="mb-3">
                        <Form.Label>Gist of FIR / Allegations</Form.Label>
                        <div style={{ border:'1px solid gray', height:'250px', padding:'10px', overflowY:'scroll'}}>
                            
                        </div>
                    </Form.Group>
                </div>
                <div className="col-md-6">
                    <Form.Group className="mb-3">
                        <Form.Label>Gist of FIR / Allegations (In Local Language)</Form.Label>
                        <div style={{ border:'1px solid gray', height:'250px', padding:'10px', overflowY:'scroll'}}>
                            
                        </div>
                    </Form.Group>
                </div> */}
            </div>   
        </>

        )}
    </>
    )
}

export default BasicDetails
