import NewFoodsCard from '../components/NewFoodsCard'
 import '../styles/index.css'
import Header from "../components/Header"
import HeaderNotAuth from "../components/HeaderNotAuth"
const NewFoodsPage = () => {
  return (
    <div>
          
          {
        localStorage.getItem('token') ? <Header/> :<HeaderNotAuth/>
        
        }
      
      <NewFoodsCard/>
    </div>
  )
}

export default NewFoodsPage