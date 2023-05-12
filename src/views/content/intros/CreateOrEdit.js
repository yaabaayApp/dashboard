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
  CFormTextarea,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import api from '../../../api/api'
import { useParams, useNavigate } from 'react-router-dom'
import '../../../css/style.css'

export default function CreateOrEdit() {
  const { introId } = useParams()
  const navigate = useNavigate()

  const [addOrEdit, setProcess] = useState('add')
  const [intros, setIntros] = useState({}) // contactUs Object

  const [alertShow, setAlertShow] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [alertType, setAlertType] = useState('')

  const handleChange = (key, value) => {
    console.log(value)
    setIntros({ ...intros, [key]: value })
  }


  useEffect(() => {
    getIntrosData().then((r) => {
    })
    if (typeof introId !== 'undefined') {
      setProcess('edit')
    }
  }, [])
  //
  const getIntrosData = async () => {
    try {
      console.log(`getIntroData`)
      let res = await axios.get(`${api.getIntroById}${introId}`).then(({ data }) => data)
      console.log(`${api.getIntroById}${introId}`)
      console.log(res)
      let introsData = res.data
      setIntros(
        introsData,
      )
    } catch (e) {
      console.log(e)
    }
  }

  const updateIntroById = async () => {
    try {
      let formData = new FormData()
      if (typeof intros !== 'undefined') {
        Object.entries(intros).map(([key, value]) => {
          formData.append(key, value)
        })
      }
      formData.delete('_id')
      formData.delete('__v')
      formData.delete('createdAt')
      console.log('formData')
      console.log(formData)
      console.log('formData')
      let data = await axios.patch(`${api.updateIntroById}${introId}`, formData)
      setAlertText('Record updated successfully!')
      setAlertShow(true)
      setAlertType('success')
      navigate('/introControl')
    } catch (e) {
      setAlertText(e.response?.data?.message)
      setAlertShow(true)
      setAlertType('danger')
      console.log(e)
    }
  }

  const introCreate = async () => {
    try {
      let formData = new FormData()
      console.log(intros)
      if (typeof intros !== 'undefined') {
        Object.entries(intros).map(([key, value]) => {
          formData.append(key, value)
        })
        await axios.post(api.introCreate, formData).then(function(res) {
          console.log(res.data)
          setAlertText('Record created successfully!')
          setAlertShow(true)
          setAlertType('success')
          navigate('/introControl')
        })
      }
    } catch (e) {
      setAlertText(e.response?.data?.message)
      setAlertShow(true)
      setAlertType('danger')
      console.log(e)
    }
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>

          {alertShow && alertType === 'danger' ? (
            <CAlert className={'alert alert-danger'}>{alertText}</CAlert>
          ) : ('')}

          {alertShow && alertType === 'success' ? (
            <CAlert className={'alert alert-success'}>{alertText}</CAlert>
          ) : ('')}

          <CCard className='mb-4'>
            <CCardHeader>
              {addOrEdit === 'add' ? (
                <strong>Add Intro</strong>
              ) : addOrEdit === 'edit' ? (
                <strong>{`Editing Intro : ${intros?.title}`}</strong>
              ) : (
                <strong>??? ??? ???</strong>
              )}
            </CCardHeader>
            <CCardBody>
              <CForm className='row g-3'>

                {addOrEdit === 'edit' ? (
                  <CCol xs='6'>
                    <img src={`${process.env.REACT_APP_AMAZON_AWS_URL}${intros?.image}`} style={{ width: '500px' }}
                         alt='' />
                  </CCol>
                ) : (
                  ''
                )}

                  <CCol xs='12'>
                    <CFormLabel htmlFor='fileOrLink'>Image</CFormLabel>
                    <CFormInput
                      type='file'
                      name='image'
                      onChange={(e) => handleChange('image', e.target.files[0])}
                      id='formFile'
                    />
                  </CCol>

                <CCol xs='6'>
                  <CFormLabel htmlFor='title'>Title</CFormLabel>
                  <CFormInput
                    name='title'
                    value={intros?.title || ''}
                    type='text'
                    placeholder='Type intro title'
                    onChange={(e) => handleChange('title', e.target.value)}
                  />
                </CCol>
                <CCol xs='6'>
                  <CFormLabel htmlFor='sort'>Sort</CFormLabel>
                  <CFormInput
                    name='sort'
                    value={intros?.sort || ''}
                    type='number'
                    placeholder='Type sort order'
                    onChange={(e) => handleChange('sort', e.target.value)}
                  />
                </CCol>
                <CCol xs='12'>
                  <CFormLabel htmlFor='desc'>Description</CFormLabel>
                  <CFormTextarea
                    name='desc'
                    value={intros?.desc || ''}
                    onChange={(e) => handleChange('desc', e.target.value)}
                    rows='3'
                    placeholder='Type intro description...'
                  >
                    {intros?.desc}
                  </CFormTextarea>
                </CCol>
                <div>
                  <CCol xs='auto'>
                    {addOrEdit === 'add' ? (
                      <CButton onClick={() => introCreate()} color='info' className='mb-3'>
                        Create
                      </CButton>
                    ) : addOrEdit === 'edit' ? (
                      <CButton onClick={() => updateIntroById()} color='warning' className='mb-3'>
                        Update
                      </CButton>
                    ) : (
                      <CButton disabled color='danger' className='mb-3'>
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
