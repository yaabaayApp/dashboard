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
import noImage from './../../../assets/images/no-image.png'


//
export default function Control() {

  const navigate = useNavigate()

  const [intros, setIntros] = useState({}) // intros Object

  const [alertShow, setAlertShow] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [alertType, setAlertType] = useState('')

  const getIntrosData = async () => {
    try {
      console.log(api.getAllIntros)
      const response = await axios.get(api.getAllIntros)
      console.log(response.data?.data)
      setIntros(response.data?.data ?? [])
    } catch (e) {
      setIntros(null)
      console.log(e)
    }
  }

  const introDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this Intro Screen ?'))
      return false
    try {
      console.log(id)
      console.log(`${api.introDelete}${id}`)
      await axios.delete(`${api.introDelete}${id}`)
      document.getElementById('intro-' + id).remove()
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

  const introEdit = async (introId) => {
    try {

      navigate(`/admin/${api.introEdit}${introId}`)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getIntrosData().then(r => {
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
              <strong>Intros Control</strong>
            </CCardHeader>
            <CCardBody>
              <CForm>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope='col'>#</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Image</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Title</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Sort</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Control</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>

                    {(intros != null && intros.length > 0) &&
                    intros.map((intro, index) => {
                      return (
                        <CTableRow id={`intro-${intro._id}`} key={index}>
                          <CTableHeaderCell scope='row'>{index + 1}</CTableHeaderCell>
                          <CTableDataCell>
                            {intro?.image ? (
                              <img src={`${process.env.REACT_APP_AMAZON_AWS_URL}${intro?.image}`}
                                   style={{ height: '2rem' }} alt='' />
                            ) : (
                              <img src={noImage} style={{ height: '50', width: '3rem' }} alt='' />
                            )}

                          </CTableDataCell>
                          <CTableDataCell>{intro.title}</CTableDataCell>
                          <CTableDataCell>{intro.sort}</CTableDataCell>

                          <CTableDataCell>
                            <span onClick={() => introEdit(intro._id)} color='info'>
                              <FontAwesomeIcon icon={faPen} />
                            </span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span onClick={() => introDelete(intro._id)} color='danger'>
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
