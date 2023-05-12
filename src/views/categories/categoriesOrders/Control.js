import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {
  CAlert,
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
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
} from '@coreui/react'

import api from '../../../api/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPen, faBriefcase } from '@fortawesome/free-solid-svg-icons'

//
export default function Control() {
  const navigate = useNavigate()

  const [categoriesOrders, setCategoriesOrders] = useState([])
  const [query, setQuery] = useState('')

  const [alertShow, setAlertShow] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [alertType, setAlertType] = useState('');

  console.log(Object.values(categoriesOrders))

  const filteredCategoriesOrders = categoriesOrders.filter((categoryOrder) => {
    console.log(categoryOrder)
    return Object.values(categoryOrder).toString().toLowerCase().includes(query.toLowerCase())
  })
  const getCategoriesOrdersData = async () => {
    try {
      console.log(api.getAllCategoriesOrders)
      const response = await axios.get(api.getAllCategoriesOrders)
      console.log(response.data?.data)
      setCategoriesOrders(response.data?.data ?? [])
    } catch (e) {
      // setCategoriesOrders(null)
      console.log(e)
    }
  }

  const categoryOrderDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this Category Order ?')) return false
    try {
      console.log(id)
      console.log(`${api.categoryOrderDelete}${id}`)
      await axios.delete(`${api.categoryOrderDelete}${id}`)
      document.getElementById('categoryOrder-' + id).remove()
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
  const categoryOrderEdit = async (id) => {
    try {
      navigate(`/admin/${api.categoryOrderEdit}${id}`)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getCategoriesOrdersData().then((r) => {})
  }, [])

  return (
    <>
      <CRow>
        <CCol xs={12}>

          { alertShow && alertType === 'danger' ? (
            <CAlert className={'alert alert-danger'}>{alertText}</CAlert>
          ) : ('')}

          { alertShow && alertType === 'success' ? (
            <CAlert className={'alert alert-success'}>{alertText}</CAlert>
          ) : ('')}
          <CCard className="mb-4">
            <CCardHeader>
              <CCol xs="12">
                <strong>Leads Control</strong>
                <CFormInput
                  style={{ float: 'right', display: 'block', width: '40%' }}
                  type="search"
                  placeholder="Search Leads Control..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </CCol>
            </CCardHeader>
            <CCardBody>
              <CForm>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">#</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Order ID</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Service</CTableHeaderCell>
                      <CTableHeaderCell scope="col">User</CTableHeaderCell>
                      {/*<CTableHeaderCell scope="col">Notes</CTableHeaderCell>*/}
                      <CTableHeaderCell scope="col">Register By</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Issue Date</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Control</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {filteredCategoriesOrders != null &&
                      filteredCategoriesOrders.length > 0 &&
                      filteredCategoriesOrders.map((categoryOrder, index) => {
                        // categories.map((category, index) => {
                        return (
                          <CTableRow id={`categoryOrder-${categoryOrder._id}`} key={index}>
                            <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
                            <CTableDataCell>{categoryOrder?.orderId}</CTableDataCell>
                            <CTableDataCell>{categoryOrder.categoryName}</CTableDataCell>
                            <CTableDataCell>{`${categoryOrder.userName} - ${
                              categoryOrder.userMobile || 'No Mobile'
                            }`}</CTableDataCell>
                            {/*<CTableDataCell>{categoryOrder.notes || '-'}</CTableDataCell>*/}
                            <CTableDataCell>{`${categoryOrder?.registerByUserName || '-'} - ${categoryOrder?.registerByUserMobile || '-'}`}</CTableDataCell>
                            <CTableDataCell>{categoryOrder.createdAt}</CTableDataCell>
                            <CTableDataCell>
                              <span
                                onClick={() => categoryOrderEdit(categoryOrder._id)}
                                color="info"
                              >
                                <FontAwesomeIcon icon={faPen} />
                              </span>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <span
                                onClick={() => categoryOrderDelete(categoryOrder._id)}
                                color="danger"
                              >
                                <FontAwesomeIcon icon={faTrashAlt} />
                              </span>
                            </CTableDataCell>
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
