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

import api from '../../../api/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons'

//
export default function Control() {

  const navigate = useNavigate()

  const [faqs, setFaqs] = useState({}) // intros Object

  const [alertShow, setAlertShow] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [alertType, setAlertType] = useState('')

  const getFAQsData = async () => {
    try {
      console.log(api.getFAQs)
      const response = await axios.get(api.getFAQs)
      console.log(response.data?.data)
      setFaqs(response.data?.data ?? [])
    } catch (e) {
      setFaqs(null)
      console.log(e)
    }
  }

  const deleteFAQ = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ ?'))
      return false
    try {
      console.log(id)
      console.log(`${api.deleteFAQ}${id}`)
      await axios.delete(`${api.deleteFAQ}${id}`)
      document.getElementById('faq-' + id).remove()
      setAlertText('Record successfully deleted!')
      setAlertShow(true)
      setAlertType('success')
    } catch (e) {
      setAlertText(e.response?.data?.message)
      setAlertShow(true)
      setAlertType('danger')
      console.log(e)
    }
  }

  const editFAQ = async (FAQId) => {
    try {
      navigate(`/admin/editFAQ/${FAQId}`)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getFAQsData().then(r => {
    })
  }, [])

  return (
    <>
      <CRow>
        <CCol xs={12}>

          {alertShow && alertType === 'danger' ? (
            <CAlert dismissible className={'alert alert-danger'}>{alertText}</CAlert>
          ) : ('')}

          {alertShow && alertType === 'success' ? (
            <CAlert dismissible className={'alert alert-success'}>{alertText}</CAlert>
          ) : ('')}

          <CCard className='mb-4'>
            <CCardHeader>
              <strong>Frequently Asked Questions Control</strong>
            </CCardHeader>
            <CCardBody>
              <CForm>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope='col'>#</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Question</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Answer</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Sort</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Control</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>

                    {(faqs != null && faqs.length > 0) &&
                    faqs.map((faq, index) => {
                      return (
                        <CTableRow id={`faq-${faq._id}`} key={index}>
                          <CTableHeaderCell scope='row'>{index + 1}</CTableHeaderCell>

                          <CTableDataCell>{faq.question.en}</CTableDataCell>
                          <CTableDataCell>{faq.answer.en}</CTableDataCell>
                          <CTableDataCell>{faq.sort}</CTableDataCell>

                          <CTableDataCell>
                            <span onClick={() => editFAQ(faq._id)} color='info'>
                              <FontAwesomeIcon icon={faPen} />
                            </span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span onClick={() => deleteFAQ(faq._id)} color='danger'>
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </span>
                          </CTableDataCell>
                        </CTableRow>
                      )
                    })
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
