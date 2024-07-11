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
    const initialState = {
        is_released: false,
        released_time: '',
        remarks: ''
    }
    
    const[form, setForm] = useState(initialState)

    useEffect(() => {
        async function fetchData(){
            const response = await api.get(`api/bail/petition/detail/`, {params:{cino:state.cino}})
            if(response.status === 200){
                setForm({
                    ...form,
                    cino: response.data.petition.cino
                })
                setPetition(response.data.petition)
                setAccused(response.data.petitioner)
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
                    <div className="row">
                        <div className="col-md-6">
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
    </>
  )
}

export default ResponseCreate