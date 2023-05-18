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
import Parser from 'html-react-parser';
import api from '../../api/api'

//
export default function PrivacyPolicyPage() {

  const [content, setContent] = useState('') // intros Object

  const getSettingsData = async () => {
    try {
      const response = await axios.get(api.getAllSettings)
      // console.log(response.data?.data.emailOrPhone) // CORRECT FORMAT
      // console.log(response.data?.data) // all data
      let settingsData = response.data?.data
      console.log(settingsData)
      setContent(settingsData.privacy)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getSettingsData().then(r => {})
  }, [])

  return (
    <div className="wrapper d-flex flex-column min-vh-100 bg-light p-20">
      <div className="body flex-grow-1 px-3">
        <CRow>
          <CCol lg={1} xs={12} />
          <CCol lg={10} xs={12}>
            <p>&nbsp;</p>
            <h3><center>Yaabaay Privacy Policy</center></h3>
            <p>&nbsp;</p>
            {Parser(content)}
          </CCol>
          <CCol lg={1} xs={12} />
        </CRow>
      </div>
    </div>
  )

}
