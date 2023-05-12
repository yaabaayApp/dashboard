import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href={process.env.REACT_APP_PROJECT_WEBSITE_ADDRESS} target="_blank" rel="noopener noreferrer">
          Yaabaay
        </a>
        <span className="ms-1">&copy; {new Date().getFullYear()}</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by &copy; Salezeus</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
