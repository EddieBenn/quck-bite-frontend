import { useState } from 'react'
import styles from "../styles/header.module.css"
import { Link } from 'react-router-dom'
import ProfileImg from "../assets/profile.png"
import Logo from "../assets/LogoBite.svg"
import { toast } from 'react-toastify'

const VendorHeader = () => {
  const [collapse, setCollapse] = useState(true)

  const toggleButton = () => setCollapse(!collapse)
  const handleLogout = ()=>{
    try {
      localStorage.clear()
      window.location.href ="/"
     toast.success("Logout successfully")

    } catch (error) {
     throw new Error("An error occur")
    }
  }

  // const menus = 
  //   [{  id : "Id", Updateprofile:"Update profile", Order :  "Order", Changepassword : "Change Password"}]
  // const [dropdown, setDropDown] = useState(true)
  // const toggle = () =>setDropDown(!dropdown)


  return (
    <div>
      <nav className={`${styles.navbar}  container mx-auto px-10 `} >
        <div className={`flex sm:items-center space-x-20 md:flex items-center justify-between mx-20 ${"animate__animated animate__backInDown"}`}>

          <Link to='/vendordashboard'><div className={`${styles.logoContainer}`}>

            <img src={Logo} alt="" className={`${styles.logo} pr-3 `} />

          </div>


          </Link>

          <div className="hidden md:flex space-x-6 justify-between">

          </div>
          <div className={styles.flexProfile}>

            <img src={ProfileImg} alt="" className={styles.profileImg} />

            {/* <img src={ProfileImg} alt="" className={styles.profileImg} onClick={toggle}/> */}

            {/* <ul className={`${dropdown ?styles.dropdown : ""} 
         absolute  top-20 w-60 h-15 p-5  bg-brown-300 rounded`  }>
          {menus.map((menu)=>(<li className={styles.menu} key={menu.id}>{menu.Order}<br/> <Link to ="/userupdatesprofile" >{menu.Updateprofile} </Link><br/>
          {menu.Changepassword}
          </li>
          )) 
          
          }
          
         </ul >        */}
            <p>Adeyemo.O</p>
            <Link to="/"><button onClick={handleLogout} className={`${styles.SignUp} bg-deepBlue `}>Logout</button></Link>

          </div>


          <button id="menu-btn" onClick={toggleButton} className={`${styles.hamburger}  hamburger w-20 h-14 md:hidden focus:outline-none lg:hidden`}>
            {collapse ? <i className='fas fa-bars'></i> : <i className='fas fa-times'></i>}
          </button>
        </div>

        <div className={`${collapse ? styles.mobileView : ""} mt-20 md:hidden bg-deepBlue`} >
          <div className=" sm:hidden w-auto sm:self-center left-6 right-6 drop-shadow-md ">
            {/* <a href="#" className="mx-auto">Vendors</a> */}

            <Link to="/"><button onClick={handleLogout} className={`${styles.Logout} bg-deepBlue  hover:bg-lightBlue min-w-full`}>Logout</button> </Link>

          </div>
        </div>

      </nav>

    </div>
  )
}

export default VendorHeader