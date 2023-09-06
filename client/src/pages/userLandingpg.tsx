// import React from 'react'
import styles from '../styles/userLanding.module.css'
import NewQuickbite from "../components/NewQuickbite"
import PopularFood from "../components/PopularFood"
import PopularDelivery from "../components/PopularDelivery"
import Header from '../components/Header'
import AllPopularFood from '../components/AllPopularFood'
 import AllPopularRestaurant from '../components/AllPopularRestaurant'
 import  UserLoginImg from "../assets/food1.jpeg"
 import HeaderNotAuth from "../components/HeaderNotAuth"

const userLandingpg = () => {
  return (
    <div className={styles.container}>
       { localStorage.getItem("token")? <Header/>: <HeaderNotAuth/>}
        <img src={UserLoginImg} alt=""  className={styles.userImg}/>
        <NewQuickbite/>
         <PopularDelivery/>
         <PopularFood/>
         <AllPopularFood/>
         <AllPopularRestaurant/>
    </div>
  )
}

export default userLandingpg;