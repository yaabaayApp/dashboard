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
import api from '../../api/api'
import { useParams } from 'react-router-dom'
import data from '@coreui/coreui/js/src/dom/data'
import subject from '../../utils/subject'

//
export default function CreateOrEdit() {
  const { contactUsId } = useParams()

  const [addOrEdit, setProcess] = useState('add')
  const [contactUs, setContactUs] = useState({}) // contactUs Object

  const handleChange = (key, value) => setContactUs({ ...contactUs, [key]: value })

  useEffect(() => {
    getContactUsData().then((r) => {
    })
    if (typeof contactUsId !== 'undefined') {
      setProcess('edit')
    }
  }, [])
  //
  const getContactUsData = async () => {
    try {
      console.log(`getContactUsData`)
      let res = await axios.get(`${api.getContactUsById}${contactUsId}`).then(({ data }) => data)
      console.log(`${api.getContactUsById}${contactUsId}`)
      console.log(res)
      let contactUsData = res.data
      setContactUs(
        contactUsData
      )
    } catch (e) {
      console.log(e)
    }
  }

  const updateContactUsById = async () => {
    console.log('updateContactUsById Called!')

    let data = await axios.patch(`${api.updateContactUsById}${contactUsId}`, contactUs)
    console.log(data)

    getContactUsData().then((r) => {
    })
  }


  const updateMessageStatus = async () => {
    console.log('updateMessageStatus Called!')
    let data = await axios.patch(`${api.updateMessageStatus}${contactUsId}`, contactUs)
    // console.log(data)
    getContactUsData().then((r) => {
    })
  }

  const contactUsCreate = async () => {
    try {
      console.log('contactUsCreate Called!')
      console.log('contactUs')
      console.log(contactUs)
      console.log(api.contactUsCreate)
      const contact = await axios.post(`${api.contactUsCreate}`, contactUs)

      console.log(contact.data)
      console.log(contact.data?.data)
    } catch (e) {
      setContactUs(null)
      console.log(e)
    }
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className='mb-4'>
            <CCardHeader>
              {addOrEdit === 'add' ? (
                <strong>
                  Add contact message <b>FORM</b>
                </strong>
              ) : addOrEdit === 'edit' ? (
                <strong>{`Contact Message`}</strong>
              ) : (
                <strong>??? ??? ???</strong>
              )}
            </CCardHeader>
            <CCardBody>
              <CForm className='row g-3'>
                {addOrEdit === 'add' ? (
                  <CCol xs='6'>
                    <CFormLabel htmlFor='name'>Name</CFormLabel>
                    <CFormInput
                      name='name'
                      value={contactUs?.name || ''}
                      type='text'
                      placeholder='Type form initiator name'
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                  </CCol>
                ) : (
                  <CCol xs='6'>
                    <CFormLabel htmlFor='name'>Name</CFormLabel>
                    <CFormInput
                      name='name'
                      value={contactUs?.name || ''}
                      disabled
                      readOnly
                      type='text'
                      placeholder=''
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                  </CCol>
                )}
                {addOrEdit === 'add' ? (
                  <CCol xs='6'>
                    <CFormLabel htmlFor='email'>Email address</CFormLabel>
                    <CFormInput
                      name='email'
                      value={contactUs?.email || ''}
                      onChange={(e) => handleChange('email', e.target.value)}
                      type='email'
                      placeholder='Type form initiator email'
                    />
                  </CCol>
                ) : (
                  <CCol xs='6'>
                    <CFormLabel htmlFor='email'>Email address</CFormLabel>
                    <CFormInput
                      name='email'
                      value={contactUs?.email || ''}
                      disabled
                      readOnly
                      onChange={(e) => handleChange('email', e.target.value)}
                      type='email'
                      placeholder=''
                    />
                  </CCol>
                )}

                {addOrEdit === 'add' ? (
                  <CCol xs='6'>
                    <CFormLabel htmlFor='phone'>Phone</CFormLabel>
                    <CFormInput
                      name='phone'
                      value={`${contactUs?.countryCode || ''}${contactUs?.phone || ''}`}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder='Type form initiator phone number'
                    />
                  </CCol>
                ) : (
                  <CCol xs='6'>
                    <CFormLabel htmlFor='phone'>Phone</CFormLabel>
                    <CFormInput
                      name='phone'
                      disabled
                      readOnly
                      value={`${contactUs?.countryCode || ''}${contactUs?.phone || ''}`}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder=''
                    />
                  </CCol>
                )}

                {addOrEdit === 'add' ? (
                  <CCol xs='6'>
                    <CFormLabel htmlFor='subject'>Subject</CFormLabel>
                    <CFormSelect onChange={(e) => handleChange('subject', e.target.value)}>
                      {subject.map((subjectRow) => (
                        <option key={subjectRow.value} value={subjectRow?.subject || ''}>
                          {subjectRow.label}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                ) : (

                  <CCol xs='6'>
                    <CFormLabel htmlFor='subject'>Subject</CFormLabel>
                    <CFormInput
                      name='subject'
                      disabled
                      readOnly
                      value={contactUs?.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      placeholder=''
                    />
                  </CCol>
                )}
                {addOrEdit === 'add' ? (
                  <CCol xs='12'>
                    <CFormLabel htmlFor='message'>Message</CFormLabel>
                    <CFormTextarea
                      name='message'
                      value={contactUs?.message || ''}
                      onChange={(e) => handleChange('message', e.target.value)}
                      rows='3'
                      placeholder='Type your message...'
                    >
                      {contactUs?.message}
                    </CFormTextarea>
                  </CCol>
                ) : (
                  <CCol xs='12'>
                    <CFormLabel htmlFor='message'>Message</CFormLabel>
                    <CFormTextarea
                      name='message'
                      disabled
                      readOnly
                      value={contactUs?.message || ''}
                      onChange={(e) => handleChange('message', e.target.value)}
                      rows='3'
                    >
                      {contactUs?.message}
                    </CFormTextarea>
                  </CCol>
                )}

                <div>
                  <CCol xs='auto'>
                    {contactUs?.status === '0' ? (
                      <CButton onClick={() => updateMessageStatus()} color='danger' className='mb-3'>
                        Set as Read
                      </CButton>
                    ) : contactUs?.status === '1' ?
                      //   addOrEdit === 'edit' ? (
                      //   // <CButton
                      //   //   onClick={() => updateContactUsById()}
                      //   //   color="warning"
                      //   //   className="mb-3"
                      //   // >
                      //   //   Update
                      //   // </CButton>
                      // ) :
                      (
                        <CButton disabled color='success' className='mb-3'>
                          Read
                        </CButton>
                      ) : ('')}
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
