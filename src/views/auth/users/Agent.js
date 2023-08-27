import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();
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
  CFormInput,
  CFormLabel,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTabPane,
} from '@coreui/react'

import api from '../../../api/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faTrashAlt, faPen, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { cilBadge } from '@coreui/icons'
import noAvatar from '../../../assets/images/avatars/profile.png'

//
export default function AgentControl() {
  const { id } = useParams()
  // const location = useLocation()

  const navigate = useNavigate()

  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')

  const [alertShow, setAlertShow] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [alertType, setAlertType] = useState('')

  // console.log(Object.values(users))

  const filteredUsers = users.filter((user) => {
    console.log(user)
    return Object.values(user).toString().toLowerCase().includes(query.toLowerCase())
  })

  const userDelete = async (id) => {
    if (!window.confirm('Confirm delete user ?')) return false
    try {
      console.log(id)
      console.log(`${api.userDelete}${id}`)
      await axios.delete(`${api.userDelete}${id}`)
      //document.getElementById('user-' + id).remove();
      setUsers(users.filter((row) => row._id !== id))
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

  const userEdit = async (id) => {
    try {
      navigate(`/admin/userEdit/${id}`)
    } catch (e) {
      console.log(e)
    }
  }

  const userAgentsControl = async (id) => {
    try {
      //console.log(`userAgentsControl ${id}`)
      const response = await axios.get(`${api.getUserAgents}${id}`)
      ///console.log(`this is agents res data ${JSON.stringify(response.data?.data)}`)
      setUsers(response.data?.data ?? [])
    } catch (e) {
      setUsers([])
      console.log(e)
    }
  }

  useEffect(() => {
      userAgentsControl(id).then((r) => {});
  }, [id])

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
              Agent customers
              <CFormInput
                style={{ float: 'right', display: 'block', width: '40%' }}
                type='search'
                placeholder='Search Users...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </CCardHeader>
            <CCardBody>
              <CForm>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope='col'>#</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Avatar</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Name</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Email</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Mobile</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Role</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Status</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Date</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Control</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {filteredUsers != null &&
                    filteredUsers.length > 0 &&
                    filteredUsers.map((user, index) => {
                      return (
                        <CTableRow id={`user-${user._id}`} key={index}>
                          <CTableHeaderCell scope='row'>{index + 1}</CTableHeaderCell>
                          <CTableDataCell>
                            {user?.avatar ? (
                              <img src={`${process.env.REACT_APP_AMAZON_AWS_URL}${user?.avatar}`}
                                   style={{
                                     borderRadius: '50%',
                                     height: '50px',
                                     width: '50px',
                                     overflow: 'hidden',
                                     display: 'flex',
                                     justifyContent: 'center',
                                     alignItems: 'center',
                                     objectFit: 'cover',
                                   }} alt='' />
                            ) : (
                              <img src={noAvatar} style={{ height: '50', width: '3rem' }} alt='' />
                            )}

                          </CTableDataCell>
                          <CTableDataCell>{user.name}</CTableDataCell>
                          <CTableDataCell>{user.email}</CTableDataCell>
                          <CTableDataCell>{user.phone}</CTableDataCell>
                          <CTableDataCell>{user.role}</CTableDataCell>
                          <CTableDataCell>
                            {user?.active === '0' ? (
                              <CBadge color='danger' shape='rounded-pill'>
                                not active
                              </CBadge>
                            ) : user?.active === '1' ? (
                              <CBadge color='success' shape='rounded-pill'>
                                active
                              </CBadge>
                            ) : ('')}
                          </CTableDataCell>
                          <CTableDataCell>{user.createdAt}</CTableDataCell>


                          <CTableDataCell>
                            <span onClick={() => userEdit(user._id)} color='info'>
                              <FontAwesomeIcon icon={faPen} />
                            </span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span onClick={() => userDelete(user._id)} color='danger'>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </span>
                          </CTableDataCell>
                        </CTableRow>
                      )
                    })}
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
