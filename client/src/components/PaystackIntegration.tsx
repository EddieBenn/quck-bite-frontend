/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { PaystackButton } from "react-paystack"
import styles from "../styles/paystack.module.css"
import { FaTimes } from "react-icons/fa"
import "../styles/index.css"
import { useCart } from "react-use-cart"
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { userCreateOrder } from "../slices/userCreateOrderSlice"
// interface Close{
//   closeModal : boolean
// }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PaystackIntegration:React.FC<any> = ({closeModal}) => {
  const { cartTotal, emptyCart } = useCart();
    const publicKey = "pk_test_7a07c22bac28de6adde6e701da1374a91b14f269"
  const [amount, setAmount] =  useState(cartTotal)
  const [email, setEmail] = useState("")
  const [firstname, setFirstName] = useState("")
  const [lasttname, setLastName] = useState("")
  const componentProps = {
    email,
    amount: amount * 100,   
    firstname,
    lasttname,
        
    publicKey,
    text: "Checkout",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess(transaction: any) {
      const message = `Payment Complete
        Reference ${transaction.reference}         
        `
      alert(message);
      setEmail(email);
      setFirstName("");
      setLastName("");
      setAmount(cartTotal);
      emptyCart()
      window.location.href="/userorder"
       

    },
    onCancel() {
      alert("Wait! You need this oil, don't go!!!!")
    },
 

  }
 

  const storedUserData = localStorage.getItem('user');
  const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
  return (

    <div className={styles.modalBackground}>
      
    <div className={styles.modalContainer}>
    <FaTimes className={styles.cancel} onClick={()=>closeModal(false)}/>
        <div className={styles.title}>
            <h2>kindly confirm your details</h2>
            
        </div>
        <div className={styles.body}>   
           
          <input type="text"          
            value={ parsedUserData.data.firstname}
            required
          className={styles.modalInput}
          onChange={(e)=>setFirstName(e.target.value)}
          readOnly
          /> <br/>
            
          <input type="text"   
          name="lastName"       
          value={ parsedUserData.data.lastname}
          onChange={(e)=>setLastName(e.target.value)}

          className={styles.modalInput}
            required
          readOnly
          /><br/>
         
          <input type="text" 
          
          name ="Email"
          value={ email}
          className={styles.modalInput}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Enter email"
          required
         
          /><br/>
            
          <input type="number"          
            id ="Amount" 
            name ="totalAmount"
                      
            value={cartTotal}
            required
            // onChange={(e)=>setAmount(e.target.value)}
            
         
            className={styles.modalInput}
   
          /><br/>     

        <div className={styles.divider}></div>

        <div className={styles.footer}>

        <PaystackButton className={styles.payBtn} {...componentProps} />
           
          </div>
      
         
        </div>
    </div>
   
     </div>


  )
}

export default PaystackIntegration