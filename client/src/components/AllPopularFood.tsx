// import React from 'react'
import { MouseEventHandler, useState } from 'react';
import styles from "../styles/newQuickbite.module.css"
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import spinner from "../assets/spinner.gif";
import { useEffect } from "react";
import { getUserAllFoods } from '../slices/userGetAllFoodSlice';

const AllPopularFood = () => {

   const [show, setShow] = useState(false)
   const dispatch = useAppDispatch();
   const {allFoods, isLoading} = useAppSelector((state) => state.userAllFood)
   useEffect(() => {
      dispatch(getUserAllFoods());
   }, [dispatch]);
   
   const handleClick: MouseEventHandler<HTMLImageElement> = () => {
      setShow(!show)
   }
   return (
      <div id='newQUICK' className={styles.newQuick}>
         <div className={`${styles.divider}  w-70% md: h-0.5 bg-deepBlue`} ></div>
         <div className={styles.newQuickFlex}>
            <h2 className={styles.newQuickText}>All Food</h2>
            <div onClick={handleClick} style={{ cursor: "pointer" }}>
               {show ? <i className="fa-solid fa-chevron-up" style={{ fontSize: "20px" }}></i> :<i className="fa-solid fa-chevron-down" style={{ fontSize: "20px" }}></i>}
            </div >

         </div>
         <div className={`${styles.divider}  w-70% md: h-0.5 bg-deepBlue`} ></div>
         <div className={show ? styles.hide : ""}>
            {
               isLoading ? <img src={spinner} alt="" className={styles.spinner} /> :
               <>
            <div className={` ${styles.cardContainer}`}>

               {allFoods?.slice(0, 3).map((item) => (
                <div className={styles.Card} key={item.id}>
                  <div className={styles.cardHead}>
                     <img src={item.food_image} alt="" className="h-60 w-100" />
                  </div>
                  <div className={styles.cardBody}>
                     <h2 className={styles.cardheading}>{item.name}</h2>
                     <p className={styles.cardText}>{item.description}</p>
                  </div>
                  <div className={`${styles.divider}  w-70% md: h-0.5 bg-deepBlue`} ></div>
                  <div className={styles.cardFooter}>
                     <span className={styles.amount}>
                        <Link to="/allvendorfoods"> <button onClick={()=>localStorage.setItem('vendorid', item.vendorId)} className={`${styles.more} p-4 bg-deepBlue rounded-lg mt-7 text-white`}>Order Now</button></Link>
                     </span>
                     <span className={styles.totalAmount}>N{item.price}</span>
                  </div>
               </div>
        ))}
            </div>
            <div className={styles.btnContainer}>
       <Link to="/allfoods"> <button className={`${styles.more} p-4 bg-deepBlue rounded-lg mt-7 text-white` }>see more</button></Link>
        </div>
            {/* <div className={styles.btnContainer}>
            <button className={`${styles.more} p-4 bg-lightBlue rounded-lg mt-7 text-white` }>see more</button>
         </div> */}
         </>
         }
         </div>


      </div>
   )
}

export default AllPopularFood