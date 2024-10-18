import React from 'react'

const Respondent = ({litigant}) => {
  return (
        <>
            { litigant.filter(l=>l.litigant_type===2).map((res, index) => (
            <table className="table table-bordered table-striped mb-2" key={index}>
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
        </>
    )
}   

export default Respondent