import Food from '../components/Food'


import Header from '../components/Header'
import styles from "../styles/food.module.css"
import HeaderNotAuth from "../components/HeaderNotAuth"
const FoodPage = () => {
    return (
        <>
            {
        localStorage.getItem('token') ? <Header/> :<HeaderNotAuth/>
        
        }
            <div className={styles.foodContainer} >
                <Food />
            </div>
        </>

    )
}

export default FoodPage