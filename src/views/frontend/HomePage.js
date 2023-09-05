import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  CAlert,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import logo from '../../assets/logo-blue.png';
import google from '../../assets/google.png';
import apple from '../../assets/apple.png';

//
export default function HomePage() {

  useEffect(() => {

  }, [])

  return (
      <div className="container text-center">
      <CRow>
        <CCol xs={2}></CCol>
        <CCol xs={8}>
            <p className='mt-n1'>&nbsp;</p>
            <img src={logo} className="img-fluid" width={200} alt="Yaabaay App - Turkey" />
            <p className='mt-2'>&nbsp;</p>
            <h3>Yaabaay App specialized in medical tourism services in Turkey to connect you to the best Turkish hospitals from all over the world specializing in different services</h3>
            <h4>Dental treatment and beautician, Hair transplant, Plastic surgery and other medical services information.</h4>
            <p className='mt-5'>&nbsp;</p>
            <CRow className='text-center'>
              <CCol>
                <a href='https://play.google.com/store/apps/details?id=com.yaabaay.app' target='_blank' rel="noreferrer">
                  <img src={google} className="img-fluid" alt="Yaabaay App - Google Play" />
                </a>
              </CCol>
              <CCol>
                <a href='https://apps.apple.com/us/app/yaabaay/id6450189135'>
                  <img src={apple} className="img-fluid" alt="Yaabaay App - App Store" rel="noreferrer" />
                </a>
              </CCol>
            </CRow>
            <p className='mt-5'>&nbsp;</p>
            <h5>Provide all tourist services to make your experience (A trip of a lifetime).</h5>
            <p>
              Contact us : <a className='text-decoration-none grey-color' href='mailto:info@yaabaay.com'>info@yaabaay.com</a> - &nbsp;
              <a className='text-decoration-none grey-color' href='./privacy'>Privacy policy</a>
            </p>
        </CCol>
        <CCol xs={2}></CCol>
      </CRow>
      </div>
  )

}
