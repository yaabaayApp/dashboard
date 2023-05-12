import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {
  CAlert,
  CBadge,
  CButton,
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

import api from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash, faEdit, faBinoculars, faScroll, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {cilBadge} from "@coreui/icons";

//
export default function Control() {

  const navigate = useNavigate();

  const [contactUs, setContactUs] = useState({}) // contactUs Object

  const [alertShow, setAlertShow] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [alertType, setAlertType] = useState('');

  const getContactUsData = async () => {
    try{
      console.log(api.getAllContactUs)
      const response = await axios.get(api.getAllContactUs);
      console.log(response.data?.data);
      setContactUs(response.data?.data ?? [])
    }catch (e) {
      setContactUs(null)
      console.log(e)
    }
  }

  const contactUsDelete = async (id) => {
    if( !window.confirm("Are you sure you want to delete this Contact Us form ?") )
      return false;
    try {
      console.log(id)
      console.log(`${api.contactUsDelete}${id}`)
      await axios.delete(`${api.contactUsDelete}${id}`)
      document.getElementById('contactUs-'+id).remove();
      setAlertText('Record successfully deleted!')
      setAlertShow(true)
      setAlertType('success')
    }catch (e){
      setAlertText(e.response?.data?.message)
      setAlertShow(true)
      setAlertType('danger')
      console.log(e)
    }
  }

  const contactUsEdit = async (id) => {
    try {

      navigate(`/admin/${api.contactUsEdit}${id}`);
    }catch (e){
      console.log(e)
    }
  }

  useEffect(() => {
    getContactUsData().then(r => {})
  }, [])

    return (
      <>
        <CRow>
          <CCol xs={12}>

            { alertShow && alertType === 'danger' ? (
              <CAlert dismissible className={'alert alert-danger'}>{alertText}</CAlert>
            ) : ('')}

            { alertShow && alertType === 'success' ? (
              <CAlert dismissible className={'alert alert-success'}>{alertText}</CAlert>
            ) : ('')}

            <CCard className="mb-4">
              <CCardHeader>
                <strong>Inbox</strong>
              </CCardHeader>
              <CCardBody>
                <CForm>
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Subject</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Control</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>

                      { ( contactUs != null && contactUs.length > 0 ) &&
                      contactUs.map( (contactForm, index) => {
                          return (
                            <CTableRow id={`contactUs-${contactForm._id}`} key={index}>
                              <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
                              <CTableDataCell>{contactForm.name}</CTableDataCell>
                              <CTableDataCell>{contactForm.email}</CTableDataCell>
                              <CTableDataCell>{contactForm.phone}</CTableDataCell>
                              <CTableDataCell>{contactForm.iso}</CTableDataCell>
                              <CTableDataCell>{contactForm.subject}</CTableDataCell>
                              <CTableDataCell>{contactForm.message}</CTableDataCell>
                              <CTableDataCell>{contactForm.status === '0' ? (
                                <CBadge color="danger">unread</CBadge>
                              ) : contactForm.status === '1' ? (
                                <CBadge color="success">read</CBadge>
                              ) : ('')}
                              </CTableDataCell>

                              <CTableDataCell>
                                <span  onClick={() => contactUsEdit(contactForm._id)} color="info">
                                  <FontAwesomeIcon icon={faScroll}/>
                                </span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span onClick={() => contactUsDelete(contactForm._id)} color="danger">
                                  <FontAwesomeIcon icon={faTrashAlt}/>
                                </span>


                              </CTableDataCell>


                            </CTableRow>
                          )
                        } )
                      }

                    </CTableBody>
                  </CTable>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    )

}
