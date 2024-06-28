import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import api from 'src/api/api'

export default function Notification() {
  const [alertShow, setAlertShow] = useState(false)
  const [alertType, setAlertType] = useState('')
  const [alertText, setAlertText] = useState('')
  const [categories, setCategories] = useState([])

  const getCategoriesData = async () => {
    try {
      let { state } = JSON.parse(localStorage.getItem('user'))
      let response = await axios.get(api.getAllCategories, {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      })
      setCategories(response.data?.data ?? [])
    } catch (e) {
      setCategories([])
      console.log(e)
    }
  }

  useEffect(() => {
    getCategoriesData().then((r) => {})
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData()

    let { state } = JSON.parse(localStorage.getItem('user'))
    console.log(form.notificationHeader)
    formData.append('notificationHeader', form.notificationHeader.value)
    formData.append('notificationText', form.notificationText.value)

    try {
      const response = await axios.post(
        api.notification,
        {
          notificationText: form.notificationText.value,
          notificationHeader: form.notificationHeader.value,
        },
        {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        },
      )
      console.log(response)
      setAlertType('success')
      setAlertText('Notification sent successfully!')
      setAlertShow(true)
    } catch (error) {
      setAlertType('danger')
      setAlertText('Failed to send notification.')
      setAlertShow(true)
      console.log(error)
    }
  }

  return (
    <div>
      <CRow>
        <CCol xs={12}>
          {alertShow && alertType === 'danger' && (
            <CAlert className={'alert alert-danger'} color={'danger'}>
              {alertText}
            </CAlert>
          )}

          {alertShow && alertType === 'success' && (
            <CAlert className={'alert alert-success'} color={'success'}>
              {alertText}
            </CAlert>
          )}

          <CCard className="mb-4">
            <CCardBody>
              <CForm className="row g-3" onSubmit={handleSubmit}>
                {/* <CCol lg={6} xs="12">
                  <CFormLabel htmlFor="Image">Notification image</CFormLabel>
                  <CFormInput type="file" name="Image" id="formFile" />
                </CCol> */}

                <CCol lg={6} xs={12}>
                  <CFormLabel htmlFor="notificationHeader">Notification title</CFormLabel>
                  <CFormInput
                    name="notificationHeader"
                    type="text"
                    placeholder="Enter the title of the notification"
                  />
                </CCol>

                <CCol lg={6} xs={12}>
                  <CFormLabel htmlFor="notificationText">Notification text</CFormLabel>
                  <CFormInput
                    name="notificationText"
                    type="text"
                    placeholder="Enter the notification text"
                  />
                </CCol>

                <CCol lg={12} xs={12}>
                  <CButton type="submit" color="primary">
                    Submit
                  </CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}
