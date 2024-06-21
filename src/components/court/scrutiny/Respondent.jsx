import React from 'react'

const Respondent = ({respondent}) => {
  return (
        <>
            { respondent.map((res, index) => (
            <table className="table table-sm table-bordered table-striped mb-2" key={index}>
                <tbody>
                    <tr>
                        <td colSpan="8"><strong>Respondent { index+1 }</strong></td>
                    </tr>
                    <tr>
                        <td>Respondent Name</td>
                        <td>{ res.respondent_name }</td>
                        <td>Designation</td>
                        <td>{ res.designation }</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>{ res.address }</td>
                        <td>District</td>
                        <td>{ res.district }</td>
                    </tr>
                </tbody>
            </table>
            ))}
        </>
    )
}   

export default Respondent