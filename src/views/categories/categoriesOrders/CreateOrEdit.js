import React, { useEffect, useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import api from '../../../api/api'
import {useNavigate, useParams} from 'react-router-dom'

//
export default function CreateOrEdit() {
  const { categoryOrderId } = useParams()
  const navigate = useNavigate()

  const [addOrEdit, setProcess] = useState('add')
  const [activeKey, setActiveKey] = useState(1)
  const [users, setUsers] = useState([])
  const [categories, setCategories] = useState([])
  const [categoryOrder, setCategoryOrder] = useState({})
  const [selectedUser, setSelectedUser] = useState('0')

  const [alertShow, setAlertShow] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [alertType, setAlertType] = useState('');

  const handleChange = (key, value) => setCategoryOrder({ ...categoryOrder, [key]: value })

  useEffect(() => {
    getCategoriesData().then((r) => {})
    getUsers().then((r) => {})
    if (typeof categoryOrderId !== 'undefined') {
      setProcess('edit')
      getCategoryOrderData().then((r) => {})
    }
  }, [])

  const getCategoryOrderData = async () => {
    try {
      console.log(`getCategoryOrderData`)
      let data = await axios
        .get(`${api.getCategoryOrderById}${categoryOrderId}`)
        .then(({ data }) => data)
      console.log(data.data?.userName)
      let categoryOrderData = data.data
      setCategoryOrder(categoryOrderData ?? [])
      setSelectedUser(categoryOrderData?.userId)
      console.log('getCategoryOrderData')
      console.log(categoryOrderData)
    } catch (e) {
      console.log(e)
    }
  }
  const getUsers = async () => {
    try {
      const response = await axios.get(api.getAllUsers)
      console.log(response.data?.data)
      setUsers(response.data?.data ?? [])
    } catch (e) {
      setUsers(null)
      console.log(e)
    }
  }
  const getCategoriesData = async () => {
    try {
      const response = await axios.get(api.getAllCategories)
      setCategories(response.data?.data ?? [])
    } catch (e) {
      setCategories(null)
      console.log(e)
    }
  }

  const updateCategoryOrderById = async () => {
    let data = await axios.patch(`${api.updateCategoryOrderById}${categoryOrderId}`, categoryOrder)
    console.log(data)
    setAlertText('Record updated successfully!')
    setAlertShow(true)
    setAlertType('success')
    navigate('/categoryOrderControl')
  }

  const categoriesOrderAdminCreateUser = async () => {
    try {
      console.log(api.categoriesOrderAdminCreateUser)
      const response = await axios.post(`${api.categoriesOrderAdminCreateUser}`, categoryOrder)
      console.log(response.data)
      console.log(response.data?.data)
      setAlertText('Record created successfully!')
      setAlertShow(true)
      setAlertType('success')
      navigate('/categoryOrderControl')
    } catch (e) {
      setAlertText(e.response?.data?.message);
      setAlertShow(true);
      setAlertType('danger')
      setCategoryOrder([])
      console.log(e.response.data.errors)
    }
  }

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
              {addOrEdit === 'add' ? (
                <strong>Create Order</strong>
              ) : addOrEdit === 'edit' ? (
                <strong>{`Updating Service Order ID ${categoryOrder?.orderId}`}</strong>
              ) : (
                <strong>??? ??? ???</strong>
              )}
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3">
                <CCol xs="6">
                  <CFormLabel htmlFor="userId">User {categoryOrder?.userId}</CFormLabel>
                  <CFormSelect
                    value={categoryOrder?.userId}
                    onChange={(e) => handleChange('userId', e.target.value)}
                  >
                    <option>Select User</option>
                    {users.length > 0 &&
                      users.map((user) => (
                        <option key={user?._id} value={user?._id || ''}>
                          {`${user.name} - ${user.phone || user.email}`}
                        </option>
                      ))}
                  </CFormSelect>
                </CCol>
                <CCol xs="6">
                  <CFormLabel htmlFor="categoryId">Service</CFormLabel>
                  <CFormSelect
                    value={categoryOrder?.categoryId}
                    onChange={(e) => handleChange('categoryId', e.target.value)}
                  >
                    <option>Select Service</option>
                    {categories.length > 0 &&
                      categories.map((category) => (
                        <option key={category?._id} value={category?._id || ''}>
                          {category.name}
                        </option>
                      ))}
                  </CFormSelect>
                </CCol>
                <CCol xs="12">
                  <CFormLabel htmlFor="notes">Notes</CFormLabel>
                  <CFormTextarea
                    name="notes"
                    value={categoryOrder?.notes || ''}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    rows="3"
                    placeholder="Type your notes..."
                  >
                    {categoryOrder?.notes}
                  </CFormTextarea>
                </CCol>
                <div>
                  <CCol xs={'auto'}>
                    {addOrEdit === 'add' ? (
                      <CButton
                        onClick={() => categoriesOrderAdminCreateUser()}
                        color="info"
                        className="mb-3"
                      >
                        Create
                      </CButton>
                    ) : addOrEdit === 'edit' ? (
                      <CButton
                        onClick={() => updateCategoryOrderById()}
                        color="warning"
                        className="mb-3"
                      >
                        Update
                      </CButton>
                    ) : (
                      <CButton disabled color="danger" className="mb-3">
                        ??????
                      </CButton>
                    )}
                  </CCol>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}
