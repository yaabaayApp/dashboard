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
export default function MedicalDisclaimerPage() {

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
            <h3><center>Yaabaay Medical Disclaimer</center></h3>
            <p>&nbsp;</p>
            {Parser('Yaabaay application is designed to provide general information and resources on various medical topics, treatments, and conditions. However, it is important to understand that the information provided through this application is not intended to replace professional medical advice, diagnosis, or treatment. <br>\n' +
              '\n' +
              'The content within Yaabaay is for informational purposes only and should not be considered a substitute for seeking professional medical advice from a qualified healthcare provider. The application does not establish a doctor-patient relationship, and the information provided should not be relied upon as a substitute for professional medical advice. <br>\n' +
              '\n' +
              'While we strive to ensure the accuracy and reliability of the information presented in Yaabaay, medical knowledge and practices are constantly evolving, and errors may occur. Therefore, we cannot guarantee the completeness, accuracy, or timeliness of the information provided. Users of this application are advised to consult with a qualified healthcare professional for specific medical advice tailored to their individual needs and circumstances. <br>\n' +
              '\n' +
              'The use of Yaabaay does not constitute endorsement or recommendation of any particular healthcare provider, treatment, product, or service. We do not assume any responsibility for any actions taken based on the information provided within the application. <br>\n' +
              '\n' +
              'In no event shall Yaabaay LTD, its affiliates, employees, or agents be liable for any direct, indirect, incidental, special, or consequential damages arising out of the use of Yaabaay or the information provided within. <br>\n' +
              '\n' +
              'By using Yaabaay, you acknowledge and agree to the terms of this medical disclaimer. <br>')}
          </CCol>
          <CCol lg={1} xs={12} />
        </CRow>
      </div>
    </div>
  )

}
