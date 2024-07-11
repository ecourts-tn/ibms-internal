import React, {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './components/Login'
import NotFound from "./components/layout/NotFound"
import CourtDashboard from "./components/court/Dashboard"
import TodayCases from "./components/court/TodayCases"
import DailyProceedings from "./components/court/DailyProceedings"
import CaseScrutiny from "./components/court/CaseScrutiny"
import CaseRegistration from "./components/court/CaseRegistration"
import AdminLayout from "./components/layout/AdminLayout"
import 'bootstrap/dist/css/bootstrap.min.css'

import PoliceDashboard from "./components/police/Dashboard"
import ResponsePending from "./components/police/ResponsePending"
import ResponseSubmitted from "./components/police/ResponseSubmitted"
import ResponseDetails from './components/police/ResponseDetails'
import ConditionList from './components/police/ConditionList'
import ConditionForm from './components/police/ConditionForm'


import PrisonDashboard from "./components/prison/Dashboard"
import PrisonResponsePending from "./components/prison/ResponsePending"
import PrisonResponseSubmitted from "./components/prison/ResponseSubmitted"
import PrisonResponseCreate from "./components/prison/ResponseCreate"

import ProsecutorDashboard from "./components/prosecutor/Dashboard"
import ProsecutionResponsePending from "./components/prosecutor/ResponsePending"
import ProsecutionResponseSubmitted from "./components/prosecutor/ResponseSubmitted"
import ProsecutionResponse from "./components/prosecutor/ResponseCreate"

import Registration from "./components/Registration"
import Dashboard from "./components/court/scrutiny/Dashboard"
import ResponseCreate from './components/police/ResponseCreate'
import CauseList from './components/court/CauseList'
import SuretyPendingList from './components/court/SuretyPendingList'
import SuretyVerify from './components/court/SuretyVerify'

import { PrivateRoute } from "./hooks/PrivateRoute";
import { AuthProvider } from "./hooks/useAuth";


const appendScript = (scriptToAppend) => {
  const script = document.createElement("script");
  script.src = scriptToAppend;
  script.async = true;
  document.body.appendChild(script);
}

function App() {

  useEffect(() => {
    appendScript(`${process.env.PUBLIC_URL}/plugins/select2/js/select2.full.min.js`);
  },[])

  const isAuthenticated = false

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route index element={<Login />} />
            <Route element={<AdminLayout />} >
            <Route
                path="/auth/user/registration"
                element={
                  <PrivateRoute>
                    <Registration />
                  </PrivateRoute>
                }
              />
              <Route path="court">
                <Route 
                  path="dashboard" 
                  element={
                    <PrivateRoute>
                      <CourtDashboard />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="petition/listed-today" 
                  element={
                    <PrivateRoute>
                      <TodayCases />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="petition/proceedings" 
                  element={
                    <PrivateRoute>
                      <DailyProceedings />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="petition/cause-list" 
                  element={
                    <PrivateRoute>
                      <CauseList />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="petition/scrutiny" 
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="petition/registration" 
                  element={
                    <PrivateRoute>
                      <CaseRegistration />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="surety/pending/list/" 
                  element={
                    <PrivateRoute>
                      <SuretyPendingList />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="surety/verify/" 
                  element={
                    <PrivateRoute>
                      <SuretyVerify />
                    </PrivateRoute>
                  } 
                />
              </Route>
              <Route path="police">
                <Route 
                  path="dashboard" 
                  element={
                    <PrivateRoute>
                      <PoliceDashboard />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="response/pending"  
                  element={
                    <PrivateRoute>
                      <ResponsePending />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="response/submitted"  
                  element={
                    <PrivateRoute>
                      <ResponseSubmitted />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="response/create" 
                  element={
                    <PrivateRoute>
                      <ResponseCreate />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="response/details" 
                  element={
                    <PrivateRoute>
                      <ResponseDetails />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="condition" 
                  element={
                    <PrivateRoute>
                      <ConditionList />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="condition/create" 
                  element={
                    <PrivateRoute>
                      <ConditionForm />
                    </PrivateRoute>
                  } 
                />
              </Route>
              <Route path="prison">
                <Route 
                  path="dashboard" 
                  element={
                    <PrivateRoute>
                      <PrisonDashboard />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="response/pending" 
                  element={
                    <PrivateRoute>
                      <PrisonResponsePending />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="response/submitted" 
                  element={
                    <PrivateRoute>
                      <PrisonResponseSubmitted />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="response/create" 
                  element={
                    <PrivateRoute>
                      <PrisonResponseCreate />
                    </PrivateRoute>
                  } 
                />
              </Route>
              <Route path="prosecution">
                <Route 
                  path="dashboard" 
                  element={
                  <PrivateRoute>
                    <ProsecutorDashboard />
                  </PrivateRoute>
                  } 
                />
                <Route 
                  path="response/pending/" 
                  element={
                    <PrivateRoute>
                      <ProsecutionResponsePending />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="response/submitted/" 
                  element={
                    <PrivateRoute>
                      <ProsecutionResponseSubmitted />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="response/create/" 
                  element={
                    <PrivateRoute>
                      <ProsecutionResponse />
                    </PrivateRoute>
                  } 
                />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}



export default App