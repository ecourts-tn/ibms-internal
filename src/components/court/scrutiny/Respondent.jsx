import React from 'react'

const Respondent = ({respondent}) => {
  return (
        <>
            <table className="table table-sm table-bordered table-striped mb-2">
                <thead>
                    <tr>
                        <th width="600">Respondent Name</th>
                        <th>Address</th>
                        <th>District</th>
                    </tr>
                </thead>
                <tbody>
                    { respondent.map((res, index) => (
                    <tr key={index}>
                        <td>{ res.respondent_name } rep by { res.designation }</td>
                        <td>{ res.address }</td>
                        <td>{ res.district }</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}   

export default Respondent