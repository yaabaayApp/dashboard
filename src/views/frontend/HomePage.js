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

import api from '../../api/api'

//
export default function HomePage() {

  useEffect(() => {

  }, [])

  return (
      <div className="wrapper d-flex flex-column min-vh-100 bg-light p-20">
      <CRow>
        <CCol xs={12}>
          <center>
            <h3>Yaabaay Soon</h3>
          </center>
        </CCol>
      </CRow>
      </div>
  )

}
