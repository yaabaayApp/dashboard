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
//
export default function CreateOrEdit() {
  const { FAQId } = useParams()
  const navigate = useNavigate()

  const [addOrEdit, setProcess] = useState('add')
  const [faqs, setFaqs] = useState({}) // contactUs Object

  const [alertShow, setAlertShow] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [alertType, setAlertType] = useState('')

  const handleChange = (key, value) => {
    console.log(value)
    setFaqs({ ...faqs, [key]: value })
  }


  useEffect(() => {
    getFAQById().then((r) => {
    })
    if (typeof FAQId !== 'undefined') {
      setProcess('edit')
    }
  }, [])
  //
  const getFAQById = async () => {
    try {
      console.log(`getFAQById`)
      let res = await axios.get(`${api.getFAQById}${FAQId}`).then(({ data }) => data)
      console.log(`${api.getFAQById}${FAQId}`)
      console.log(res)
      let FAQsData = res.data
      setFaqs(
        FAQsData,
      )
    } catch (e) {
      console.log(e)
    }
  }


  const updateFAQById = async () => {
   try{
     console.log('updateFAQById Called!')
     delete faqs['_id']
     delete faqs['__v']
     delete faqs['createdAt']
     // faqs.delete('__v')
     // faqs.delete('createdAt')
     let data = await axios.patch(`${api.updateFAQById}${FAQId}`, faqs)
     console.log(data)

     getFAQById().then((r) => {
     })
     setAlertText('Record updated successfully!')
     setAlertShow(true)
     setAlertType('success')
     navigate('/FAQsControl')
   }catch (e) {
     setAlertText(e.response?.data?.message)
     setAlertShow(true)
     setAlertType('danger')
     console.log(e)
   }
  }

  const createFAQ = async () => {
    try {
      console.log('createFAQ Called!')
      console.log(api.createFAQ)
      const res = await axios.post(`${api.createFAQ}`, faqs)
      console.log(res.data?.data)
      setAlertText('Record created successfully!')
      setAlertShow(true)
      setAlertType('success')
      navigate('/FAQsControl')
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
                <strong>Add Frequently Asked Question</strong>
              ) : addOrEdit === 'edit' ? (
                <strong>{`Editing FAQ : ${faqs?.question}`}</strong>
              ) : (
                <strong>??? ??? ???</strong>
              )}
            </CCardHeader>
            <CCardBody>
              <CForm className='row g-3'>
                <CCol xs='6'>
                  <CFormLabel htmlFor='answer'>Question</CFormLabel>
                  <CFormInput
                    name='question'
                    value={faqs?.question || ''}
                    type='text'
                    placeholder='Type FAQ Question'
                    onChange={(e) => handleChange('question', e.target.value)}
                  />
                </CCol>
                <CCol xs='6'>
                  <CFormLabel htmlFor='sort'>Sort</CFormLabel>
                  <CFormInput
                    name='sort'
                    value={faqs?.sort || ''}
                    type='number'
                    placeholder='Type sort order'
                    onChange={(e) => handleChange('sort', e.target.value)}
                  />
                </CCol>
                <CCol xs='12'>
                  <CFormLabel htmlFor='answer'>Answer</CFormLabel>
                  <CFormTextarea
                    name='answer'
                    value={faqs?.answer || ''}
                    onChange={(e) => handleChange('answer', e.target.value)}
                    rows='3'
                    placeholder='Type FAQ Answer...'
                  >
                    {faqs?.answer}
                  </CFormTextarea>
                </CCol>
                <div>
                  <CCol xs='auto'>
                    {addOrEdit === 'add' ? (
                      <CButton onClick={() => createFAQ()} color='info' className='mb-3'>
                        Create
                      </CButton>
                    ) : addOrEdit === 'edit' ? (
                      <CButton onClick={() => updateFAQById()} color='warning' className='mb-3'>
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
