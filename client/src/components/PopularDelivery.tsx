import  { MouseEventHandler,  useState ,useEffect} from 'react';
import styles from '../styles/freeDelivery.module.css'
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getPopularRestaurant} from '../slices/popularRestaurantSlice';
import spinner from  "../assets/spinner.gif"


const PopularDelivery = () => {
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

    <div id="pVendor" className={styles.delivery}>
    <div className={`${styles.divider}  w-70% md: h-0.5 bg-deepBlue`} ></div>
    <div className={styles.deliveryFlex}>
        <h2 className={styles.deliveryText}>Popular Restaurants</h2>
        <div onClick={handleClick} style={{cursor: "pointer"}}>
         {show ? <i className="fa-solid fa-chevron-up" style={{fontSize:"20px"}}></i> :<i className="fa-solid fa-chevron-down" style={{ fontSize: "20px" }}></i>}
         </div >
        </div>
        <div className={`${styles.divider}  w-70% md: h-0.5 bg-deepBlue`}></div>
        <div className={ show ? styles.hide : ""}>
        {
          isLoading ? <img src={spinner} alt="" className={styles.spinner} />: 
          <>
         <div className={styles.cardContainer}>
         {
            isLoading ? <img src={spinner} alt="" /> :
         
          popularRestaurant?.slice(0,3).map((restaurant)=>(
             <div className={styles.Card} key={restaurant.id}>
            <div className={styles.cardHead}>
               <img src={restaurant.cover_image} alt="" className="h-60 w-100" />
            </div >
            <div className={styles.cardBody}>
               <h2 className={styles.cardheading}>{restaurant.restaurant_name}</h2>
               <p className={styles.cardText}>Powered By: {restaurant.company_name}</p>
            </div>
            <div className={`${styles.divider}  w-70% md: h-0.5 bg-deepBlue`} ></div>
            <div className={styles.cardFooter}>
               <span className={styles.amount}>
               <Link to="/allvendorfoods"> <button onClick={()=>localStorage.setItem('vendorid', restaurant.id)} className={`${styles.more} p-4 bg-deepBlue rounded-lg mt-7 text-white` }>View Restaurant</button></Link>
               </span>
               {/* <span className={styles.totalAmount}>####</span> */}
            </div>
           </div>
          ))  
       
            }
   

        </div>

        <div className={styles.btnContainer}>
       <Link to="/popular"> <button className={`${styles.more} p-4 bg-deepBlue rounded-lg mt-7 text-white` }>see more</button></Link>
        </div>
        </>
        }
        </div>
      
  </div>
  
  )
}

export default PopularDelivery