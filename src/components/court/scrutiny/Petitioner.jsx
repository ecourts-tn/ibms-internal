import React from 'react'

const Petitioner = ({litigant}) => {
  return (
        <>
            { litigant.filter(l=>l.litigant_type===1).map((p, index) => (
            <table className="table table-bordered table-striped mb-2" key={index}>
                <thead className="bg-info">
                    <tr>
                        <th colSpan={4}><strong>Petitioner - { index+1 }. {p.litigant_name}</strong></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Petitioner Name</td>
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
        </>
    )
}

export default Petitioner