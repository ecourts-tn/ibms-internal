import React from 'react'
import Button from '@mui/material/Button'
import config from '../../../config'

const AdvocateDetails = ({advocates, petition, documents}) => {

    console.log(documents)
    return (
        <>
            { Object.keys(advocates).length > 0 && (
                <table className="table table-striped table-bordered table-sm">
                    <thead className="bg-secondary">
                        <tr>
                            <th>Advocate Name</th>
                            <th>Enrolment Number</th>
                            <th>Mobile Number</th>
                            <th>Email Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        { advocates.map((advocate, index) => (
                        <tr key={index}>
                            <td>{ advocate.advocate_name }</td>
                            <td>{ advocate.enrolment_number }</td>
                            <td>{ advocate.advocate_mobile }</td>
                            <td>{ advocate.advocate_email }</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <table className="table table-striped table-bordered table-sm mt-3">
                    <thead className="bg-secondary">
                        <tr>
                            <th>Document Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { documents.map((d, index) => (
                        <tr>
                            <td>{ d.title }</td>
                            <td><a href={`${config.docUrl}${d.document}`} target='_blank'><Button 
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                    >View</Button></a></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
        </>
    )
}

export default AdvocateDetails
