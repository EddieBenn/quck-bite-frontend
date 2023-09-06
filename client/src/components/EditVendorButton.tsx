// import React from 'react'
import '../styles/EditVendor.css'
import { Link } from 'react-router-dom'
const EditVendorButton = () => {
  return (
    <div className='vendor-edit-container'>
    <Link to="/editVendorbutton/3"> <button className='vendor-edit'> Click to Edit </button></Link> 
    </div>
  )
}

export default EditVendorButton
