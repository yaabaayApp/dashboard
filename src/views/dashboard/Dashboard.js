import React, { useEffect, useState } from 'react'

import {
  CAlert, CButton, CCard, CCardBody, CCardHeader,
  CCol, CForm, CFormInput,
  CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow,
  CWidgetStatsC,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faBell, faPen,
  faStethoscope, faTrashAlt,
  faUserInjured,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons'
import api from '../../api/api'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const navigate = useNavigate()

  const [categoriesOrders, setCategoriesOrders] = useState([])
  const [query, setQuery] = useState('')
  // const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
  const [leads, setLeads] = useState({})
  const [agents, setAgents] = useState({})
  const [services, setServices] = useState({})
  const [contactUs, setContactUs] = useState({})


  const filteredCategoriesOrders = categoriesOrders.filter((categoryOrder) => {
    console.log(categoryOrder)
    return Object.values(categoryOrder).toString().toLowerCase().includes(query.toLowerCase())
  })
  const getCategoriesOrdersData = async () => {
    try {
      console.log(api.getLatestTenOrders)
      const response = await axios.get(api.getLatestTenOrders)
      setCategoriesOrders(response.data?.data ?? [])
    } catch (e) {
      // setCategoriesOrders(null)
      console.log(e)
    }
  }


  const getUnreadMessagesCount = async () => {
    try {
      console.log(api.getUnreadMessagesCount)
      const response = await axios.get(api.getUnreadMessagesCount)
      setContactUs(response.data ?? [])
    } catch (e) {
      setContactUs(null)
      console.log(e)
    }
  }

  const getLeadsCount = async () => {
    try {
      const response = await axios.get(api.getLeads)
      setLeads(response.data ?? [])
    } catch (e) {
      setLeads(null)
      console.log(e)
    }
  }

  const getCategoriesCount = async () => {
    try {
      console.log(api.getCategoriesCount)
      const response = await axios.get(api.getCategoriesCount)
      setServices(response.data ?? [])
    } catch (e) {
      setServices(null)
      console.log(e)
    }
  }

  const getAgentsCount = async () => {
    try {
      console.log(api.getAgents)
      const response = await axios.get(api.getAgents)
      setAgents(response.data ?? [])
    } catch (e) {
      setAgents(null)
      console.log(e)
    }
  }

  const goToCategoriesOrders = async () => {
    try {
      navigate(`/admin/${api.goToCategoriesOrders}`)
    } catch (e) {
      console.log(e)

    }
  }

  useEffect(() => {
    getUnreadMessagesCount().then((r) => {
    })
    getLeadsCount().then((r) => {
    })
    getAgentsCount().then((r) => {
    })
    getCategoriesCount().then((r) => {
    })
    getCategoriesOrdersData().then((r) => {
    })
  }, [])

  return (
    <>
      <CRow>
        <CCol xs={3}>
          <CWidgetStatsC
            icon={
              <FontAwesomeIcon
                icon={faUserInjured}
                style={{ color: '#F8F0E3' }}
                size={'2xl'}
                height={36}
              />
            }
            className='mb-3'
            color='danger'
            progress={{ color: 'danger', value: 100 }}
            text='Leads'
            title={
              <strong>
                <p style={{ color: '#F8F0E3' }}>Leads</p>
              </strong>
            }
            value={<p style={{ color: '#F8F0E3' }}>{leads?.data ?? 0}</p>}
          />
        </CCol>
        <CCol xs={3}>
          <CWidgetStatsC
            icon={
              <FontAwesomeIcon
                icon={faUserTie}
                style={{ color: '#F8F0E3' }}
                size={'2xl'}
                height={36}
              />
            }
            className='mb-3'
            color='dark'
            progress={{ color: 'dark', value: 100 }}
            text='Agents'
            title={
              <strong>
                <p style={{ color: '#F8F0E3' }}>Agents</p>
              </strong>
            }
            value={<p style={{ color: '#F8F0E3' }}>{agents?.data ?? 0}</p>}
          />
        </CCol>
        <CCol xs={3}>
          <CWidgetStatsC
            icon={
              <FontAwesomeIcon
                icon={faStethoscope}
                style={{ color: '#F8F0E3' }}
                size={'2xl'}
                height={36}
              />
            }
            className='mb-3'
            color='success'
            progress={{ color: 'success', value: 100 }}
            text='Services'
            title={
              <strong>
                <p style={{ color: '#F8F0E3' }}>Services</p>
              </strong>
            }
            value={<p style={{ color: '#F8F0E3' }}>{services?.data ?? 0}</p>}
          />
        </CCol>
        <CCol xs={3}>
          <CWidgetStatsC
            icon={
              <FontAwesomeIcon
                icon={faBell}
                style={{ color: '#F8F0E3' }}
                size={'2xl'}
                height={36}
              />
            }
            className='mb-3'
            color='info'
            progress={{ color: 'info', value: 100 }}
            text='Services'
            title={
              <strong>
                <p style={{ color: '#F8F0E3' }}>Inbox</p>
              </strong>
            }
            value={<p style={{ color: '#F8F0E3' }}>{contactUs?.count ?? 0}</p>}
          />
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={12}>
          <CCard className='mb-6'>
            <CCardHeader>
              <CCol xs='12'>
                <strong>Latest 10 Leads</strong>
                <CFormInput
                  style={{ float: 'right', display: 'block', width: '40%' }}
                  type='search'
                  placeholder='Search Latest Leads...'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {/*<CButton onClick={() => goToCategoriesOrders()} color='warning'*/}
                {/*         style={{ float: 'right', display: 'block', width: '20%' }} className='mb-2'>*/}
                {/*  Go to Control*/}
                {/*</CButton>*/}

              </CCol>
            </CCardHeader>
            <CCardBody>
              <CForm>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope='col'>#</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Order ID</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Service</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>User</CTableHeaderCell>
                      {/*<CTableHeaderCell scope="col">Notes</CTableHeaderCell>*/}
                      <CTableHeaderCell scope='col'>Register By</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Issue Date</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {filteredCategoriesOrders != null &&
                    filteredCategoriesOrders.length > 0 &&
                    filteredCategoriesOrders.map((categoryOrder, index) => {
                      // categories.map((category, index) => {
                      return (
                        <CTableRow id={`categoryOrder-${categoryOrder._id}`} key={index}>
                          <CTableHeaderCell scope='row'>{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{categoryOrder?.orderId}</CTableDataCell>
                          <CTableDataCell>{categoryOrder.categoryName}</CTableDataCell>
                          <CTableDataCell>{`${categoryOrder.userName} - ${
                            categoryOrder.userMobile || 'No Mobile'
                          }`}</CTableDataCell>
                          {/*<CTableDataCell>{categoryOrder.notes || '-'}</CTableDataCell>*/}
                          <CTableDataCell>{`${categoryOrder?.registerBy || '-'}`}</CTableDataCell>
                          <CTableDataCell>{categoryOrder.createdAt}</CTableDataCell>
                        </CTableRow>
                      )
                      // })
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

export default Dashboard
