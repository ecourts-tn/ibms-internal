import React from 'react'

const Grounds = ({grounds}) => {
  return (
        <>
            { grounds.map((ground, index) => (
            <div className="card" key={index}>
                <div className="card-body mt-0">
                    { ground.description}
                </div>
            </div>
            ))}
        </>
    )
}

export default Grounds