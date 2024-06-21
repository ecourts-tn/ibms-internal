import React, {useState, useEffect} from 'react'

const Proceeding = ({cino}) => {

    const[proceeding, setProceeding] = useState('')
    const[isAppear, setIsAppear] = useState('')
    const[appearLocation, setAppearLocation] = useState('')
    const initialState = {
        proceeding: '',
        is_appear: false,
        appear_location: '',
        district: '',
        establishment: '',
        court:'',
        condition_time:'',
        condition_duration:'',
        is_bond:false,
        is_surity:false,
        other_condition: '',
        next_date:'',
        remarks: '',
    }
    const[form, setForm] = useState(initialState)

    const handleSubmit = () => {
        try{

        }catch(error){
            console.log(error)
        }
    }

    const handleReset = () => {
        setForm(initialState)
    }

    return (
        <>
            <div className="card">
                <div className="card-header bg-info">
                    <strong>Case Proceedings</strong>
                </div>
                <div className="card-body" style={{ height:'600px', overflowY:"scroll"}}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="proceeding">Proceeding</label>
                                <select 
                                    name="proceeding" 
                                    value={form.proceeding} 
                                    className="form-control" 
                                    onChange={(e) => setForm({...form, [e.target.name]:e.target.value})}
                                >
                                    <option value="">Select Proceeding</option>
                                    <option value="1">Allowed</option>
                                    <option value="2">Dismissed</option>
                                    <option value="3">Interim Order</option>
                                    <option value="4">Adjournment</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group row">
                                <label className="col-sm-5">Condition to Appear</label>
                                <div className="col-sm-5">
                                    <input 
                                        type="radio" 
                                        name="is_appear" 
                                        onChange={(e) => setForm({...form, [e.target.name] :1})} 
                                        checked={form.is_appear ? true : false}/> Yes 
                                    <input 
                                        type="radio" 
                                        name="is_appear" 
                                        className="ml-2" 
                                        onChange={(e) => setForm({...form, [e.target.name] :2})} 
                                        checked={!form.is_appear ? true : false}/> No
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group row">
                                <label className="col-sm-4">Condition Place</label>
                                <div className="col-sm-8">
                                    <input 
                                        type="radio" 
                                        name="appear_location" 
                                        onChange={(e) => setForm({...form, [e.target.name]: e.target.value})} 
                                        checked={form.appear_location === 1 ? true : false}/> Court
                                    <input 
                                        type="radio" 
                                        className="ml-2" 
                                        name="appear_location" 
                                        onChange={(e) => setForm({...form, [e.target.name]: 2})} 
                                        checked={appearLocation === 2 ? true : false}/> Police Station
                                </div>
                            </div>
                        </div>
                        { isAppear == 1 && (
                        <>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="">District</label>
                                    <select 
                                        name="district" 
                                        className="form-control"
                                        value={form.district}
                                        onChange={(e) => setForm({...form, [e.target.name]: e.target.value })}
                                    >
                                        <option value="">Select District</option>
                                    </select>
                                </div>
                            </div>
                        { appearLocation == 1 && (
                        <>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="">Establishment</label>
                                    <select 
                                        name="establishment"
                                        className="form-control"
                                        value={form.establishment}
                                        onChange={(e) => setForm({...form, [e.target.name] : e.target.name })}
                                    >
                                        <option value="">Select establishment</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="">Court</label>
                                    <select 
                                        name="court"
                                        className="form-control"
                                        value={form.court}
                                        onChange={(e) => setForm({...form, [e.target.name]: e.target.name})}
                                    >
                                        <option value="">Select court</option>
                                    </select>
                                </div>
                            </div>
                        </>
                        )}
                        { appearLocation == 2 && (
                        <>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="">Police Station</label>
                                    <select 
                                        name="police_station" 
                                        className="form-control"
                                        value={form.police_station}
                                        onChange={(e) => setForm({...form, [e.target.name]: e.target.name })}
                                    >
                                        <option value="">Select station</option>
                                    </select>
                                </div>
                            </div>
                        </>    
                        )}
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="">Condition Time</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        name="condition_time"
                                        value={form.condition_time}
                                        onChange={(e) => setForm({...form, [e.target.name]: e.target.value})} 
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="">Condition Duration</label>
                                    <select 
                                        name="condition_duration"
                                        className="form-control"
                                        value={form.condition_duration}
                                        onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                    >
                                        <option value="">Select station</option>
                                        <option value="1">Until Further Order</option>
                                        <option value="2">Whenever Need</option>
                                    </select>
                                </div>
                            </div>
                        </>
                        )}
                        <div className="col-md-12">
                            <div className="form-group row">
                                <label className="col-sm-2">Bond</label>
                                <div className="col-sm-4">
                                    <input 
                                        type="radio" 
                                        name="is_bond"                                   
                                        className="ml-2" 
                                        onChange={(e) => setForm({...form, [e.target.name] : true})} 
                                        checked={form.is_bond ? true : false}/> Yes
                                    <input 
                                        type="radio" 
                                        name="is_bond"                                   
                                        className="ml-2" 
                                        onChange={(e) => setForm({...form, [e.target.name] : false})} 
                                        checked={!form.is_bond ? true : false}/> No
                                </div>
                                <label className="col-sm-2">Surety</label>
                                <div className="col-sm-4">
                                    <input 
                                        type="radio" 
                                        name="is_surity"                                   
                                        className="ml-2" 
                                        onChange={(e) => setForm({...form, [e.target.name] : true})} 
                                        checked={form.is_surity ? true : false}/> Yes
                                    <input 
                                        type="radio" 
                                        name="is_surity"                                   
                                        className="ml-2" 
                                        onChange={(e) => setForm({...form, [e.target.name] : false})} 
                                        checked={!form.is_surity ? true : false}/> No
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="">Other Condition (if any)</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="other_condition"
                                    value={form.other_condition}
                                    onChange={(e)=>setForm({...form,[e.target.name]:e.target.value})}
                                />
                            </div>
                        </div>
                        { (proceeding == 3 || proceeding == 4) && (
                        <>
                            <div className="col-md-12">
                                <div className="form-group row">
                                    <label htmlFor="" className="col-sm-3 mt-2">Next Date</label>
                                    <div className="col-sm-6">
                                        <input 
                                            type="date" 
                                            className="form-control" 
                                            name="next_date"
                                            onChange={(e) =>setForm({...form,[e.target.name]:e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>    
                        )}
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="">Remarks</label>
                                <textarea 
                                    name="remarks" 
                                    cols="30" 
                                    rows="5" 
                                    className="form-control"
                                    value={form.remarks}
                                    onChange={(e)=>setForm({...form, [e.target.name]:e.target.value})}
                                ></textarea>                
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group text-center">
                                <button 
                                    className="btn btn-success px-3"
                                    onClick={handleSubmit}
                                >Submit</button>
                                <button 
                                    className="btn btn-secondary px-3 ml-1"
                                    onClick={handleReset}
                                >Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Proceeding
