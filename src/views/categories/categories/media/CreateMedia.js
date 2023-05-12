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
} from '@coreui/react'
import axios from 'axios'
import api from '../../../../api/api'
import { useParams, useNavigate } from 'react-router-dom'
import '../../../../css/style.css'
import categoryMediaTypes from '../../../../utils/categoryMediaTypes'
//
export default function CreateOrEdit() {
  const { categoryId } = useParams()
  const navigate = useNavigate()

  const [images, setImages] = useState([])

  const [serviceMediaData, setServiceMediaData] = useState({})
  const [category, setCategory] = useState({}) // contactUs Object

  const [alertShow, setAlertShow] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [alertType, setAlertType] = useState('')

  const [mediaType, setMediaType] = useState('')

  const handleChange = (key, value) => {
    console.log(value)
    setServiceMediaData({ ...serviceMediaData, [key]: value })
  }


  useEffect(() => {
    // getServiceMedia().then((r) => {
    // })
    getCategoryData().then((r) => {
    })
  }, [])

  const getCategoryData = async () => {
    try {
      console.log(`getCategoryData`)
      let res = await axios.get(`${api.getCategoryById}${categoryId}`).then(({ data }) => data)
      let categoriesData = res.data
      setCategory(categoriesData)

    } catch (e) {
      console.log(e)
    }
  }
  const uploadServiceMedia = async () => {
    try {
      let formData = new FormData()
      // console.log(serviceMediaData)
      if (typeof serviceMediaData !== 'undefined') {
        Object.entries(serviceMediaData).map(([key, value]) => {
          formData.append(key, value)
        })
        await axios.post(`${api.uploadServiceMedia}${categoryId}`, formData).then(function(res) {
          console.log(res.data)
          setAlertText('Media added successfully!')
          setAlertShow(true)
          setAlertType('success')
          navigate(`/admin/categoryMedia/${categoryId}`)
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
            <CAlert className={'alert alert-danger'} color={'danger'}>{alertText}</CAlert>
          ) : ('')}

          {alertShow && alertType === 'success' ? (
            <CAlert className={'alert alert-success'} color={'success'}>{alertText}</CAlert>
          ) : ('')}

          <CCard className='mb-4'>
            <CCardHeader>
              <strong>{`Add Media to Service : ${category?.name}`}</strong>
            </CCardHeader>
            <CCardBody>
              <CForm className='row g-3'>

                <CCol xs='6'>
                  <CFormLabel htmlFor='title'>Title</CFormLabel>
                  <CFormInput
                    name='title'
                    value={serviceMediaData?.title || ''}
                    type='text'
                    placeholder='Type media title'
                    onChange={(e) => handleChange('title', e.target.value)}
                  />
                </CCol>
                <CCol xs='6'>
                  <CFormLabel htmlFor='type'>Type</CFormLabel>
                  <CFormSelect
                    value={serviceMediaData?.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                  >
                    <option>Select media type</option>
                    {categoryMediaTypes.map((mediaTypeRow) => (
                      <option key={mediaTypeRow.value}
                              value={mediaTypeRow.value || ''}>
                        {mediaTypeRow.label}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                {serviceMediaData?.type === 'link' ? (
                  <CCol xs='6'>
                    <CFormLabel htmlFor='fileOrLink'>Link</CFormLabel>
                    <CFormInput
                      name='fileOrLink'
                      value={serviceMediaData?.fileOrLink || ''}
                      type='text'
                      placeholder='Paste your link here!'
                      onChange={(e) => handleChange('fileOrLink', e.target.value)}
                    />
                  </CCol>
                ) : ('')}

                {serviceMediaData?.type !== 'link' ? (
                  <CCol xs='12'>
                    <CFormLabel htmlFor='image'>Media file</CFormLabel>
                    <CFormInput
                      type='file'
                      name='fileOrLink'
                      onChange={(e) => handleChange('fileOrLink', e.target.files[0])}
                      id='formFile'
                    />
                  </CCol>
                ) : ('')}

                <CCol xs='6'>
                  <CFormLabel htmlFor='sort'>Sort</CFormLabel>
                  <CFormInput
                    name='sort'
                    value={serviceMediaData?.sort || ''}
                    type='number'
                    placeholder='Type sort order'
                    onChange={(e) => handleChange('sort', e.target.value)}
                  />
                </CCol>

                <div>
                  <CCol xs='auto'>
                    <CButton onClick={() => uploadServiceMedia()} color='info' className='mb-3'>
                      Add Media
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
