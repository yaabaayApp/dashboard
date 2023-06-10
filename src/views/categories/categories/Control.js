import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
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

import api from '../../../api/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPen, faPhotoVideo } from '@fortawesome/free-solid-svg-icons'
import noImage from '../../../assets/images/no-image2.png'


//
export default function Control() {

  const { mainCategory } = useParams()
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])

  const [alertShow, setAlertShow] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [alertType, setAlertType] = useState('')


  const getCategoriesData = async () => {
    try {
      console.log(api.getAllCategories)
      let response = await axios.get(api.getAllCategories);
      if( mainCategory )
        response = await axios.get(`${api.getSubCategories}${mainCategory}`);
      console.log(response.data?.data)
      setCategories(response.data?.data ?? [])
    } catch (e) {
      setCategories([])
      console.log(e)
    }
  }

  const categoryDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this Service ?'))
      return false
    try {
      console.log(id)
      console.log(`${api.categoryDelete}${id}`)
      await axios.delete(`${api.categoryDelete}${id}`)
      document.getElementById('category-' + id).remove()
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

  const categoryEdit = async (id) => {
    try {
      navigate(`/admin${api.categoryEdit}${id}`)
    } catch (e) {
      console.log(e)
    }
  }

  const categoryMedia = async (id) => {
    try {
      navigate(`/admin${api.categoryMedia}${id}`)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getCategoriesData().then(r => {})
  }, [mainCategory])

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
              <strong>Services Control</strong>
            </CCardHeader>
            <CCardBody>
              <CForm>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope='col'>#</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Logo</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Background</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Name</CTableHeaderCell>
                      { mainCategory ? '' : <CTableHeaderCell scope='col'>Subs</CTableHeaderCell> }
                      <CTableHeaderCell scope='col'>Date</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Sort</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Media</CTableHeaderCell>
                      <CTableHeaderCell scope='col'>Control</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>

                    {(categories.length > 0) &&
                    categories.map((category, index) => {
                      return (
                        <CTableRow id={`category-${category._id}`} key={index}>
                          <CTableHeaderCell scope='row'>{index + 1}</CTableHeaderCell>
                          <CTableDataCell>
                            {category?.logo ? (
                              <img src={`${process.env.REACT_APP_AMAZON_AWS_URL}${category?.logo}`}
                                   style={{ height: '50', width: '3rem' }} alt='' />
                            ) : (
                              <img src={noImage} style={{ height: '50', width: '3rem' }} alt='' />
                            )}

                          </CTableDataCell>
                          <CTableDataCell>
                            {category?.background ? (
                              <img src={`${process.env.REACT_APP_AMAZON_AWS_URL}${category?.background}`}
                                   style={{ height: '50', width: '3rem' }} alt='' />
                            ) : (
                              <img src={noImage} style={{ height: '50', width: '3rem' }} alt='' />
                            )}

                          </CTableDataCell>
                          <CTableDataCell>{category.name?.en}</CTableDataCell>
                          {mainCategory ? '' :
                            <CTableDataCell>
                              <Link to={`/admin/categoryControl/${category._id}`}>Subs</Link>
                            </CTableDataCell>
                          }
                          <CTableDataCell>{category.createdAt}</CTableDataCell>
                          <CTableDataCell>{category.sort}</CTableDataCell>
                          <CTableDataCell>
                            &nbsp;&nbsp;&nbsp;
                            <span onClick={() => categoryMedia(category._id)} color='info'>
                              <FontAwesomeIcon icon={faPhotoVideo} />
                            </span>
                          </CTableDataCell>
                          <CTableDataCell>
                            <span onClick={() => categoryEdit(category._id)} color='info'>
                              <FontAwesomeIcon icon={faPen} />
                            </span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span onClick={() => categoryDelete(category._id)} color='danger'>
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
