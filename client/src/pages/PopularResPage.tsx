import PopularResCard from '../components/PopularResCard'
 import '../styles/index.css'
import Header from "../components/Header"
import HeaderNotAuth from "../components/HeaderNotAuth"
const PopularResPage = () => {
  return (
    <div>
         {
        localStorage.getItem('token') ? <Header/> :<HeaderNotAuth/>
        
        }
      
      <PopularResCard/>
    </div>
  )
}

export default PopularResPage