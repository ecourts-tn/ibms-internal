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
import Response from "./components/police/Response"
import PrisonDashboard from "./components/prison/Dashboard"
import ProsecutorDashboard from "./components/prosecutor/Dashboard"
import Registration from "./components/Registration"
import Dashboard from "./components/court/scrutiny/Dashboard"

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

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route index element={<Login />} />
          <Route element={<AdminLayout />} >
            <Route path="/user-registration" element={<Registration />} />
            <Route path="court">
              <Route path="dashboard" element={<CourtDashboard />} />
              <Route path="today-cases" element={<TodayCases />} />
              <Route path="daily-proceedings" element={<DailyProceedings />} />
              <Route path="case/scrutiny" element={<Dashboard />} />
              <Route path="case/registration" element={<CaseRegistration />} />
            </Route>
            <Route path="police">
              <Route path="dashboard" element={<PoliceDashboard />} />
              <Route path="response"  element={<Response />} />
            </Route>
            <Route path="prison">
              <Route path="dashboard" element={<PrisonDashboard />} />
            </Route>
            <Route path="prosecution">
              <Route path="dashboard" element={<ProsecutorDashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}



export default App