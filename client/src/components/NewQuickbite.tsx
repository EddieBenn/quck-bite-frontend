// import { useState } from "react"
import { MouseEventHandler, useState, useEffect } from 'react';
// import Dropdown from "../assets/dropdown.svg"
import styles from "../styles/newQuickbite.module.css"
// import  FoodOne from "../assets/food1.png"
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getNewFoods } from '../slices/newFoodsSlice';
import spinner from "../assets/spinner.gif"


const NewQuickbite = () => {
   const [show, setShow] = useState(false)
   const dispatch = useAppDispatch();
   const { newFood, isLoading } = useAppSelector((state) => state.newFood);

   useEffect(() => {
      dispatch(getNewFoods())
   }, [dispatch])
   // const [show, setShow] = useState(true)
   const handleClick: MouseEventHandler<HTMLImageElement> = () => {
      setShow(!show)
   }

   return (
      <div id='newQUICK' className={styles.newQuick}>
         <div className={`${styles.divider}  w-70% md: h-0.5 bg-deepBlue`} ></div>
         <div className={styles.newQuickFlex}>
            <h2 className={styles.newQuickText}>New on QuickBite</h2>
            <div onClick={handleClick} style={{ cursor: "pointer" }}>
               {show ? <i className="fa-solid fa-chevron-up" style={{ fontSize: "20px" }}></i> : <i className="fa-solid fa-chevron-down" style={{ fontSize: "20px" }}></i>}
            </div >

         </div>
         <div className={`${styles.divider}  w-70% md: h-0.5 bg-deepBlue`} ></div>
         <div className={`${show ? styles.hide : ""}`}>
            {
               isLoading ? <img src={spinner} alt="" className={styles.spinner} /> :
                  <>

                     <div className={` ${styles.cardContainer}`}>

                        {
                           newFood?.slice(0,3).map((foodNew) => (
                               <div className={styles.Card}>
                                 <div className={styles.cardHead}>
                                    <img src={foodNew.food_image} alt="" className="h-60 w-100" />
                                 </div>
                                 <div className={styles.cardBody}>
                                    <h2 className={styles.cardheading}>{foodNew.name}</h2>
                                    <p className={styles.cardText}>{foodNew.description}</p>
                                 </div>
                                 <div className={`${styles.divider}  w-70% md: h-0.5 bg-deepBlue`} ></div>
                                 <div className={styles.cardFooter}>
                                    <span className={styles.amount}>
                                       <Link to="/allvendorfoods"> <button onClick={()=>localStorage.setItem('vendorid', foodNew.vendorId)} className={`${styles.more} p-4 bg-deepBlue rounded-lg mt-7 text-white`}>Order Now</button></Link>
                                    </span>
                                    <span className={styles.totalAmount}>N{foodNew.price}</span>
                                 </div>
                              </div>
                           ))

                        }
                     </div>
                     <div className={styles.btnContainer}>
                        <Link to="/newfoods"><button className={`${styles.more} sm:mt-4 w-full p-4 bg-deepBlue rounded-lg mt-7 text-white`}>see more</button></Link>
                     </div>
                  </>
            }

         </div>


         <div className={`${styles.divider}  w-70% md: h-0.5 bg-deepBlue`}></div>


      </div>
   )
}

export default NewQuickbite