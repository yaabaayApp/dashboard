import React, {useEffect, useState,} from 'react'
import { Link } from 'react-router-dom'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import logoImg from '../../../assets/logo-main.png'
import userStore from "../../../store/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../../api/api";

const Login = () => {

  const navigate = useNavigate();

  //const [user] = userStore(state => [state.user])
  const setUserData = userStore(state => state.setUserData)

  const [alertShow, setAlertShow] = useState(false);
  const [alertText, setAlertText] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    let { state } = JSON.parse(localStorage.getItem('user'));
    if (state && state?.user?.role === 'admin'){
      setUserData(state.user);
      navigate('/admin/dashboard');
    }
  }, [])


  const adminLogin = async () => {
    try {
      setAlertShow(false);
      const response = await axios.post(`${api.adminSignIn}`, {username, password});
      console.log(response?.data);
      setUserData(response?.data?.user);
      navigate('/admin/dashboard');
    } catch (e) {
      setAlertText(e.response?.data?.message);
      setAlertShow(true);
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">

                { alertShow && <CAlert className={'alert alert-danger'}>{alertText}</CAlert> }

                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" name="username" value={username}
                                  onChange={(e) => setUsername(e.target.value)}

                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        value={password}
                        onChange={(e) =>  setPassword(e.target.value)}
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          onClick={() => adminLogin()}
                          color="dark" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-dark py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <img src={logoImg} />
                  {/*<div>*/}
                  {/*  <h2>Sign up</h2>*/}
                  {/*  <p>*/}
                  {/*    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod*/}
                  {/*    tempor incididunt ut labore et dolore magna aliqua.*/}
                  {/*  </p>*/}
                  {/*  <Link to="/register">*/}
                  {/*    <CButton color="primary" className="mt-3" active tabIndex={-1}>*/}
                  {/*      Register Now!*/}
                  {/*    </CButton>*/}
                  {/*  </Link>*/}
                  {/*</div>*/}
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
