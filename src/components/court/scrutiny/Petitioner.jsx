import React from 'react'

const Petitioner = ({petitioner}) => {
  return (
        <>
            { petitioner.map((p, index) => (
            <table className="table table-sm table-bordered table-striped mb-2" key={index}>
                <tbody>
                    <tr>
                        <td colSpan="8"><strong>Petitioner { index+1 }</strong></td>
                    </tr>
                    <tr>
                        <td>Petitioner Name</td>
                        <td>{ p.petitioner_name }</td>
                        <td>Age</td>
                        <td>{ p.age }</td>
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