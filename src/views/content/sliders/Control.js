import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  CAlert,
  CCard,
  CCardBody,
  CCardHeader, CCardImage,
  CCol,
  CForm,
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
import { faTrashAlt, faPen, faDownload, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import noImage from './../../../assets/images/no-image.png'
import pdfImg from '../../../assets/pdf.png'
import videoImg from '../../../assets/youtube.png'
import linkImg from '../../../assets/images/link.png'


//
export default function Control() {

  const navigate = useNavigate()

  const [sliders, setSliders] = useState({}) // sliders Object

  const [alertShow, setAlertShow] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [alertType, setAlertType] = useState('')

  const getSlidersData = async () => {
    try {
      console.log(api.getAllSliders)
      const response = await axios.get(api.getAllSliders)
      console.log(response.data?.data)
      setSliders(response.data?.data ?? [])
    } catch (e) {
      setSliders(null)
      console.log(e)
    }
  }

  const sliderDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this Slider ?'))
      return false
    try {
      console.log(id)
      console.log(`${api.sliderDelete}${id}`)
      await axios.delete(`${api.sliderDelete}${id}`)
      document.getElementById('slider-' + id).remove()
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

  const sliderEdit = async (sliderId) => {
    try {
      navigate(`/admin/sliderEdit/${sliderId}`)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getSlidersData().then(r => {
    })
  }, [])

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
              <strong>Slider Control</strong>
            </CCardHeader>
            <CCardBody>
              <CForm>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope='col'>#</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Type</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>File</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Title</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Content</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Sort</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Control</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>

                    {(sliders != null && sliders.length > 0) &&
                    sliders.map((slider, index) => {
                      return (
                        <CTableRow id={`slider-${slider._id}`} key={index}>
                          <CTableHeaderCell scope='row'>{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{slider.type}</CTableDataCell>
                          <CTableDataCell>
                            {slider?.type === 'image' ? (
                              <CCardImage src={`${process.env.REACT_APP_AMAZON_AWS_URL}${slider?.fileOrLink}`} alt=''
                                          style={{ height: '50', width: '2rem' }} />
                            ) : slider?.type === 'file' ? (
                              <img src={pdfImg} alt='' style={{ height: '50', width: '2rem' }} />
                            ) : slider?.type === 'video' ? (
                              <img src={videoImg} alt='' style={{ height: '50', width: '2rem' }} />
                            ) : slider?.type === 'link' ? (
                              <img src={linkImg} alt='' style={{ height: '50', width: '2rem' }} />
                            ) : ('')}

                          </CTableDataCell>
                          <CTableDataCell>{slider.title}</CTableDataCell>
                          <CTableDataCell>{slider.content}</CTableDataCell>
                          <CTableDataCell>{slider.sort}</CTableDataCell>

                          <CTableDataCell>
                            {slider?.type === 'video' || slider?.type === 'file' ? (
                              <a href={`${process.env.REACT_APP_AMAZON_AWS_URL}${slider?.fileOrLink}`} target='_blank'
                                 rel='noopener noreferrer' download>
                                <span>
                              <FontAwesomeIcon icon={faDownload} />
                            </span>
                              </a>
                            ) : slider?.type === 'link' ? (
                              <a href={slider?.fileOrLink} target='_blank' rel='noopener noreferrer'>
                                <span>
                              <FontAwesomeIcon icon={faExternalLinkAlt} />
                            </span>
                              </a>
                            ) : ('')}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span onClick={() => sliderEdit(slider._id)} color='info'>
                              <FontAwesomeIcon icon={faPen} />
                            </span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span onClick={() => sliderDelete(slider._id)} color='danger'>
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </span>
                          </CTableDataCell>
                        </CTableRow>
                      )
                    })
                    }

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
