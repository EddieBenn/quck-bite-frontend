import PopularFoodsCard from '../components/PopularFoodsCard'
 import '../styles/index.css'
import Header from "../components/Header"
import HeaderNotAuth from "../components/HeaderNotAuth"
const PopularFoodsPage = () => {
  return (
    <div>
      
      {
        localStorage.getItem('token') ? <Header/> :<HeaderNotAuth/>
        
        }
      
      <PopularFoodsCard />
    </div>
  )
}

export default PopularFoodsPage