import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { toast, ToastContainer } from 'react-toastify';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useAuth } from '../hooks/useAuth';
import highcourtlogo from './highcourtlogo.png'
import './header.css'
import axios from 'axios'

import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import LoginIcon from '@mui/icons-material/LockOpen'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next';



const Login = () => {

    const [loading, setLoading]   = useState(false);
    const {t} = useTranslation()
    const [usertypes, setUserTypes] = useState([])
    const[form, setForm] =  useState({
        usertype: '',
        username:'',
        password:''
    })
    const { login } = useAuth();
    const[errors, setErrors] = useState({})

    const validationSchema = Yup.object({
        usertype: Yup.string().required(t('errors.usertype_required')),
        username: Yup.string().required(t('errors.username_required')),
        password: Yup.string().required(t('errors.password_required'))
    })

    useEffect(() => {
        const fetchData = async() => {
          const response = await api.get("base/user-type/", {skipInterceptor:true})
          if(response.status === 200){
            setUserTypes(response.data)
          }
        }
        fetchData()
      },[])

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try{
            await validationSchema.validate(form, {abortEarly: false})
            const {username, password, usertype} = form
            const response = await api.post('auth/department/login/', { usertype, username, password }, {
                skipInterceptor: true // Custom configuration to skip the interceptor
              })
            sessionStorage.clear()
            sessionStorage.setItem(ACCESS_TOKEN, response.data.access);
            sessionStorage.setItem(REFRESH_TOKEN, response.data.refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            await login(response.data)
            toast.success('logged in successfully', {
                theme: "colored"
            })
        }catch(error){
            if(error.inner){
                setLoading(false)
                const newErrors = {};
                error.inner.forEach((err) => {
                    newErrors[err.path] = err.message;
                });
                setErrors(newErrors);
                return
            }
            if(error.response){
                const { status, data } = error.response
                switch(status){
                    case 400:
                        toast.error(data.message, {theme: "colored"})
                        setLoading(false)
                        break;
                    case 401:
                        toast.error(data.message, {theme:"colored"})
                        setLoading(false)
                        break;
                    case 403:
                        toast.error(data.message, {theme:"colored"})
                        setLoading(false)
                        break;
                    case 404:
                        toast.error(data.message, {theme:"colored"})
                        setLoading(false)
                        break;
                    default:
                        toast.error(error, {theme:"colored"})
                        setLoading(false)
                }
            }
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="text-center mb-4">
                <img className="mb-2" src={highcourtlogo} alt width={70} height={70} />
                <h1 className="h4 mb-3 font-weight-bold">{t('signin')}</h1>
            </div>    
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <select 
                        name="usertype" 
                        id="usertype" 
                        className={`form-control ${errors.usertype ? 'is-invalid' : ''}`} 
                        value={form.usertype}
                        onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                    >
                        <option value="">Select user type</option>
                        { usertypes.filter((usertype) => {
                            return usertype.department_user
                        }).map((type, index) => (
                            <option value={type.id} key={index}>{type.user_type}</option>
                        ))
                        }
                    </select>
                    <div className="invalid-feedback">
                        { errors.usertype }
                    </div>
                </div>               
                <div className="form-group mb-3">
                    <FormControl fullWidth className="mb-3">
                        <TextField
                            error={ errors.username ? true : false }
                            helperText={ errors.username }
                            label={`${t('mobile')}/${t('email')}/${t('username')}`}
                            size="small"
                            name="username"
                            value={ form.username }
                            onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                        />
                    </FormControl>
                    <FormControl fullWidth className="mb-3">
                        <TextField
                            error={ errors.password ? true : false }
                            helperText={errors.password}
                            label={t('password')}
                            size="small"
                            type="password"
                            name="password"
                            value={ form.password }
                            onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                        />
                    </FormControl>
                    <div className="form-group mb-1">
                        <input type="checkbox" defaultValue="remember-me" style={{ width:20}} />{t('remember_me')}
                    </div>
                    <FormControl fullWidth>
                        <Button 
                            variant="contained" 
                            endIcon={<LoginIcon />}
                            type="submit"
                            color="success"
                        >{t('signin')}</Button>
                    </FormControl>
                </div>
                { loading && (
                <div className="d-flex justify-content-center pt-1 pb-3">
                    <Spinner animation="border" variant="primary" style={{ height:50, width:50}}/>
                </div>
                )}
                <div className="mt-1">
                    <p className="d-flex justify-content-end"><a href="#">{t('forgot_password')}</a></p>
                </div>
            </form>
        </>
    )
}

export default Login
