import React, { Component, Suspense } from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import userStore from './store/user'
import user from './store/user'
import PrivacyPolicyPage from './views/frontend/PrivacyPolicyPage'
import HomePage from './views/frontend/HomePage'
import MedicalDisclaimerPage from "./views/frontend/MedicalDisclaimerPage";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
// Pages
const Login = React.lazy(() => import('./views/auth/login/Login'))
//const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/" name="Home" element={<HomePage />} />
            <Route
              path="/privacy"
              name="Yaabaay - Privacy Policy"
              element={<PrivacyPolicyPage />}
            />
            <Route
              path="/medical-disclaimer"
              name="Yaabaay - Medical Disclaimer"
              element={<MedicalDisclaimerPage />}
            />

            {/*<Route exact path="/register" name="Register Page" element={<Register />} />*/}
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route exact path="/admin" name="Dashboard" element={<Login />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
