import React, {useEffect} from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import userStore from "../store/user";

import { useNavigate } from 'react-router-dom';

const DefaultLayout = () => {

  const navigate = useNavigate();

  const [user] = userStore(state => [state.user])

  useEffect(() => {
    if( user === null ) navigate('/admin');
  }, [])

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
