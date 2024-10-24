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
import PendingList from './components/court/scrutiny/PendingList'
import BailCancellation from './components/police/BailCancellation'
import RequestCustody from './components/police/RequestCustody'
import DailyProceedingsList from './components/court/DailyProceedingsList'
import BailOrder from './components/court/BailOrder'
import GenerateOrders from './components/court/GenerateOrders'
import BailBondForm from './components/court/BailBondForm'
import Profile from './components/police/Profile'

import config from './config';
import RegistrationPendingList from './components/court/RegistrationPendingList'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderPendingList from './components/court/OrderPendingList'
import Home from './components/Home'
import { LanguageProvider } from './contexts/LanguageContext'

function App() {


  const isAuthenticated = false

  return (  
    <div>
      <ToastContainer />
        <LanguageProvider>
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route index element={<Home />} />
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
                            <DailyProceedingsList />
                          </PrivateRoute>
                        } 
                      />
                      <Route 
                        path="petition/case/proceedings" 
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
                            <PendingList />
                          </PrivateRoute>
                        } 
                      />
                      <Route 
                        path="petition/scrutiny/details" 
                        element={
                          <PrivateRoute>
                            <Dashboard />
                          </PrivateRoute>
                        } 
                      />
                      <Route 
                        path="petition/registration/list" 
                        element={
                          // <PrivateRoute>
                            <RegistrationPendingList />
                          // </PrivateRoute>
                        } 
                      />
                      <Route 
                        path="petition/registration" 
                        element={
                          // <PrivateRoute>
                            <CaseRegistration />
                          // </PrivateRoute>
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
                      <Route 
                        path="orders/generate/" 
                        element={
                          <PrivateRoute>
                            <OrderPendingList />
                          </PrivateRoute>
                        } 
                      />
                      <Route 
                        path="bail/generate/order" 
                        element={
                          <PrivateRoute>
                            <BailOrder />
                          </PrivateRoute>
                        } 
                      />
                      <Route 
                        path="orders/bail/" 
                        element={
                          <PrivateRoute>
                            <BailOrder />
                          </PrivateRoute>
                        } 
                      />
                    </Route>
                    <Route path="police">
                      <Route
                        path="profile"
                        element={<Profile />}
                      />
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
                      <Route 
                        path="bail/cancellation" 
                        element={
                          <PrivateRoute>
                            <BailCancellation />
                          </PrivateRoute>
                        } 
                      />
                      <Route 
                        path="request/custody" 
                        element={
                          <PrivateRoute>
                            <RequestCustody />
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
        </LanguageProvider>
    </div>
  )
}



export default App