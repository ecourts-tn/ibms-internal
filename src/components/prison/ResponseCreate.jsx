import React from 'react'
import { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom';

import Button from '@mui/material/Button'
import api from '../../api'
import { toast, ToastContainer } from 'react-toastify';

const ResponseCreate = () => {
    const {state} = useLocation()
    const[petition, setPetition] = useState({
        filing_type: {}
    })
    const[accused, setAccused] = useState([])
    const[proceeding, setProceeding] = useState({})
    const[order, setOrder] = useState({})
    const initialState = {
        is_released: false,
        released_time: '',
        remarks: ''
    }
    
    const[form, setForm] = useState(initialState)

    useEffect(() => {
        async function fetchData(){
            const response = await api.get(`api/prison/filing/detail/`, {params:{efile_no:state.efile_no}})
            if(response.status === 200){
                setForm({
                    ...form,
                    efile_no: response.data.petition.efile_no
                })
                setPetition(response.data.petition)
                setAccused(response.data.litigant)
                setProceeding(response.data.proceeding)
                setOrder(response.data.order)
            }
        }
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await api.post("api/bail/police/response/create/", form)
            if(response.status === 201){
                toast.success("Response added successfully", {
                    theme: "colored"
                })
                setForm(initialState)
            }
        }catch(error){
            console.log(error)
        }
    }

    const doNothing = () => {

    }

    return (
    <>
        <ToastContainer />
        <div className="content-wrapper">
        <div className="container-fluid mt-3">
            <div className="card card-outline card-primary">
                <div className="card-header">
                    <h3 className="card-title"><i className="fas fa-edit mr-2"></i><strong>Prison Response</strong></h3>
                </div>
                <div className="card-body">
                    
                    <div id="accordion">
                        <div className="card m-1">
                            <div className="card-header" id="headingOne">
                                <a data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" href="/#">Court Proceedings</a>
                            </div>
                            <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                ...
                            </div>
                        </div>
                        <div className="card m-1">
                            <div className="card-header" id="headingTwo">
                                <a data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" href="/#">
                                    Orders
                                </a>
                            </div>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                ...
                            </div>
                        </div>
                        <div className="card m-1">
                            <div className="card-header" id="headingThree">
                                <a data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseTwo" href="/#">
                                    Bail Bond
                                </a>
                            </div>
                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                ...
                            </div>
                        </div>
                        <div className="card m-1">
                            <div className="card-header" id="headingFour">
                                <a data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseThree" href="/#">
                                    Prison Remarks
                                </a>
                            </div>
                            <div id="collapseFour" className="collapse show" aria-labelledby="headingFour" data-parent="#accordion">
                                <div className="col-md-6 my-3">
                                    <div className="form-group row">
                                        <label htmlFor="" className="col-sm-3">Accused Released?</label>
                                        <div className="col-sm-9">
                                            <div className="icheck-success d-inline mx-2">
                                                <input 
                                                    type="radio" 
                                                    id="radioPrimary1" 
                                                    name="is_released" 
                                                    checked={form.is_released ? true : null } 
                                                    onChange={(e) =>setForm({...form, [e.target.name]: true})}
                                                />
                                                <label htmlFor="radioPrimary1">Yes</label>
                                            </div>
                                            <div className="icheck-danger d-inline mx-2">
                                                <input 
                                                    type="radio" 
                                                    id="radioPrimary2" 
                                                    name="is_released" 
                                                    checked={!form.is_released ? true : null } 
                                                    onChange={(e) => setForm({...form, [e.target.name]: false})}
                                                />
                                                <label htmlFor="radioPrimary2">No</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="" className="col-sm-3">Date & Time of Release</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="" className="col-sm-3">Remarks</label>
                                        <div className="col-sm-9">
                                            <textarea name="remarks"cols="30" rows="5" className="form-control"></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row d-flex justify-content-center">
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
        </div>          
    </>
  )
}

export default ResponseCreate