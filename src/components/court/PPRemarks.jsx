import React, {useState, useEffect} from 'react'

const PPRemarks = ({accused}) => {

    console.log(accused)
    const initialState = {
        response_type: '',
        accused_name: '',
        accused_type: '',
        discharged: false,
    }
    const[form, setForm] = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    
    return (
        <>
            <form method="POST" onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label className="col-sm-3">Response Type</label>
                    <div className="col-sm-8">
                        <div className="icheck-success d-inline mx-2">
                            <input 
                                type="radio" 
                                id="radioResponseType1" 
                                name="response_type" 
                                onChange={(e) => setForm({...form, [e.target.name] : 1})} 
                                checked={parseInt(form.response_type) === 1 ? true : false}
                            />
                            <label htmlFor="radioResponseType1">Contested</label>
                        </div>
                        <div className="icheck-danger d-inline mx-2">
                            <input 
                                type="radio" 
                                id="radioResponseType2" 
                                name="response_type" 
                                onChange={(e) => setForm({...form, [e.target.name] : 2})} 
                                checked={parseInt(form.response_type) === 2 ? true : false}/>
                            <label htmlFor="radioResponseType2">Uncontested</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    { accused.map((a, index) => (
                        <>  
                            <div className="col-sm-5 offset-md-3">
                                <label htmlFor="">Accused Name</label>
                                <input 
                                    type="text" 
                                    value={a.petitioner_name}
                                    className="form-control mb-3" 
                                    readOnly={true}
                                />
                            </div>
                            <div className="col-sm-4">
                                <label htmlFor="">Accused Type</label>
                                <select name="petitioner_name" id="" className="form-control mb-3">
                                    <option value="">Select type</option>
                                    <option value="">First time offender</option>
                                    <option value="">Habitual offender</option>
                                </select>
                        </div>
                        </>
                    ))}  
                </div>
                <div className="form-group row">
                    <label className="col-sm-3">Injured discharged</label>
                    <div className="col-sm-8">
                        <div className="icheck-success d-inline mx-2">
                            <input 
                                type="radio" 
                                id="radioDischarged1" 
                                name="discharged" 
                                onChange={(e) => setForm({...form, [e.target.name] : true})} 
                                checked={form.discharged ? true : false}
                            />
                            <label htmlFor="radioDischarged1">Yes</label>
                        </div>
                        <div className="icheck-danger d-inline mx-2">
                            <input 
                                type="radio" 
                                id="radioDischarged2" 
                                name="discharged" 
                                onChange={(e) => setForm({...form, [e.target.name] : false})} 
                                checked={!form.discharged ? true : false}/>
                            <label htmlFor="radioDischarged2">No</label>
                        </div>
                    </div>
                </div>
                { form.discharged && (
                    <>
                        <div className="form-group row">
                    <label htmlFor="" className="col-sm-3">Hospital Name</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="" className="col-sm-3">Condition of Victim</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" />
                    </div>
                </div>
            </>
                )}
                <div className="form-group row">
                    <label htmlFor="" className="col-sm-3">Remarks</label>
                    <div className="col-sm-9">
                        <textarea name="remarks" cols="30" rows="5" className="form-control"></textarea>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9 d-flex justify-content-center">
                        <input type="submit" className="btn btn-success" value="Submit"/>
                    </div>
                </div>
            </form>
        </>
    )
}

export default PPRemarks