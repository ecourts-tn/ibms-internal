import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import TextField  from '@mui/material/TextField'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { toast, ToastContainer } from 'react-toastify';
import api from '../api'

import { getUserTypes, getUserTypeStatus } from '../redux/features/UserTypeSlice'
import { getStates, getStatesStatus } from '../redux/features/StateSlice'
import { getDistrictByStateCode } from '../redux/features/DistrictSlice'
import { getCourtsByEstablishmentCode } from '../redux/features/CourtSlice';
import { getEstablishmentByDistrict } from '../redux/features/EstablishmentSlice';
import { getPoliceSationByDistrict } from '../redux/features/PoliceStationSlice'
import { getPrisonsByDistrict } from '../redux/features/PrisonSlice'

const Registration = () => {
    const dispatch = useDispatch()
    const initialState = {
        user_type: '',
        login_name: '',
        gender:1,
        date_of_birth:'',
        litigation_place: 2,
        state: '',
        district: '',
        establishment: '',
        police_station:'',
        prison:'',
        court: '',
        password: '',
        confirm_password:'',
        mobile: '',
        email: ''
    }
    const[form, setForm] = useState(initialState)

    const handleSubmit = async() => {
        try{
            const response = await api.post("auth/user/register/", form)
            if(response.status === 201){
                toast.success("User registered successfully", {
                    theme:"colored"
                })
                setForm(initialState)
            }
        }
        catch(error){
            const errors = error.response.data 
            for(const err in errors){
                toast.error(`${err.toUpperCase()} - ${errors[err]}`, {
                    theme: "colored"
                })
            }

        }
    }
    const[usertypes, setUserTypes] = useState([])
    // const usertypes = useSelector((state) => state.usertypes.usertypes)
    const states    = useSelector((state) => state.states.states)
    const districts = useSelector((state) => state.districts.districts)
    const establishments = useSelector((state) => state.establishments.establishments)
    const courts    = useSelector((state) => state.courts.courts)
    const policeStations = useSelector((state) => state.police_stations.police_stations)
    const prisons = useSelector((state) => state.prisons.prisons)
    const userTypeStatus = useSelector(getUserTypeStatus)
    const stateStatus = useSelector(getStatesStatus)

    useEffect(() => {
        if(userTypeStatus === 'idle'){
            dispatch(getUserTypes())
        }
    }, [userTypeStatus, dispatch])

    useEffect(() => {
        if(stateStatus === 'idle'){
            dispatch(getStates())
        }
    },[getStates, dispatch])

    useEffect(() => {
    if(form.state !== ''){
        dispatch(getDistrictByStateCode(form.state))
    }
    }, [form.state, dispatch])
    
    useEffect(() => {
        if( form.district !== ''){
            dispatch(getEstablishmentByDistrict(form.district))
            dispatch(getPoliceSationByDistrict(form.district))
            dispatch(getPrisonsByDistrict(form.district))
        }
    },[form.district, dispatch])

    useEffect(() => {
        if(form.establishment !== ''){
            dispatch(getCourtsByEstablishmentCode(form.establishment))
        }
    },[form.establishment, dispatch])

    useEffect(() => {
        const fetchData = async() => {
          const response = await api.get("base/user-type/")
          if(response.status === 200){
            setUserTypes(response.data)
          }
        }
        fetchData()
      },[])
    

    return (
        <>
            <ToastContainer />
            <div className="content-wrapper">
                <div className="container-fluid mt-3">
                    <div className="card card-outline card-primary">
                        <div className="card-header">
                            <h3 className="card-title"><i className="fas fa-users mr-2"></i><strong>User Registration</strong></h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group row mb-3">
                                            <label htmlFor="" className="col-sm-3">Usertype</label>
                                            <div className="col-sm-6">
                                                <select 
                                                    name="user_type" 
                                                    className="form-control"
                                                    value={form.user_type}
                                                    onChange={(e) => setForm({...form, [e.target.name]: e.target.value })}
                                                >
                                                    <option value="">Select usertype</option>
                                                    {
                                                        usertypes.map((type, index) => (
                                                            <option value={type.id} key={index}>{ type.user_type}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group row mb-3">
                                            <label htmlFor="" className="col-sm-3">Username</label>
                                            <div className="col-sm-6">
                                                <input 
                                                    type="text" 
                                                    name="username" 
                                                    value={form.username}
                                                    className="form-control" 
                                                    onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row mb-3">
                                            <label htmlFor="" className="col-sm-3 col-form-label">Gender</label>
                                            <div className="col-md-9">
                                                <FormControl>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="gender-radios"
                                                        name="gender"
                                                        value={form.gender}
                                                        onChange={(e) => setForm({...form, [e.target.name]:e.target.value})}
                                                    >
                                                        <FormControlLabel value={1} control={<Radio />} label="Male" />
                                                        <FormControlLabel value={2} control={<Radio />} label="Female" />
                                                        <FormControlLabel value={3} control={<Radio />} label="Other" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        </div>
                                        <div className="from-group row mb-3">
                                            <label htmlFor="" className="col-sm-3">Date of Birth</label>
                                            <div className="col-sm-3">
                                                <input 
                                                    type="date" 
                                                    className="form-control" 
                                                    name="date_of_birth"
                                                    value={form.date_of_birth}
                                                    onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        { parseInt(form.user_type) === 1 && (
                                            <div className="form-group row mb-3">
                                                <label htmlFor="#" className="col-sm-3 col-form-label">Bar Registration Number</label>
                                                <div className="col-sm-9">
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <TextField 
                                                                id="bar_code" 
                                                                label="State Code" 
                                                                name="bar_code"
                                                                value={form.bar_code}
                                                                size="small"
                                                                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                            />
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <TextField 
                                                                id="reg_number" 
                                                                label="Reg. No." 
                                                                name="reg_number"
                                                                size="small"
                                                                value={form.reg_number}
                                                                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                            />
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <TextField 
                                                                id="reg_year" 
                                                                label="Reg. Year" 
                                                                name="reg_year"
                                                                size="small"
                                                                value={form.reg_year}
                                                                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        { parseInt(form.litigation_place) === 2 && (
                                            <>
                                            <div className="form-group row mb-3">
                                                <label htmlFor="state" className='col-form-label col-sm-3'>State</label>
                                                <div className="col-sm-6">
                                                    <select 
                                                        name="state" 
                                                        className="form-control"
                                                        value={form.state}
                                                        onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                    >
                                                        <option value="">Select State</option>
                                                        { states.map((item, index) => (
                                                            <option value={item.state_code} key={index}>{item.state_name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row mb-3">
                                                <label htmlFor="district" className='col-form-label col-sm-3'>District</label>
                                                <div className="col-sm-6">
                                                    <select 
                                                        name="district" 
                                                        className="form-control"
                                                        value={form.district}
                                                        onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                    >
                                                        <option value="">Select District</option>
                                                        { districts.map((item, index) => (
                                                            <option value={item.district_code} key={index}>{item.district_name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row mb-3">
                                                <label htmlFor="establishment" className='col-form-label col-sm-3'>Estatblishment</label>
                                                <div className="col-sm-9">
                                                    <select 
                                                        name="establishment" 
                                                        className="form-control"
                                                        value={form.establishment}
                                                        onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                    >
                                                        <option value="">Select Establishment</option>
                                                        { establishments.map((item, index) => (
                                                            <option value={item.establishment_code} key={index}>{item.establishment_name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row mb-3">
                                                <label htmlFor="court" className='col-form-label col-sm-3'>Court</label>
                                                <div className="col-sm-6">
                                                    <select 
                                                        name="court" 
                                                        className="form-control"
                                                        value={form.court}
                                                        onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                    >
                                                        <option value="">Select Court</option>
                                                        { courts.map((item, index) => (
                                                            <option value={item.court_code} key={index}>{item.court_name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            </>
                                        )}
                                        { parseInt(form.user_type) === 5 && (
                                        <div className="form-group row mb-3">
                                            <label htmlFor="police_station" className='col-form-label col-sm-3'>Police Station</label>
                                            <div className="col-sm-6">
                                                <select 
                                                    name="police_station" 
                                                    id="police_station" 
                                                    className="form-control"
                                                    value={form.police_station}
                                                    onChange={(e) => setForm({...form, [e.target.name]: e.target.event})}
                                                >
                                                    <option value="">Select Police station</option>
                                                    { policeStations.map((station, index) => (
                                                        <option key={index} value={station.station_code }>{ station.station_name }</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        )}
                                        { parseInt(form.user_type) === 4 && (
                                            <div className="form-group row mb-3">
                                                <label htmlFor="prison" className='col-form-label col-sm-3'>Prison Name</label>
                                            <div className="col-sm-6">
                                                <select 
                                                    name="prison" 
                                                    id="prison" 
                                                    className="form-control"
                                                    value={form.prison}
                                                    onChange={(e) => setForm({...form, [e.target.name]: e.target.value})} 
                                                >
                                                    <option value="">Select Prison</option>
                                                    { prisons.map((prison, index) => (
                                                        <option key={index} value={prison.id }>{ prison.prison_name }</option>
                                                    ))}
                                                </select>
                                            </div>
                                            </div>
                                        )}
                                        <div className="form-group row">
                                            <label className="col-form-label col-sm-3 pt-0">Password</label>
                                            <div className="col-sm-6">
                                                <FormControl fullWidth className="mb-3">
                                                    <TextField
                                                        type="password"
                                                        name="password"
                                                        label="Password"
                                                        size="small"
                                                        value={form.password}
                                                        onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                    />
                                                </FormControl>
                                            </div> 
                                        </div>
                                        <div className="form-group row" style={{ marginTop:"-20px"}}>
                                            <div className="col-sm-3"></div>   
                                            <div className="col-sm-9">
                                                <small className="text-danger">
                                                    <ul style={{ marginLeft:"-25px"}}>
                                                        <li>Your password can't be too similar to your other personal information.</li>
                                                        <li>Your password must contain at least 8 characters.</li>
                                                        <li>Your password can't be a commonly used password.</li>
                                                        <li>Your password can't be entirely numeric.</li>
                                                    </ul>
                                                </small> 
                                            </div>
                                        </div>
                                        <div className="form-group row mb-3">
                                            <label className="col-form-label col-sm-3 pt-0">Confirm Password</label>
                                            <div className="col-sm-6">
                                                <FormControl fullWidth className="mb-3">
                                                    <TextField
                                                        type="password" 
                                                        name="confirm_password" 
                                                        size="small"
                                                        label="Confirm Password" 
                                                        value={form.confirm_password}
                                                        onChange={(e) => setForm({...form, [e.target.name]: e.target.value })}
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                        <div className="form-group row mb-3">
                                            <label className="col-form-label col-sm-3">Mobile Number</label>
                                            <div className="col-sm-4">
                                                <FormControl className="mb-3" fullWidth>
                                                    <TextField 
                                                        type="text" 
                                                        name="mobile" 
                                                        size="small"
                                                        label="Mobile Number"
                                                        value={form.mobile}
                                                        onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                        <div className="form-group row mb-3">
                                            <label className="col-form-label col-sm-3">Email Address</label>
                                            <div className="col-sm-4">
                                                <input 
                                                    type="email" 
                                                    name="email" 
                                                    className="form-control" 
                                                    value={form.email}
                                                    onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="form-group row mb-3">
                                            <label htmlFor="photo" className='col-form-label col-sm-3'>Upload Photo</label>
                                            <div className="col-sm-9">
                                                <Button
                                                    component="label"
                                                    role={undefined}
                                                    variant="contained"
                                                    color="secondary"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}
                                                    >
                                                    Upload file
                                                    <VisuallyHiddenInput 
                                                        type="file" 
                                                        name="profile_photo"
                                                        onChange={(e) => setForm({...form, [e.target.name]: e.target.files[0]})}
                                                    />
                                                </Button>
                                                <span className="mx-2">{ form.profile_photo.name}</span>
                                            </div>
                                        </div>
                                        <div className="form-group row mb-3">
                                            <label htmlFor="address_proof" className='col-form-label col-sm-3'>Identity Proof</label>
                                            <div className="col-sm-9">
                                                <Button
                                                    component="label"
                                                    role={undefined}
                                                    variant="contained"
                                                    color="secondary"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}
                                                    >
                                                    Upload file
                                                    <VisuallyHiddenInput 
                                                        type="file"
                                                        name="identity_proof"
                                                        onChange={(e) => setForm({...form, [e.target.name] : e.target.files[0]})} 
                                                    />
                                                </Button>
                                                <span className="mx-2">{ form.identity_proof.name }</span>
                                            </div>
                                        </div>
                                        { form.user_type === 1 && (
                                        <div className="form-group row mb-3">
                                            <label htmlFor="bar_certificate" className='col-form-label col-sm-3'>Bar Registration Certificate</label>
                                            <div className="col-sm-9">
                                                <Button
                                                    component="label"
                                                    role={undefined}
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    color="secondary"
                                                    startIcon={<CloudUploadIcon />}
                                                    >
                                                    Upload file
                                                    <VisuallyHiddenInput 
                                                        type="file"
                                                        name="registration_certificate"
                                                        onChange={(e) => setForm({...form, [e.target.name]: e.target.files[0]})} 
                                                    />
                                                </Button>
                                                <span className="mx-2">{ form.registration_certificate.name }</span>
                                            </div>
                                        </div>
                                        )} */}
                                        <div className="d-flex justify-content-center mt-2">
                                            <Button
                                                variant="contained"
                                                color="success"
                                                startIcon={<PersonAddIcon />}
                                                onClick={handleSubmit}
                                            >
                                                Register
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>    
        </>
    )
}

export default Registration