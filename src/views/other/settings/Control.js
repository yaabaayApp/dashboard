import React, { useEffect, useState } from 'react'
import axios from 'axios'

import api from '../../../api/api'
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
  CFormSwitch, CFormTextarea,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import role from '../../../utils/role'
import gender from '../../../utils/gender'
import active from '../../../utils/active'
import emailOrPhone from '../../../utils/emailOrPhone'

//
export default function Control() {
  const [settings, setSettings] = useState({})
  const [activeKey, setActiveKey] = useState(1)
  const [toggleSwitch, setToggleSwitch] = useState(true)
  const [reversed, setReversed] = useState(false)

  const [alertShow, setAlertShow] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [alertType, setAlertType] = useState('')

  const handleChange = (key, value) => setSettings({ ...settings, [key]: value, registration: ''+toggleSwitch+'' })

  const getSettingsData = async () => {
    try {
      console.log(api.getAllSettings)
      const response = await axios.get(api.getAllSettings)
      // console.log(response.data?.data.emailOrPhone) // CORRECT FORMAT
      // console.log(response.data?.data) // all data
      let settingsData = response.data?.data
      console.log(`settingsData : ` + JSON.stringify(settingsData))
      setSettings(settingsData)
      setToggleSwitch(response.data?.data.registration)
      console.log(`About : ${settingsData.about}`)
      console.log(`switch value ${toggleSwitch}`)
    } catch (e) {
      console.log(`getSettingsData error`)
      console.log(e)
    }
  }

  const saveSettings = async () => {
    try {
      const setting = await axios.post(`${api.saveSettings}`, settings)
      console.log(`save Setting func ${setting}`)
      console.log(`save Setting func ${settings}`)
      setAlertText('Settings successfully set!')
      setAlertShow(true)
      setAlertType('success')
    } catch (e) {
      setAlertText(e.response?.data?.message)
      setAlertShow(true)
      setAlertType('danger')
      console.log(e)
    }
  }

  const handleSwitchOnChange = (e) => {
    const newValue = !e.target.checked
    setSettings({ ...settings, registration: newValue })
    setToggleSwitch(newValue)
    console.log(toggleSwitch)
  }

  useEffect(() => {

    getSettingsData().then((r) => {})
  }, [])

  return (
    <>
      <CRow>
        <CCol xs={12}>

          {alertShow && alertType === 'danger' ? (
            <CAlert dismissible className={'alert alert-danger'} color={'danger'}>{alertText}</CAlert>
          ) : ('')}

          {alertShow && alertType === 'success' ? (
            <CAlert dismissible className={'alert alert-success'} color={'success'}>{alertText}</CAlert>
          ) : ('')}

          <CCard className="mb-4">
            <CCardBody>
              <CNav variant="tabs" layout="pills">
                <CNavItem>
                  <CNavLink
                    href="javascript:void(0);"
                    active={activeKey === 1}
                    onClick={() => setActiveKey(1)}
                  >
                    General
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="javascript:void(0);"
                    active={activeKey === 2}
                    onClick={() => setActiveKey(2)}
                  >
                    Roles
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="javascript:void(0);"
                    active={activeKey === 3}
                    onClick={() => setActiveKey(3)}
                  >
                    Content
                  </CNavLink>
                </CNavItem>
                {/*<CNavItem>*/}
                {/*  <CNavLink*/}
                {/*    href="javascript:void(0);"*/}
                {/*    active={activeKey === 3}*/}
                {/*    onClick={() => setActiveKey(3)}*/}
                {/*  >*/}
                {/*    Link*/}
                {/*  </CNavLink>*/}
                {/*</CNavItem>*/}
              </CNav>
              <CTabContent>
                <br />
                <CTabPane role="tabpanel" aria-labelledby="general-tab" visible={activeKey === 1}>
                  <CForm className="row g-3">
                    <CCol xs="6">
                      <CFormLabel htmlFor="management_email">Management Email</CFormLabel>
                      <CFormInput
                        name="managementEmail"
                        value={settings?.managementEmail || ''}
                        type="text"
                        onChange={(e) => handleChange('managementEmail', e.target.value)}
                      />
                    </CCol>
                    <CCol xs="6">
                      <CFormLabel htmlFor="supportEmail">Support Email</CFormLabel>
                      <CFormInput
                        name="supportEmail"
                        value={settings?.supportEmail || ''}
                        type="text"
                        onChange={(e) => handleChange('supportEmail', e.target.value)}
                      />
                    </CCol>
                    <CCol xs="6">
                      <CFormLabel htmlFor="support_number">Support Number</CFormLabel>
                      <CFormInput
                        name="supportNumber"
                        value={settings?.supportNumber || ''}
                        type="text"
                        onChange={(e) => handleChange('supportNumber', e.target.value)}
                      />
                    </CCol>
                    <CCol xs="6">
                      <CFormLabel htmlFor="emailOrPhone">Email or Phone</CFormLabel>
                      <CFormSelect onChange={(e) => handleChange('emailOrPhone', e.target.value)}>
                        <option value={settings?.emailOrPhone}>Open this select menu</option>
                        {emailOrPhone.map((row) => (
                          <option
                            selected={row.value === settings?.emailOrPhone}
                            key={row.value}
                            value={row.value}
                          >
                            {row.label}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>

                    <CCol xs="6">
                      <CFormLabel htmlFor="registration">Registration</CFormLabel>
                      <CFormSwitch
                        style={{ color: 'danger' }}
                        label="Allow new users to register"
                        onChange={(e) => handleChange('registration', e.target.checked)}
                        onClick={handleSwitchOnChange}
                        name="registration"
                      />

                    </CCol>
                  </CForm>
                </CTabPane>
                <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
                  <CForm className="row g-3">
                    <CCol xs="6">
                      <CFormLabel htmlFor="userRole">User Role</CFormLabel>
                      <CFormSelect onChange={(e) => handleChange('userRole', e.target.value)}>
                        <option value={settings?.userRole}>Open this select menu</option>
                        {role.map((row) => (
                          <option
                            selected={row.value === settings?.userRole}
                            key={row.value}
                            value={row.value}
                          >
                            {row.label}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol xs="6">
                      <CFormLabel htmlFor="agentRole">Agent Role</CFormLabel>
                      <CFormSelect onChange={(e) => handleChange('agentRole', e.target.value)}>
                        <option value={settings?.agentRole}>Open this select menu</option>
                        {role.map((row) => (
                          <option
                            selected={row.value === settings?.agentRole}
                            key={row.value}
                            value={row.value}
                          >
                            {row.label}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol xs="6">
                      <CFormLabel htmlFor="adminRole">Admin Role</CFormLabel>
                      <CFormSelect onChange={(e) => handleChange('adminRole', e.target.value)}>
                        <option value={settings?.adminRole}>Open this select menu</option>
                        {role.map((row) => (
                          <option
                            selected={row.value === settings?.adminRole}
                            key={row.value}
                            value={row.value}
                          >
                            {row.label}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                  </CForm>
                </CTabPane>
                <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 3}>
                  {/* TAB 3 */}
                  <CCol lg={12} xs={12}>
                    <CFormLabel htmlFor="adminRole">About</CFormLabel>
                    <CFormTextarea
                      name='answer'
                      value={settings?.about ?? ''}
                      onChange={(e) => handleChange('about', e.target.value)}
                      rows='3'
                      placeholder=''/>
                  </CCol>
                  <CCol lg={12} xs={12}>
                    <CFormLabel htmlFor="adminRole">Privacy Policy</CFormLabel>
                    <CFormTextarea
                      name='answer'
                      value={settings?.privacy ?? ''}
                      onChange={(e) => handleChange('privacy', e.target.value)}
                      rows='3'
                      placeholder=''/>
                  </CCol>
                  <CCol lg={12} xs={12}>
                    <CFormLabel htmlFor="adminRole">Terms & Conditions</CFormLabel>
                    <CFormTextarea
                      name='answer'
                      value={settings?.terms ?? ''}
                      onChange={(e) => handleChange('terms', e.target.value)}
                      rows='3'
                      placeholder=''/>
                  </CCol>
                </CTabPane>
                <div style={{ marginTop: 30 }}>
                  <CCol xs="auto">
                    <CButton onClick={() => saveSettings()} color="secondary" className="mb-3">
                      Save
                    </CButton>
                  </CCol>
                </div>
              </CTabContent>
              {/*// HEREEEEEEE*/}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}
