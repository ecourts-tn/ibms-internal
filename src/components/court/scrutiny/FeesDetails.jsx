import React from 'react'

const FeesDetails = ({fees}) => {
    return (
        <>
            { Object.keys(fees).length > 0 && (
                <table className="table table-striped table-bordered table-sm">
                    <thead className="bg-secondary">
                        <tr>
                            <th>Petitioner Name</th>
                            <th>Mobile Number</th>
                            <th>Transcation Date</th>
                            <th>Reference Number</th>
                            <th>Amount Paid</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        { fees.map((fee, index) => (
                        <tr key={index}>
                            <td>{ fee.petitioner_name }</td>
                            <td>{ fee.mobile_number }</td>
                            <td>{ fee.transcation_date }</td>
                            <td></td>
                            <td>{ fee.amount }</td>
                            <td></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default FeesDetails
