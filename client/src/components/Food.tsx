import React from 'react'

 import FoodImg from "../assets/mobileFrontpg.jpg"
import styles from "../styles/food.module.css"
import AllFood from './AllFood'

const Food = () => {
  return (
    <>
   
    <div className={styles.overlay}></div>
    <div className='mt-50' > 
<img src={FoodImg} alt="" className={`${styles.FoodImage}   `}/>         

<AllFood/>

    </div>
    </>
  )
}

export default Food