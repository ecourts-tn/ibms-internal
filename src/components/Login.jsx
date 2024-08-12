import React from 'react'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import './login.css'
import highcourtlogo from './highcourtlogo.png'
import { toast, ToastContainer } from 'react-toastify';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { getUserTypes, getUserTypeStatus } from '../redux/features/UserTypeSlice';
import Spinner from 'react-bootstrap/Spinner'
import FormControl from '@mui/material/FormControl'
import TextField  from '@mui/material/TextField'
import Button from '@mui/material/Button'
import LoginIcon from '@mui/icons-material/Login';
import * as Yup from 'yup'
import { useAuth } from '../hooks/useAuth'
import axios from 'axios'

const Login = () => {
  const[usertypes, setUserTypes] = useState([])
  const [loading, setLoading]   = useState(false);
  const[form, setForm] =  useState({
      usertype: '',
      username:'',
      password:''
  })
  const { login } = useAuth();
  const[errors, setErrors] = useState({})

  const validationSchema = Yup.object({
    usertype: Yup.string().required("Please select the usertype"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required")
  })

  useEffect(() => {
    const fetchData = async() => {
      const response = await api.get("api/base/user-type/")
      if(response.status === 200){
        setUserTypes(response.data)
      }
    }
    // fetchData()
  },[])

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try{
      await validationSchema.validate(form, {abortEarly:false})
      const {username, password, usertype} = form
      const response = await api.post('api/auth/department/login/', { usertype, username, password }, {
        skipInterceptor: true // Custom configuration to skip the interceptor
      })
      localStorage.clear()
            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            await login(response.data)
            toast.success('logged in successfully', {
                theme: "colored"
            })
    }catch(error){
      console.log(error)
      if(error.inner){
        setLoading(false)
        const newErrors = {};
        error.inner.forEach((err) => {
            newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
        return
      }
      if(error){
          toast.error("Invalid username or password3", {
              theme: "colored"
          });
          setLoading(false)
          return
      }
    }
}

  return (
      <>
         <div className="wrapper py-5 mb-5">
            <section className="content">
              <div className="container login-container">
                <div className="row mt-5">
                  <ToastContainer />
                  <div className="col-md-5">
                    <div className="card">
                      <div className="card-header pt-2" style={{display: 'block', textAlign: 'center', padding: '0px 10px'}}>
                        <p><img src={highcourtlogo} width={70} height={70}/></p>
                        <h3 className="text-center" style={{fontWeight: 'bold'}}>IBMS - Madrash High Court</h3>
                      </div>
                      <div className="card-body login-card-body">
                        <p>Please login with your username and password below.</p>
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
                              {/* { usertypes.filter((usertype) => {
                                  return usertype.department_user
                                }).map((type, index) => (
                                  <option value={type.id} key={index}>{type.user_type}</option>
                                ))
                              } */}
                              <option value="6">Judicial Officer</option>
                              <option value="3">Public Prosecutor/APP</option>
                              <option value="4">Prison Department</option>
                              <option value="5">Police Department</option>
                              <option value="7">Administrator</option>
                              <option value="8">Court User</option>
                              <option value="9">Legal Aid</option>
                            </select>
                            <div className="invalid-feedback">
                              { errors.usertype }
                            </div>
                          </div>
                          <div className="mb-3">
                            <FormControl fullWidth>
                              <TextField 
                                error={ errors.username ? true : false }
                                name="username" 
                                label="Username"
                                value={form.username}
                                size="small"
                                onChange={(e) => setForm({...form, [e.target.name]:e.target.value})}
                                helperText={errors.username}
                              />
                            </FormControl>
                          </div>
                          <div className="mb-3">
                            <FormControl fullWidth>
                              <TextField 
                                error={ errors.password ? true : false}
                                type="password" 
                                name="password" 
                                label="Password"
                                size="small"
                                helperText={errors.password}
                                value={form.password}
                                onChange={(e) => setForm({...form, password: e.target.value})}
                              />
                            </FormControl>
                            <div className="invalid-feedback">
                              { errors.password }
                            </div>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="remember" className="form-lable">Remember Me:</label>                            
                            <input type="checkbox" name="remember" defaultValue={1} id="remember" />
                          </div>
                          { loading && (
                                <div className="d-flex justify-content-center pt-1 pb-3">
                                    <Spinner animation="border" variant="primary" style={{ height:50, width:50}}/>
                                </div>
                            )}
                          <p>
                            <Button 
                              type="submit" 
                              variant='contained'
                              color="primary"
                              className="btn btn-primary btn-block" 
                              endIcon={<LoginIcon />}
                            >Login</Button>
                          </p>
                        </form>                        
                        <div className="col-md-12" id="help-link">
                          <p><a href="#">Forgot your password??</a></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
      </>
  )
}

export default Login
