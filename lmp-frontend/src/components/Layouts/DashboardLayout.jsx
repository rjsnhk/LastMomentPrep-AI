import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import Navbar from './Navbar';

const DashboardLayout = ({children}) => {
  const {user}=useContext(UserContext);
  return (
    <div>
      <Navbar />
      {user && <div>{children}</div>}
    </div>
  )
}

export default DashboardLayout
