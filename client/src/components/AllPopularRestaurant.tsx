
import  { MouseEventHandler, useEffect, useState } from 'react';

import styles from "../styles/newQuickbite.module.css"
import Image from "../assets/restaurant-background.jpg";
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getPopularRestaurant} from '../slices/popularRestaurantSlice';
import spinner from  "../assets/spinner.gif"

const AllPopularRestaurant = () => {


    const[show, setShow] = useState(false)
       
    // const [show, setShow] = useState(true)
   const handleClick : MouseEventHandler<HTMLImageElement>=()=>{
     setShow(!show)
   }
    const dispatch = useAppDispatch();
   const { popularRestaurant, isLoading } = useAppSelector((state) => state.popularRestaurant);
      
   useEffect(()=>{
      dispatch(getPopularRestaurant()) 
    
   },[dispatch])
  return (
    <div id='newQUICK' className={styles.newQuick}>
    <div className={`${styles.divider}  w-70% md: h-0.5 bg-deepBlue`} ></div>
       <div className={styles.newQuickFlex}>
           <h2 className={styles.newQuickText}>All Restaurants</h2>
            <div onClick={handleClick} style={{cursor: "pointer"}}>
            {show ? <i className="fa-solid fa-chevron-up" style={{fontSize:"20px"}}></i> :<i className="fa-solid fa-chevron-down" style={{ fontSize: "20px" }}></i>}
            </div >
           
           </div>
           <div className={`${styles.divider}  w-70% md: h-0.5 bg-deepBlue`} ></div>
           <div className={`${show ? styles.hide : ""}`}>
            {
            isLoading ? <img src={spinner} alt="" /> :
            <>
           <div className={ ` ${styles.cardContainer}`}>
            {
               isLoading ? <img src={spinner} alt="" /> :

               popularRestaurant?.slice(0,3).map((restaurant)=>(
            <div className={styles.Card} key={restaurant.id}>
                <div className={styles.cardHead}>
                   <img src={restaurant.cover_image} alt="" className="h-60 w-100" />
                </div>
                <div className={styles.cardBody}>
                   <h2 className={styles.cardheading}>{restaurant.restaurant_name}</h2>
                   <p className={styles.cardText}>Powered By: {restaurant.company_name}</p>
                </div>
                <div className={`${styles.divider}  w-70% md: h-0.5 bg-deepBlue`} ></div>
                <div className={styles.cardFooter}>
                   <span className={styles.amount}>
                   <Link to="/allvendorfoods"> <button onClick={()=>localStorage.setItem('vendorid', restaurant.id)} className={`${styles.more} p-4 bg-deepBlue rounded-lg mt-7 text-white` }>View Restaurant</button></Link>
                   </span>
                </div>
               </div>
               ))}
           </div>
           <div className={styles.btnContainer}>
       <Link to="/vendors"> <button className={`${styles.more} p-4 bg-deepBlue rounded-lg mt-7 text-white` }>see more</button></Link>
        </div>
        </>
}
           </div>
         
         
     </div>
  )
}

export default AllPopularRestaurant