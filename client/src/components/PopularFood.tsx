import  { MouseEventHandler,  useState, useEffect } from 'react';
import styles from "../styles/popular.module.css"
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getPopularFood } from '../slices/popularSlice';
import spinner from  "../assets/spinner.gif"
import Image from "../assets/white-rice.jpg";

const PopularFood = () => {
   const [show, setShow] = useState(false);
  
   const dispatch = useAppDispatch();
   const { popularFood, isLoading } = useAppSelector((state) => state.popularFood);


  const handleClick : MouseEventHandler<HTMLImageElement>=()=>{
    setShow(!show)
  }
  //fetch popularFood
  

useEffect(() => {
  
   dispatch(getPopularFood());
}, [dispatch]);


  return (

   <div id="pFood" className={styles.popular}>
     
    <div className={`${styles.divider}  w-70% md: h-0.5 bg-deepBlue`}></div>
    <div className={styles.popularFlex}>
        <h2 className={styles.popularText}>Popular Foods</h2>
        <div onClick={handleClick} style={{cursor: "pointer"}}>
         {show ? <i className="fa-solid fa-chevron-up" style={{fontSize:"20px"}}></i> :<i className="fa-solid fa-chevron-down" style={{ fontSize: "20px" }}></i> }
         </div >
        </div>
        <div className={`${styles.divider}  w-70% md: h-0.5 bg-deepBlue`} ></div>
        <div className={show ? styles.hide : ""}>
       { 
         isLoading ? <img src={spinner} alt="" className={styles.spinner} />  :
         <>
       <div className={styles.cardContainer}>
         {popularFood?.slice(0,3).map((food)=>(

         <div className={styles.Card} key={food.id}>
             <div className={styles.cardHead}>
                <img src={food.food_image} alt="" className="h-60 w-100" />
             </div>
             <div className={styles.cardBody}>            
               <h2 className={styles.cardheading}>{food.name}</h2>
                <p className={styles.cardText}>{food.description}</p> 
               
             </div>
             <div className={`${styles.divider}  w-70% md: h-0.5 bg-deepBlue`} ></div>
             <div className={styles.cardFooter}>
                <span className={styles.amount}>
                <Link to="/allvendorfoods"> <button onClick={()=>localStorage.setItem('vendorid', food.vendorId)} className={`${styles.more} p-4 bg-deepBlue rounded-lg mt-7 text-white` }>Order Now</button></Link>
                </span>
                <span className={styles.totalAmount}>#{food.price}</span>
             </div>
            </div>
            
            ))}
        </div>

        <div className={styles.btnContainer}>
        <Link to="/popularfoods"><button className={`${styles.more} sm:mt-4 w-full p-4 bg-deepBlue rounded-lg mt-7 text-white` }>see more</button></Link>
        </div>
      
        <div className={`${styles.divider}  w-70% md: h-0.5 bg-deepBlue`}></div>
        </>
      }
        </div>
        
  </div>
  )
}

export default PopularFood