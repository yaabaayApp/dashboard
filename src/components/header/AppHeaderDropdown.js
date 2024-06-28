import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faEnvelope, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons'

import avatar2 from './../../assets/images/avatars/9.jpg'
import api from '../../api/api'
import axios from 'axios'
import userStore from '../../store/user'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const setUserData = userStore((state) => state.setUserData)
  const [contactUs, setContactUs] = useState({}) // contactUs Object
  const [adminId, setAdminId] = useState('')

  const getUnreadMessagesCount = async () => {
    try {
      console.log(api.getUnreadMessagesCount)
      const response = await axios.get(api.getUnreadMessagesCount)
      console.log(response.data)
      setContactUs(response.data ?? [])
    } catch (e) {
      setContactUs(null)
      console.log(e)
    }
  }

  useEffect(() => {
    let { state } = JSON.parse(localStorage.getItem('user'))
    if (state && state?.user?.role === 'admin') {
      setUserData(state.user)
      console.log(state.user._id)
      setAdminId(state.user._id)
    }
  }, [])

  const logoutCallback = () => {
    setUserData(null)
    navigate('/admin')
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar2} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Notifications</CDropdownHeader>
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon icon={cilBell} className="me-2" />*/}
        {/*  Updates*/}
        {/*  <CBadge color="info" className="ms-2">*/}
        {/*    42*/}
        {/*  </CBadge>*/}
        {/*</CDropdownItem>*/}
        <CDropdownItem href="/admin/contactUsControl">
          <FontAwesomeIcon icon={faEnvelope} className="me-2" />
          Inbox
          <CBadge color="danger" className="ms-2">
            {contactUs.count}
          </CBadge>
        </CDropdownItem>
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon icon={cilTask} className="me-2" />*/}
        {/*  Tasks*/}
        {/*  <CBadge color="danger" className="ms-2">*/}
        {/*    42*/}
        {/*  </CBadge>*/}
        {/*</CDropdownItem>*/}
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon icon={cilCommentSquare} className="me-2" />*/}
        {/*  Comments*/}
        {/*  <CBadge color="warning" className="ms-2">*/}
        {/*    42*/}
        {/*  </CBadge>*/}
        {/*</CDropdownItem>*/}
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        {/* <CDropdownItem href={`#/profile/${adminId}`}>
          <FontAwesomeIcon icon={faUserCircle} className='me-2' />
          Profile
        </CDropdownItem> */}
        <CDropdownItem href="/admin/settingsControl">
          <FontAwesomeIcon icon={faCog} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownHeader className="bg-light fw-semibold py-2">Auth</CDropdownHeader>
        {/*<CDropdownItem href="#/Login">*/}
        {/*  <FontAwesomeIcon icon={faArrowAltCircleRight} className="me-2" />*/}
        {/*  Login*/}
        {/*</CDropdownItem>*/}
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon icon={cilFile} className="me-2" />*/}
        {/*  Projects*/}
        {/*  <CBadge color="primary" className="ms-2">*/}
        {/*    42*/}
        {/*  </CBadge>*/}
        {/*</CDropdownItem>*/}
        {/*<CDropdownDivider />*/}
        <CDropdownItem onClick={logoutCallback}>
          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
