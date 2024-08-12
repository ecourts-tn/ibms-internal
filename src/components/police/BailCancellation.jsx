import React, {useState, useEffect, useRef} from 'react'
import Button from '@mui/material/Button'
import Form from 'react-bootstrap/Form'
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { getStates, getStatesStatus } from '../../redux/features/StateSlice'
import { getDistrictByStateCode } from '../../redux/features/DistrictSlice'
import { getTalukByDistrictCode } from '../../redux/features/TalukSlice'
import { getPoliceSationByDistrict } from '../../redux/features/PoliceStationSlice'
import { getEstablishmentByDistrict } from '../../redux/features/EstablishmentSlice';
import { nanoid } from '@reduxjs/toolkit';
import { getRelations } from '../../redux/features/RelationSlice';
import Select from 'react-select'
import api from '../../api';

const BailCancellation = () => {

    const dispatch = useDispatch()

    const states = useSelector((state) => state.states.states)
    const districts = useSelector((state) => state.districts.districts)
    const taluks = useSelector((state) => state.taluks.taluks)
    const relations = useSelector(state => state.relations.relations)
    const policeStations = useSelector((state) => state.police_stations.police_stations)
    const establishments    = useSelector((state) => state.establishments.establishments)


    const stateStatus = useSelector(getStatesStatus)

    const[searchForm, setSearchForm] = useState({
        state:'',
        district:'',
        police_station:'',
        crime_number:'',
        crime_year:'',
        establishment:'',
        case_type:'',
        case_number:'',
        case_year:''
    })
    const[search, setSearch] = useState(1)
    const[searchErrors, setSearchErrors] = useState([])
    const[form, setForm] = useState({
        state:'',
        district:'',
        police_station:'',
        crime_number:'',
        crime_year:'',
        establishment:'',
        case_type:'',
        case_number:'',
        case_year:''
    })
    const[errors, setErrors] = useState([])

    useEffect(() => {
        if(stateStatus === 'idle'){
          dispatch(getStates())
        }
      },[stateStatus, dispatch])
      
      useEffect(() => {
        if(searchForm.state !== ''){
          dispatch(getDistrictByStateCode(searchForm.state))
        }
      },[searchForm.state, dispatch])
    
      useEffect(() => {
        if(searchForm.district !== ''){
          dispatch(getTalukByDistrictCode(searchForm.district))
        }
      },[form.district, dispatch])

      useEffect(() => {
        if( searchForm.district !== ''){
            dispatch(getEstablishmentByDistrict(searchForm.district))
        }
    },[searchForm.district, dispatch])
     
      useEffect(() => {
        dispatch(getRelations())
      }, [dispatch])
    
      useEffect(() => {
        if(searchForm.district){
            dispatch(getPoliceSationByDistrict(searchForm.district))
        }
    }, [searchForm.district, dispatch])
    const[accused, setAccused] = useState([])
    
    const handleSearch = async(e) => {
        e.preventDefault()
        if(search === 1){
            // crime number search
            const response = await api.post('api/police/search/crime/', searchForm)
            if(response.status === 200){
                setAccused(response.data)
            }
        }else{
            //case number search
            const response = await api.post('api/police/search/case/', searchForm)
            if(response.status === 200){
                setAccused(response.data)
            }
        }
        

    }

    const handleSubmit = () => {

    }

    const accusedOptions =  [
        {
            value : "1",
            label : "Accused One"
        },
        {
            value : "2",
            label : "Accused Two"
        }
    ]

    return (
        <>
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <ol className="breadcrumb mt-2">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item"><a href="#">Police</a></li>
                                <li className="breadcrumb-item"><a href="#">Bail</a></li>
                                <li className="breadcrumb-item active">Cancellation</li>
                            </ol>
                        </div>
                        <div className="col-md-12">
                            <div className="card card-outline card-primary" style={{minHeight:'700px'}}>
                                <div className="card-header">
                                    <strong>Cancellation of Bail</strong>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">
                                            <div className="row">
                                                <div className="col-md-12 text-center">
                                                    <div className="form-group">
                                                        <div>
                                                            <div className="icheck-primary d-inline mx-2">
                                                            <input 
                                                                type="radio" 
                                                                name="search" 
                                                                id="searchYes" 
                                                                value={search}
                                                                checked={ parseInt(search) === 1 ? true : false}
                                                                onChange={(e) => setSearch(1)} 
                                                            />
                                                            <label htmlFor="searchYes">Search by Crime Number</label>
                                                            </div>
                                                            <div className="icheck-primary d-inline mx-2">
                                                            <input 
                                                                type="radio" 
                                                                id="searchNo" 
                                                                name="search" 
                                                                value={search}
                                                                checked={ parseInt(search) === 2 ? true : false } 
                                                                onChange={(e) => setSearch(2)}
                                                            />
                                                            <label htmlFor="searchNo">Search by Case Number</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-10 offset-1">
                                                    <form action="">
                                                        { parseInt(search) === 1 && (
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <label htmlFor="state">State</label>
                                                                <select 
                                                                    name="state" 
                                                                    id="state" 
                                                                    className={ `form-control ${errors.state ? 'is-invalid': ''}`}
                                                                    value={searchForm.state}
                                                                    onChange={(e) => setSearchForm({...searchForm, [e.target.name]: e.target.value })}    
                                                                >
                                                                <option value="">Select state</option>
                                                                { states.map((item, index) => (
                                                                    <option key={index} value={item.state_code }>{ item.state_name }</option>
                                                                ))}
                                                                </select>
                                                                <div className="invalid-feedback">
                                                                    { errors.state }
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label htmlFor="district">District</label><br />
                                                                    <select 
                                                                        name="district" 
                                                                        id="district" 
                                                                        className={`form-control ${errors.district ? 'is-invalid' : ''}`}
                                                                        value={searchForm.district} 
                                                                        onChange={(e) => setSearchForm({...searchForm, [e.target.name]: e.target.value })}
                                                                    >
                                                                        <option value="">Select district</option>
                                                                        { districts.map((item, index) => (
                                                                        <option key={index} value={item.district_code }>{ item.district_name }</option>
                                                                        ))}
                                                                    </select>
                                                                    <div className="invalid-feedback">
                                                                        { errors.district }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label htmlFor="police_station">Police Station Name</label><br />
                                                                <select 
                                                                    name="police_station" 
                                                                    id="police_station" 
                                                                    className={`form-control ${errors.police_station ? 'is-invalid' : ''}`}
                                                                    value={searchForm.police_station}
                                                                    onChange={(e)=> setSearchForm({...searchForm, [e.target.name]: e.target.value })}
                                                                >
                                                                    <option value="">Select station</option>
                                                                    { policeStations.map((item, index) => (
                                                                        <option key={index} value={item.id}>{ item.station_name}</option>
                                                                    ))}
                                                                </select>
                                                                <div className="invalid-feedback">{ errors.police_station }</div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-2 offset-md-4">
                                                                <div className="form-group">
                                                                    <label htmlFor="case_number">Crime Number</label>
                                                                    <input 
                                                                        type="text" 
                                                                        className={`form-control ${searchErrors.crime_number ? 'is-invalid' : ''}`} 
                                                                        name="crime_number"
                                                                        value={searchForm.crime_number}
                                                                        onChange={(e) => setSearchForm({...searchForm, [e.target.name]: e.target.value })}
                                                                    />
                                                                    <div className="invalid-feedback">
                                                                        { searchErrors.crime_number }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <div className="form-group">
                                                                    <label htmlFor="crime_year">Crime Year</label>
                                                                    <input 
                                                                        type="text" 
                                                                        className={`form-control ${searchErrors.crime_year ? 'is-invalid' : ''}`}
                                                                        name="crime_year"
                                                                        value={searchForm.crime_year}
                                                                        onChange={(e) => setSearchForm({...searchForm, [e.target.name]: e.target.value })}
                                                                    />
                                                                    <div className="invalid-feedback">
                                                                        { searchErrors.crime_year }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        )}
                                                        { parseInt(search) === 2 && (
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <label htmlFor="state">State</label>
                                                                <select 
                                                                    name="state" 
                                                                    id="state" 
                                                                    className={ `form-control ${errors.state ? 'is-invalid': ''}`}
                                                                    value={searchForm.state}
                                                                    onChange={(e) => setSearchForm({...searchForm, [e.target.name]: e.target.value })}    
                                                                >
                                                                <option value="">Select state</option>
                                                                { states.map((item, index) => (
                                                                    <option key={index} value={item.state_code }>{ item.state_name }</option>
                                                                ))}
                                                                </select>
                                                                <div className="invalid-feedback">
                                                                    { errors.state }
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label htmlFor="district">District</label><br />
                                                                    <select 
                                                                        name="district" 
                                                                        id="district" 
                                                                        className={`form-control ${errors.district ? 'is-invalid' : ''}`}
                                                                        value={searchForm.district} 
                                                                        onChange={(e) => setSearchForm({...searchForm, [e.target.name]: e.target.value })}
                                                                    >
                                                                        <option value="">Select district</option>
                                                                        { districts.map((item, index) => (
                                                                        <option key={index} value={item.district_code }>{ item.district_name }</option>
                                                                        ))}
                                                                    </select>
                                                                    <div className="invalid-feedback">
                                                                        { errors.district }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-5">
                                                                <div className="form-group">
                                                                    <label htmlFor="establishment">Establishment Name</label>
                                                                    <select 
                                                                        name="establishment" 
                                                                        id="establishment" 
                                                                        className={`form-control ${errors.establishment ? 'is-invalid' : null}`}
                                                                        value={searchForm.establishment}
                                                                        onChange={(e) => setSearchForm({...searchForm, [e.target.name]:e.target.value})}
                                                                    >
                                                                        <option value="">Select Establishment</option>
                                                                        {
                                                                            establishments.filter((establishment) => {
                                                                                return establishment.bail_filing && establishment.display
                                                                            })
                                                                            .map((item, index) => (
                                                                                <option value={item.establishment_code} key={index}>{item.establishment_name}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                    <div className="invalid-feedback">
                                                                        { errors.establishment }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3 offset-md-3">
                                                                <div className="form-group">
                                                                    <label htmlFor="case_type">Case Type</label>
                                                                    <select 
                                                                        name="case_type" 
                                                                        className={`form-control ${searchErrors.case_type ? 'is-invalid' : ''}`} 
                                                                        value={searchForm.case_type}
                                                                        onChange={(e) => setSearchForm({...searchForm, [e.target.name]: e.target.value })}
                                                                    >
                                                                        <option value="">Select Case Type</option>
                                                                        <option value="1">Bail Petition</option>
                                                                    </select>
                                                                    <div className="invalid-feedback">
                                                                        { searchErrors.case_type }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <div className="form-group">
                                                                    <label htmlFor="case_number">Case Number</label>
                                                                    <input 
                                                                        type="text" 
                                                                        className={`form-control ${searchErrors.case_number ? 'is-invalid' : ''}`} 
                                                                        name="case_number"
                                                                        value={searchForm.case_number}
                                                                        onChange={(e) => setSearchForm({...searchForm, [e.target.name]: e.target.value })}
                                                                    />
                                                                    <div className="invalid-feedback">
                                                                        { searchErrors.case_number }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <div className="form-group">
                                                                    <label htmlFor="case_year">Year</label>
                                                                    <input 
                                                                        type="text" 
                                                                        className={`form-control ${searchErrors.case_year ? 'is-invalid' : ''}`}
                                                                        name="case_year"
                                                                        value={searchForm.case_year}
                                                                        onChange={(e) => setSearchForm({...searchForm, [e.target.name]: e.target.value })}
                                                                    />
                                                                    <div className="invalid-feedback">
                                                                        { searchErrors.case_year }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        )}
                                                        <div className="row">
                                                            <div className="col-md-12 d-flex justify-content-center">
                                                                <Button
                                                                    variant='contained'
                                                                    type="submit"
                                                                    color="primary"
                                                                    onClick={handleSearch}
                                                                >Search</Button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <div className="form-group row">
                                                <label htmlFor="" className="col-sm-1">Select Accused</label>
                                                <div className="col-sm-4">
                                                    <Select 
                                                        isMulti={true}
                                                        name="district"
                                                        options={accusedOptions}
                                                        className={`${errors.district ? 'is-invalid' : null}`}
                                                        onChange={(e) => {}}
                                                    />
                                                    <div className="invalid-feedback">
                                                        { errors.district }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">  
                                        <div className="col-md-3">
                                            <Form.Group className="mb-3">
                                                <Form.Label>Name of the searchFormer</Form.Label>
                                                <Form.Control
                                                    name="searchFormer_name" 
                                                    className={`${errors.searchFormer_name ? 'is-invalid' : ''}`}
                                                    value={form.searchFormer_name} 
                                                    onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                ></Form.Control>
                                                <div className="invalid-feedback">{ errors.searchFormer_name }</div>
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-3">
                                            <Form.Group>
                                                <Form.Label>Designation</Form.Label>
                                                <Form.Control
                                                    name="designation"
                                                    value={form.designation}
                                                    onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                ></Form.Control>
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-2">
                                            <Form.Group className="mb-3">
                                                <Form.Label>Gender</Form.Label>
                                                <select 
                                                    name="gender" 
                                                    value={form.gender} 
                                                    className="form-control"
                                                >
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-2">
                                            <Form.Group className="mb-3">
                                                <Form.Label>Age</Form.Label>
                                                <Form.Control
                                                    name="age"
                                                    value={form.age}
                                                    className={`${errors.age ? 'is-invalid' : ''}`}
                                                    onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                ></Form.Control>
                                                <div className="invalid-feedback">{ errors.age }</div>
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="form-group mb-3">
                                                <label htmlFor="relation">Relation</label><br />
                                                <select 
                                                name="relation" 
                                                id="relation" 
                                                className={`form-control ${errors.relation ? 'is-invalid' : ''}`}
                                                value={form.relation}
                                                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                >
                                                <option value="">Select relation</option>
                                                { relations.map((item, index) => (
                                                    <option key={index} value={item.relation_name}>{ item.relation_name }</option>
                                                )) }
                                                </select>
                                                <div className="invalid-feedback">{ errors.relation }</div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <Form.Group className="mb-3">
                                                <Form.Label>Relation Name</Form.Label>
                                                <Form.Control
                                                    name="relation_name"
                                                    value={form.relation_name}
                                                    className={`${errors.relation_name ? 'is-invalid' : ''}`}
                                                    onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                ></Form.Control>
                                                <div className="invalid-feedback">{ errors.relation_name }</div>
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="state">State</label><br />
                                                <select 
                                                    name="state" 
                                                    id="state" 
                                                    className="form-control"
                                                    value={form.state}
                                                    onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                >
                                                    <option value="">Select state</option>
                                                    { states.map((item, index) => (
                                                    <option value={item.state_code} key={index}>{item.state_name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="district">District</label><br />
                                                <select 
                                                    name="district" 
                                                    id="district" 
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
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="taluk">Taluk</label><br />
                                                <select 
                                                    name="taluk" 
                                                    id="taluk" 
                                                    className="form-control"
                                                    value={form.taluk}
                                                    onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                >
                                                    <option value="">Select Taluk</option>
                                                    { taluks.map((item, index) => (
                                                    <option value={item.taluk_code} key={index}>{ item.taluk_name }</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Group className="mb-3">
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control
                                                    name="address"
                                                    value={form.address}
                                                    className={`${errors.address ? 'is-invalid' : ''}`}
                                                    onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                ></Form.Control>
                                                <div className="invalid-feedback">{ errors.address }</div>
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-2">
                                            <Form.Group>
                                                <Form.Label>Post Office</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="post_office"
                                                    value={form.post_office}
                                                    onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                ></Form.Control>
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-2">
                                            <Form.Group className="mb-3">
                                                <Form.Label>Pincode</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="pincode"
                                                    value={form.pincode}
                                                    onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                ></Form.Control>
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-2">
                                            <Form.Group>
                                                <Form.Label>Mobile Number</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="mobile_number"
                                                    className={`${errors.mobile_number ? 'is-invalid' : ''}`}
                                                    value={form.mobile_number}
                                                    onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                ></Form.Control>
                                                <div className="invalid-feedback">
                                                { errors.mobile_number}
                                                </div>
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-2">
                                            <Form.Group>
                                                <Form.Label>Email Address</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="email_address"
                                                    value={form.email_address}
                                                    className={`${errors.email_address ? 'is-invalid' : ''}`}
                                                    onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                                                ></Form.Control>
                                                <div className="invalid-feedback">{ errors.email_address }</div>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="">Grounds</label>
                                                <textarea name="" id="" cols="30" rows="5" className="form-control"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <Button
                                                variant='contained'
                                                color='success'
                                            >Submit</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BailCancellation