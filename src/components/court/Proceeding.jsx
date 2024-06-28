import React, {useState, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import api from '../../api'

const Proceeding = ({cino}) => {

    const[petition, setPetition] = useState({})
    const initialState = {
        petition: '',
        case_number: '',
        proceeding: '',
        condition: false,
        surety_required: false,
        appear_location: '',
        district: '',
        establishment: '',
        court_no:'',
        condition_time:'',
        condition_duration:'',
        is_bond:false,
        is_surity:false,
        no_of_surety: 2,
        other_condition: '',
        todays_date: '',
        next_date:null,
        order_date: '',
        order_remarks: '',
    }
    const[form, setForm] = useState(initialState)

    useEffect(() => {
        async function fetchData(){
            if(cino && cino!== ''){
                try{
                    const response = await api.get(`api/bail/petition/detail/`, { data: {cino:cino}})
                    if(response.status === 200){
                        setPetition(response.data)
                        setForm({
                            ...form, 
                            petition: response.data.petition.cino,
                            case_number: response.data.petition.case_no,
                            district: response.data.petition.district.district_code,
                            establishment: response.data.petition.establishment.establishment_code,
                            court_no: response.data.petition.court.court_code
                        })
                    }
                }catch(error){
                    console.log(error)
                }
            }
        }
        fetchData();
    },[form, cino])

    // console.log(petition)

    const handleSubmit = async () => {
        try{
            const response = await api.post("api/bail/daily-proceeding/create/", form)
            if(response.status === 201){
                toast.success("Proceedings details added successfully", {
                    theme: "colored"
                })
                setForm(initialState)
            }
        }catch(error){
            if(error.response.status === 400){
                console.log("error")
                toast.error("Something went wrong",{
                    theme:"colored"
                })
            }

        }
    }

    const handleReset = () => {
        setForm(initialState)
    }

    return (
        <>
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-info">
                    <strong>Case Proceedings</strong>
                </div>
                <div className="card-body" style={{ height:'600px', overflowY:"scroll"}}>
                    { Object.keys(petition).length > 0 && (
                        <>
                            <input 
                                type="hidden" 
                                name="petition"
                                value={petition}
                            />
                            <input 
                                type="hidden"
                                name="establishment"
                                value={form.establishment} 
                            />
                            <input 
                                type="hidden"
                                name="court"
                                value={form.court} 
                            />
                        </>
                    )}
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
                            <div className="form-group">
                                <label htmlFor="proceeding">Select Accused</label>
                                <select 
                                    name="proceeding" 
                                    value={form.proceeding} 
                                    className="form-control" 
                                    onChange={(e) => setForm({...form, [e.target.name]:e.target.value})}
                                >
                                    <option value="">Select Proceeding</option>
                                    <option value="1">Test 1</option>
                                    <option value="2">Test 2</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group row">
                                <label className="col-sm-3">Condition</label>
                                <div className="col-sm-9">
                                    <div className="icheck-success d-inline mx-2">
                                        <input 
                                            type="radio" 
                                            id="radioPrimary1" 
                                            name="condition" 
                                            onChange={(e) => setForm({...form, [e.target.name] : true})} 
                                            checked={form.condition ? true : false}
                                        />
                                        <label htmlFor="radioPrimary1">Yes</label>
                                    </div>
                                    <div className="icheck-danger d-inline mx-2">
                                        <input 
                                            type="radio" 
                                            id="radioPrimary2" 
                                            name="condition" 
                                            onChange={(e) => setForm({...form, [e.target.name] : false})} 
                                            checked={!form.condition ? true : false}/>
                                        <label htmlFor="radioPrimary2">No</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group row">
                                <label className="col-sm-3">Surety Required</label>
                                <div className="col-sm-9">
                                    <div className="icheck-success d-inline mx-2">
                                        <input 
                                            type="radio" 
                                            id="radioSurety1" 
                                            name="surety_required" 
                                            onChange={(e) => setForm({...form, [e.target.name] : true})} 
                                            checked={form.surety_required ? true : false}
                                        />
                                        <label htmlFor="radioSurety1">Yes</label>
                                    </div>
                                    <div className="icheck-danger d-inline mx-2">
                                        <input 
                                            type="radio" 
                                            id="radioSurety2" 
                                            name="surety_required" 
                                            onChange={(e) => setForm({...form, [e.target.name] : false})} 
                                            checked={!form.surety_required ? true : false}/>
                                        <label htmlFor="radioSurety2">No</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group row">
                                <label htmlFor="" className="col-sm-3"></label>
                                <div className="col-sm-2">
                                    <div className="icheck-primary d-inline ml-2">
                                        <input type="checkbox" id="checkboxPrimary1" defaultChecked />
                                        <label htmlFor="checkboxPrimary1">Own</label>
                                    </div>
                                </div>
                                <label htmlFor="" className="col-sm-3">No of Surety</label>
                                <div className="col-sm-2">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="no_of_surety"
                                        value={form.no_of_surety} 
                                        onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group row">
                                <label htmlFor="" className="col-sm-4">Surety Bond of Rs.</label>
                                <div className="col-sm-3">
                                    <input type="text" className="form-control" />
                                </div>
                                {/* <div className="col-sm-2">
                                    <div className="icheck-secondary d-inline ml-2">
                                        <input type="checkbox" id="checkboxPrimary1"/>
                                        <label htmlFor="checkboxPrimary1">Cash</label>
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <div className="icheck-secondary d-inline ml-2">
                                        <input type="checkbox" id="checkboxPrimary1"/>
                                        <label htmlFor="checkboxPrimary1">Bond</label>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group row">
                                <label className="col-sm-4">Condition Place</label>
                                <div className="col-sm-8">
                                    <select 
                                        name="appear_location" 
                                        className="form-control"
                                        value={form.appear_location}
                                        onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                    >
                                        <option value="">Select Place</option>
                                        <option value="1">Court</option>
                                        <option value="2">Police Station</option>
                                        <option value="3">Other</option>
                                    </select>
                                </div>
                                {/* <div className="col-sm-8">
                                    <div className="icheck-primary d-inline mx-2">
                                        <input 
                                            type="radio" 
                                            name="appear_location" 
                                            id="appearLocation1"
                                            onClick={(e) => setForm({...form, [e.target.name]: 1})} 
                                            checked={form.appear_location === 1 ? true : false}
                                        /> 
                                        <label htmlFor="appearLocation1">Court</label>
                                    </div>
                                    <div className="icheck-primary d-inline mx-2">
                                        <input 
                                            type="radio" 
                                            className="ml-2" 
                                            name="appear_location" 
                                            id="appearLocation2"
                                            onClick={(e) => setForm({...form, [e.target.name]: 2})} 
                                            checked={form.appear_location === 2 ? true : false}/> 
                                        <label htmlFor="appearLocation2">Police Station</label>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        { form.condition === 1 && (
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
                        { parseInt(form.appear_location) === 1 && (
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
                        { parseInt(form.appear_location) === 2 && (
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
                                    <div className="icheck-success d-inline mx-2">
                                        <input 
                                            type="radio" 
                                            name="is_bond"                                   
                                            className="ml-2" 
                                            id="isBondYes"
                                            onChange={(e) => setForm({...form, [e.target.name] : true})} 
                                            checked={form.is_bond ? true : false}/> 
                                        <label htmlFor="isBondYes">Yes</label>
                                    </div>
                                    <div className="icheck-danger d-inline mx-2">
                                        <input 
                                            type="radio" 
                                            name="is_bond"                                   
                                            className="ml-2" 
                                            id="isBondNo"
                                            onChange={(e) => setForm({...form, [e.target.name] : false})} 
                                            checked={!form.is_bond ? true : false}/> 
                                        <label htmlFor="isBondNo">No</label>
                                    </div>
                                </div>
                                <label className="col-sm-2">Surety</label>
                                <div className="col-sm-4">
                                    <div className="icheck-success d-inline mx-2">
                                        <input 
                                            type="radio" 
                                            name="is_surity"                                   
                                            className="ml-2" 
                                            id="isSurityYes"
                                            onChange={(e) => setForm({...form, [e.target.name] : true})} 
                                            checked={form.is_surity ? true : false}/> 
                                        <label htmlFor="isSurityYes">Yes</label>
                                    </div>
                                    <div className="icheck-danger d-inline mx-2">
                                        <input 
                                            type="radio" 
                                            name="is_surity"                                   
                                            className="ml-2" 
                                            id="isSurityNo"
                                            onChange={(e) => setForm({...form, [e.target.name] : false})} 
                                            checked={!form.is_surity ? true : false}/> 
                                        <label htmlFor="isSurityNo">No</label>
                                    </div>
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
                        { (parseInt(form.proceeding) === 3 || parseInt(form.proceeding) === 4) && (
                        <>
                            <div className="col-md-12">
                                <div className="form-group row">
                                    <label htmlFor="" className="col-sm-2 mt-2">Next Date</label>
                                    <div className="col-sm-4">
                                        <input 
                                            type="date" 
                                            className="form-control" 
                                            name="next_date"
                                            value={form.next_date}
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
                                    name="order_remarks" 
                                    cols="30" 
                                    rows="5" 
                                    className="form-control"
                                    value={form.order_remarks}
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
