import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios'
import {
  CAlert,
  CButton,
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

import api from '../../../../api/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPhotoVideo, faTrashAlt, faDownload, faExternalLinkAlt,

} from '@fortawesome/free-solid-svg-icons'
import pdfImg from '../../../../assets/pdf.png'
import videoImg from '../../../../assets/youtube.png'
import linkImg from '../../../../assets/images/link.png'

export default function Control() {

  const { categoryId } = useParams()

  const navigate = useNavigate()

  const [categoryMedia, setCategoryMedia] = useState({})

  const [alertShow, setAlertShow] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [alertType, setAlertType] = useState('')


  const getServiceMedia = async () => {
    try {
      console.log(`getCategoryMedia called!`)
      let res = await axios.get(`${api.getCategoryMedia}${categoryId}`).then(({ data }) => data)
      console.log(`${api.getCategoryMedia}${categoryId}`)
      console.log(res)
      let categoryMedia = res.data
      setCategoryMedia(
        categoryMedia,
      )

    } catch (e) {
      setAlertText(e.response?.data?.message)
      setAlertShow(true)
      setAlertType('danger')
      console.log(e)
    }
  }

  const mediaDelete = async (id) => {
    if (!window.confirm('This Media will be deleted forever, Are you sure ?'))
      return false
    try {
      console.log(id)
      console.log(`${api.deleteSingleCategoryMedia}${id}`)
      await axios.delete(`${api.deleteSingleCategoryMedia}${id}`)
      document.getElementById('media-' + id).remove()
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


  const createMedia = async () => {
    try {
      navigate(`/admin/createMedia/${categoryId}`)
    } catch (e) {
      setAlertText(e.response?.data?.message)
      setAlertShow(true)
      setAlertType('danger')
      console.log(e)
    }
  }


  useEffect(() => {
    getServiceMedia().then(r => {
    })
  }, [])

  return (
    <>

      <CRow>
        <div className='mb-4 gap-2'>
          <CButton onClick={() => createMedia()} style={{ backgroundColor: '#0000FF', border: 'none' }}>
            <FontAwesomeIcon icon={faPhotoVideo} className='me-2' />
            Add Media
          </CButton>
        </div>
        <CCol xs={12}>

          {alertShow && alertType === 'danger' ? (
            <CAlert className={'alert alert-danger'}>{alertText}</CAlert>
          ) : ('')}

          {alertShow && alertType === 'success' ? (
            <CAlert className={'alert alert-success'}>{alertText}</CAlert>
          ) : ('')}

          <CCard className='mb-4'>
            <CCardHeader>
              <strong>Media Files</strong>
            </CCardHeader>
            <CCardBody>
              <CForm>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope='col'>#</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>File</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Type</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Title</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Sort</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Control</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>

                    {(categoryMedia != null && categoryMedia.length > 0) &&
                    categoryMedia.map((mediaRow, index) => {
                      return (
                        <CTableRow id={`media-${mediaRow._id}`} key={index}>
                          <CTableHeaderCell scope='row'>{index + 1}</CTableHeaderCell>
                          <CTableDataCell>
                            {mediaRow?.type === 'image' ? (
                              <CCardImage src={`${process.env.REACT_APP_AMAZON_AWS_URL}${mediaRow?.fileOrLink}`} alt=''
                                          style={{ height: '50', width: '2rem' }} />
                            ) : mediaRow?.type === 'file' ? (
                              <img src={pdfImg} alt='' style={{ height: '50', width: '2rem' }} />
                            ) : mediaRow?.type === 'video' ? (
                              <img src={videoImg} alt='' style={{ height: '50', width: '2rem' }} />
                            ) : mediaRow?.type === 'link' ? (
                              <img src={linkImg} alt='' style={{ height: '50', width: '2rem' }} />
                            ) : ('')}

                          </CTableDataCell>
                          <CTableDataCell>{(mediaRow.type).charAt(0).toUpperCase() + (mediaRow.type).slice(1).toLowerCase()}</CTableDataCell>
                          <CTableDataCell>{mediaRow.title}</CTableDataCell>
                          <CTableDataCell>{mediaRow.sort}</CTableDataCell>
                          <CTableDataCell>
                            {mediaRow?.type === 'video' || mediaRow?.type === 'file' ? (
                              <a href={`${process.env.REACT_APP_AMAZON_AWS_URL}${mediaRow?.fileOrLink}`} target='_blank'
                                 rel='noopener noreferrer' download>
                                <span>
                              <FontAwesomeIcon icon={faDownload} />
                            </span>
                              </a>
                            ) : mediaRow?.type === 'link' ? (
                              <a href={mediaRow?.fileOrLink} target='_blank' rel='noopener noreferrer'>
                                <span>
                              <FontAwesomeIcon icon={faExternalLinkAlt} />
                            </span>
                              </a>
                            ) : ('')}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span onClick={() => mediaDelete(mediaRow._id)} color='danger'>
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
