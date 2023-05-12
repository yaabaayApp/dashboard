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
import sliderTypes from "../../../utils/sliderTypes";
//
export default function CreateOrEdit() {
  const { sliderId } = useParams()
  const navigate = useNavigate()

  const [addOrEdit, setProcess] = useState('add')
  const [sliders, setSliders] = useState({}) // contactUs Object

  const [alertShow, setAlertShow] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [alertType, setAlertType] = useState('')

  const handleChange = (key, value) => {
    console.log(value)
    setSliders({ ...sliders, [key]: value })
  }


  useEffect(() => {
    getSlidersData().then((r) => {
    })
    if (typeof sliderId !== 'undefined') {
      setProcess('edit')
    }
  }, [])
  //
  const getSlidersData = async () => {
    try {
      console.log(`getsliderData`)
      let res = await axios.get(`${api.getSliderById}${sliderId}`).then(({ data }) => data)
      console.log(`${api.getSliderById}${sliderId}`)
      console.log(res)
      let slidersData = res.data
      setSliders(
        slidersData,
      )
    } catch (e) {
      console.log(e)
    }
  }

  const updateSliderById = async () => {
    try {
      let formData = new FormData()
      if (typeof sliders !== 'undefined') {
        Object.entries(sliders).map(([key, value]) => {
          formData.append(key, value)
        })
      }
      console.log('formData')
      console.log(formData)
      console.log('formData')
      let data = await axios.patch(`${api.updateSliderById}${sliderId}`, formData)
      setAlertText('Record updated successfully!')
      setAlertShow(true)
      setAlertType('success')
      navigate('/slidersControl')
    } catch (e) {
      setAlertText(e.response?.data?.message)
      setAlertShow(true)
      setAlertType('danger')
      console.log(e)
    }
  }

  const sliderCreate = async () => {
    try {
      let formData = new FormData()
      console.log(sliders)
      if (typeof sliders !== 'undefined') {
        Object.entries(sliders).map(([key, value]) => {
          formData.append(key, value)
        })
        await axios.post(api.sliderCreate, formData).then(function(res) {
          console.log(res.data)
          setAlertText('Record created successfully!')
          setAlertShow(true)
          setAlertType('success')
          navigate('/slidersControl')
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
                <strong>Add Slider</strong>
              ) : addOrEdit === 'edit' ? (
                <strong>{`Editing Slider : ${sliders?.title}`}</strong>
              ) : (
                <strong>??? ??? ???</strong>
              )}
            </CCardHeader>
            <CCardBody>
              <CForm className='row g-3'>

                {addOrEdit === 'edit' && sliders?.type === 'fileOrLink' ? (
                  <CCol xs='12'>
                    <img src={`${process.env.REACT_APP_AMAZON_AWS_URL}${sliders?.fileOrLink}`} style={{ height: 200 }}
                         alt='' />
                  </CCol>
                ) : (
                  ''
                )}
                <CCol xs='6'>
                  <CFormLabel htmlFor='type'>Type</CFormLabel>
                  <CFormSelect
                    value={sliders?.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                  >
                    <option>Select content type</option>
                    {sliderTypes.map((mediaTypeRow) => (
                      <option key={mediaTypeRow.value}
                              value={mediaTypeRow.value || ''}>
                        {mediaTypeRow.label}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                {sliders?.type === 'link' ? (
                  <CCol xs='6'>
                    <CFormLabel htmlFor='fileOrLink'>Link</CFormLabel>
                    <CFormInput
                      name='fileOrLink'
                      value={sliders?.fileOrLink || ''}
                      type='text'
                      placeholder='Paste your link here!'
                      onChange={(e) => handleChange('fileOrLink', e.target.value)}
                    />
                  </CCol>
                ) : ('')}
                <CCol xs='6'>
                  <CFormLabel htmlFor='title'>Title</CFormLabel>
                  <CFormInput
                    name='title'
                    value={sliders?.title || ''}
                    type='text'
                    placeholder='Type slider title'
                    onChange={(e) => handleChange('title', e.target.value)}
                  />
                </CCol>
                <CCol xs='6'>
                  <CFormLabel htmlFor='sort'>Sort</CFormLabel>
                  <CFormInput
                    name='sort'
                    value={sliders?.sort || ''}
                    type='number'
                    placeholder='Type sort order'
                    onChange={(e) => handleChange('sort', e.target.value)}
                  />
                </CCol>
                {sliders?.type !== 'link' ? (
                  <CCol xs='12'>
                    <CFormLabel htmlFor='fileOrLink'>File</CFormLabel>
                    <CFormInput
                      type='file'
                      name='fileOrLink'
                      onChange={(e) => handleChange('fileOrLink', e.target.files[0])}
                      id='formFile'
                    />
                  </CCol>
                ) : ('')}
                <CCol xs='12'>
                  <CFormLabel htmlFor='content'>Content</CFormLabel>
                  <CFormTextarea
                    name='content'
                    value={sliders?.content || ''}
                    onChange={(e) => handleChange('content', e.target.value)}
                    rows='3'
                    placeholder='Type slider content...'
                  >
                    {sliders?.content}
                  </CFormTextarea>
                </CCol>
                <div>
                  <CCol xs='auto'>
                    {addOrEdit === 'add' ? (
                      <CButton onClick={() => sliderCreate()} color='info' className='mb-3'>
                        Create
                      </CButton>
                    ) : addOrEdit === 'edit' ? (
                      <CButton onClick={() => updateSliderById()} color='warning' className='mb-3'>
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
