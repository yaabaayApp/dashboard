import React, { useEffect, useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CTabPane,
} from '@coreui/react'
import axios from 'axios'
import api from '../../../api/api'
import active from '../../../utils/active'
import gender from '../../../utils/gender'
import role from '../../../utils/role'
import { useParams } from 'react-router-dom'
import countryCode from '../../../utils/countryCode'
import userStore from '../../../store/user'

//
export default function CreateOrEdit() {
  const { userId } = useParams()

  const [user, setUser] = useState() // user Object
  // const [placeHolder, setPlaceHolder] = useState() // user Object
  const [users, setUsers] = useState([])

  const [alertShow, setAlertShow] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [alertType, setAlertType] = useState('')

  const handleChange = (key, value) => setUser({ ...user, [key]: value })

  useEffect(() => {
    getAdminData().then((r) => {
    })
    getUsers().then((r) => {
    })
  }, [])

  const getAdminData = async () => {
    try {
      console.log(`getUserData`)
      let res = await axios.get(`${api.getAdminById}${userId}`).then(({ data }) => data)
      console.log(res.data?.name)
      let adminData = res.data
      // setUser({
      //   name: adminData.name,
      //   phone: '',
      //   email: '',
      //   password: '',
      //   avatar: adminData.avatar,
      //   role: adminData.role,
      //   active: adminData.active,
      //   registerBy: adminData.registerBy,
      //   gender: adminData.gender,
      //   resellerCode: adminData.resellerCode,
      // })
      setUser({ ...adminData, phone: adminData.countryCode + adminData.phone, password: '' })
      // setPlaceHolder({
      //   phone: `${adminData.countryCode}${adminData.phone}`,
      //   email: adminData.email,
      // })
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

  const updateUserById = async () => {
    try {
      console.log(user)
      let formData = new FormData()
      if (typeof user !== 'undefined') {
        Object.entries(user).map(([key, value]) => {
          formData.append(key, value)
        })
      }
      let data = await axios.patch(`${api.adminUpdateUserById}${userId}`, formData)
      setAlertText('Record updated successfully!')
      setAlertShow(true)
      setAlertType('success')
      console.log(formData)
      console.log(data.data)
      getAdminData().then((r) => {
      })
    } catch (e) {
      setAlertText(e.response?.data?.message)
      setAlertShow(true)
      setAlertType('danger')
    }
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>

          {alertShow && alertType === 'danger' ? (
            <CAlert  className={'alert alert-danger'}>{alertText}</CAlert>
          ) : ('')}

          {alertShow && alertType === 'success' ? (
            <CAlert  className={'alert alert-success'}>{alertText}</CAlert>
          ) : ('')}

          <CCard className='mb-4'>
            <CCardHeader>
              <strong>{`Updating user ${user?.name}`}</strong>
            </CCardHeader>
            <CCardBody>
              <CForm className='row g-3'>
                <CCol xs='12'>
                  <img
                    src={`${process.env.REACT_APP_AMAZON_AWS_URL}${user?.avatar}`}
                    style={{ height: 200 }}
                    alt=''
                  />
                </CCol>
                <CCol xs='12'>
                  <CFormLabel htmlFor='avatar'>Avatar</CFormLabel>
                  <CFormInput
                    type='file'
                    name='avatar'
                    // source={require(`${process.env.REACT_APP_AMAZON_AWS_URL}${user?.avatar}`)}
                    onChange={(e) => handleChange('avatar', e.target.files[0])}
                    id='formFile'
                  />
                </CCol>
                <CCol xs='6'>
                  <CFormLabel htmlFor='name'>Name</CFormLabel>
                  <CFormInput
                    name='name'
                    value={user?.name || ''}
                    type='text'
                    placeholder='Type user name'
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </CCol>
                <CCol xs='6'>
                  <CFormLabel htmlFor='email'>Email address</CFormLabel>
                  <CFormInput
                    name='email'
                    value={user?.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                    type='email'
                    placeholder='Type user email'
                    // placeholder={placeHolder?.email || 'Type user email'}
                  />
                </CCol>
                <CCol xs='6'>
                  <CFormLabel htmlFor='phone'>Phone</CFormLabel>
                  <CFormInput
                    name='phone'
                    value={user?.phone || ''}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder='Type user phone'
                    // placeholder={placeHolder?.phone || ''}
                  />
                </CCol>
                <CCol xs='6'>
                  <CFormLabel htmlFor='role'>Role</CFormLabel>
                  <CFormSelect
                    value={user?.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                  >
                    <option>Open this select menu</option>
                    {role.map((roleRow) => (
                      <option key={roleRow.value} value={roleRow.value || ''}>
                        {roleRow.label}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol xs='6'>
                  <CFormLabel htmlFor='gender'>Gender</CFormLabel>
                  <CFormSelect
                    value={user?.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                  >
                    <option>Select user gender</option>
                    {gender.map((genderRow) => (
                      <option key={genderRow.value} value={genderRow.value || ''}>
                        {genderRow.label}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol xs='6'>
                  <CFormLabel htmlFor='registerBy'>Register By</CFormLabel>
                  <CFormSelect
                    value={user?.registerBy}
                    onChange={(e) => handleChange('registerBy', e.target.value)}
                  >
                    <option>Select Inviter User</option>
                    {users.length > 0 &&
                    users.map((user) => (
                      <option key={user?._id} value={user?._id || ''}>
                        {`${user.name} - ${user.phone || user.email}`}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol xs='6'>
                  <CFormLabel htmlFor='active'>Status</CFormLabel>
                  <CFormSelect
                    value={user?.active}
                    onChange={(e) => handleChange('active', e.target.value)}
                  >
                    <option>Select user status</option>
                    {active.map((statusRow) => (
                      <option key={statusRow.value} value={statusRow.value || ''}>
                        {statusRow.label}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol xs='6'>
                  <CFormLabel htmlFor='password'>Password</CFormLabel>
                  <CFormInput
                    name='password'
                    value={user?.password || ''}
                    onChange={(e) => handleChange('password', e.target.value)}
                    type='password'
                    placeholder='e.g. ••••••••'
                  />
                </CCol>
                <div>
                  <CCol xs='auto'>
                    <CButton onClick={() => updateUserById()} color='warning' className='mb-3'>
                      Update
                    </CButton>
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
