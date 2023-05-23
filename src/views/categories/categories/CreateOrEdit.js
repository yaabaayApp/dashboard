import React, { useEffect, useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader, CCardImage,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CCardText,
  CFormTextarea,
  CRow, CFormSelect,
} from '@coreui/react'
import axios from 'axios'
import api from '../../../api/api'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

//
export default function CreateOrEdit() {
  const { categoryId } = useParams()

  const [categories, setCategories] = useState([])

  const [addOrEdit, setProcess] = useState('add')
  const [category, setCategory] = useState({})

  const [alertShow, setAlertShow] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [alertType, setAlertType] = useState('')

  const handleChange = (key, value) => setCategory({ ...category, [key]: value })

  const navigate = useNavigate()

  useEffect(() => {
    getCategoriesData().then(r => {})
    getCategoryData().then((r) => {})
    if (typeof categoryId !== 'undefined') {
      setProcess('edit')
    }
  }, [])
  //
  const getCategoryData = async () => {
    try {
      console.log(`getCategoryData`)
      let res = await axios.get(`${api.getCategoryById}${categoryId}`).then(({ data }) => data)
      // console.log(`${api.getCategoryById}${categoryId}`)
      // console.log(res)
      let categoriesData = res.data
      setCategory(categoriesData)
      // console.log(`editor state category ${editorState}`)
      // console.log(categories)
    } catch (e) {
      console.log(e)
    }
  }
  const updateCategoryById = async () => {
    try {
      let formData = new FormData()
      if (typeof category !== 'undefined') {
        Object.entries(category).map(([key, value]) => {
          formData.append(key, value)
        })
      }
      if(category.logo){
        formData.append('logo', category.logo[0])
      }
      if(category.background)

      formData.append('background', category.background[0])
      console.log(`categories ${category}`)
      formData.delete('_id')
      formData.delete('__v')
      formData.delete('createdAt')
      formData.delete('updatedAt')
      let data = await axios.patch(`${api.updateCategoryById}${categoryId}`, formData)
      // console.log(`form-data after axios ${formData}`)
      console.log(`data ${data}`)
      setAlertText('Updated successfully!')
      setAlertShow(true)
      setAlertType('success')
      navigate('/admin/categoryControl')
    } catch (e) {
      setAlertText(e.response?.data?.message)
      setAlertShow(true)
      setAlertType('danger')
      console.log(e)
    }
  }
  const addCategory = async () => {
    try {
      console.log(api.addCategory)
      let formData = new FormData()
      console.log(typeof category !== 'undefined')
      if (typeof category !== 'undefined') {
        Object.entries(category).map(([key, value]) => {
          formData.append(key, value)

        })
      }
      formData.append('logo', category.logo[0])
      formData.append('background', category.background[0])
      await axios.post(api.addCategory, formData).then(function(res) {

        if (res.data) {
          setAlertText(res.data.message)
          setAlertShow(true)
          setAlertType('danger')
        }
        //   console.log(`Categories ${categories}`)
        // console.log(`Categories ${Object.entries(categories)}`)
        console.log(res.data)
        setAlertText('Record created successfully!')
        setAlertShow(true)
        setAlertType('success')
        navigate('/admin/categoryControl')
      })
    } catch (e) {
      setAlertText(e.response?.data?.message)
      setAlertShow(true)
      setAlertType('danger')
      console.log(e)
    }
  }

  const getCategoriesData = async () => {
    try {
      console.log(api.getAllCategories)
      const response = await axios.get(api.getAllCategories);
      console.log(response.data?.data)
      //setCategories(response.data?.data ?? [])
      let list = []
      await Promise.all(
        response.data?.data.map( async (service, index) => {
          if( index === 0 )
            list.push({label: "Main Service", value: null})
          list.push({label: service.name, value: service._id})
        })
      );
      setCategories(list)
    } catch (e) {
      setCategories([])
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
              {addOrEdit === 'add' ? (
                <strong>Create Service</strong>
              ) : addOrEdit === 'edit' ? (
                <strong>{`Editing Service : ${category?.name}`}</strong>
              ) : (
                <strong>??? ??? ???</strong>
              )}
            </CCardHeader>
            <CCardBody>
              <CForm className='row g-3'>

                {addOrEdit === 'edit' ? (
                  <>
                    <CCol xs='6'>
                      <strong style={{ position: 'absolute' }}>Logo</strong>
                      <img src={`${process.env.REACT_APP_AMAZON_AWS_URL}${category?.logo}`}
                           style={{ height: '200px' , marginTop: '35px' }}
                           alt='' />
                    </CCol>
                    <CCol xs='6'>
                      <strong style={{ position: 'absolute' }}>Background</strong>
                      <img src={`${process.env.REACT_APP_AMAZON_AWS_URL}${category?.background}`}
                           style={{ height: '200px', marginTop: '35px' }}
                           alt='' />
                    </CCol>
                  </>
                ) : (
                  ''
                )}
                <CCol lg={6} xs='12'>
                  <CFormLabel htmlFor='background'>Background</CFormLabel>
                  <CFormInput
                    type='file'
                    name='background'
                    onChange={(e) => handleChange('background', e.target.files)}
                    id='formFile'
                  />
                </CCol>
                <CCol lg={6} xs='12'>
                  <CFormLabel htmlFor='logo'>Logo</CFormLabel>
                  <CFormInput
                    type='file'
                    name='logo'
                    onChange={(e) => handleChange('logo', e.target.files)}
                    id='formFile'
                  />
                </CCol>

                <CCol lg={12} xs={12}>
                  <CFormLabel htmlFor='name'>Name</CFormLabel>
                  <CFormInput
                    name='name'
                    value={category?.name || ''}
                    type='text'
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder='Type service name'
                  />
                </CCol>

                <CCol lg={6} xs={12}>
                  <CFormLabel htmlFor='sort'>Main Service</CFormLabel>
                  <CFormSelect
                    aria-label="Main Service"
                    value={category?.sub ?? null}
                    onChange={(e) => handleChange('sub', e.target.value)}
                    options={categories}
                  />
                </CCol>

                <CCol lg={6} xs={12}>
                  <CFormLabel htmlFor='sort'>Sort</CFormLabel>
                  <CFormInput
                    name='sort'
                    value={category?.sort || ''}
                    type='number'
                    placeholder='Type sort order'
                    onChange={(e) => handleChange('sort', e.target.value)}
                  />
                </CCol>
                <CCol xs='12'>
                  <CFormLabel htmlFor='desc'>Description</CFormLabel>
                  <CFormTextarea
                    name='desc'
                    value={category?.desc || ''}
                    onChange={(e) => handleChange('desc', e.target.value)}
                    rows='3'
                    placeholder='Type service description...'
                  >
                    {category?.desc}
                  </CFormTextarea>
                </CCol>
                <div>
                  <CCol xs='auto'>
                    {addOrEdit === 'add' ? (
                      <CButton onClick={() => addCategory()} color='info' className='mb-3'>
                        Create
                      </CButton>
                    ) : addOrEdit === 'edit' ? (
                      <CButton
                        onClick={() => updateCategoryById()}
                        color='warning'
                        className='mb-3'
                      >
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
