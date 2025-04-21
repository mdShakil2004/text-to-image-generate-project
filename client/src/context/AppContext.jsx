import { createContext, useEffect, useState } from "react";
import {toast} from 'react-toastify'
import axios from 'axios'
import { data, useNavigate } from "react-router-dom";
export const AppContext = createContext();


const AppContextProvider = (props) => {
  const [user, setUser] = useState(null); // for checking if user is already logged in or not , user = null means current logout and if user is 1 login
  const [showLogin, setShowLogin] = useState(false); // for checking if user is already logged in or not , user = null means current logout and if user is 1 login
  
  const [token, setToken] = useState(localStorage.getItem("token")); 
   const [userProfilePic, setUserProfilePic] = useState(false);
  const [credit, setCredit] = useState(false);   


    const [userProfile , setUserProfile] = useState(false);

    

  const backendUrl=import.meta.env.VITE_BACKEND_URL ;

  const navigate=useNavigate();

  const loadCreditData=async ()=>{
    // console.log(backendUrl + "/api/user/credits"); 
   
    try {
      const {data}=await axios.get(backendUrl+"/api/user/credits",{headers:{token}}); // get credit balance  
      // console.log(data);
      if(data.success)
      {
        setCredit(data.credits);
        setUser(data.user);
       
        

      }
    } 
    catch (error) {
      // console.log(error);
      // toast.error(error.message);
      // console.error("Error object:", error);
      // console.error("Error details:", error.response); // Log the full error response
      toast.error(error.message);
      
      
    }
  }


  const generateImage=async (prompt)=>{
    try {
      

      const {data}=await axios.post(backendUrl+"/api/image/generate-image",{prompt},{headers:{token}}); // get credit balance
  
      if(data.success)
      {
        loadCreditData()
        return data.resultImage
      }
      else{
       
        loadCreditData();
        // console.log("Credit Balance:", data.creditBalance); // Log the credit balance
        // console.log("Checking credit balance:", data.creditBalance);

        if (data.creditBalance === "0" || Number(data.creditBalance) === 0 || data.creditBalance ===0) {
          // console.log("Navigating to /buy due to zero credit balance");
          toast.error("You have no credits balance left");
          navigate("/buy");
      }
      }
      
    } catch (error) {
      // if(error.response.data.success===false)
      // {
      //   navigate("/buy");
      // }
      // console.log("Error occurred during API call:", error.response, "\n" , error.response.data ,"\n", error.message);

      toast.error("buy credit points to continue")

      
    }
  }





  const logout=()=>{
    localStorage.removeItem("token");
    setToken(''); 
    setUser(null);
    // setShowLogin(true);

  }

 



 useEffect(() => { // for checking if user is already logged in or not
  if(token)
  { 
   
    loadCreditData();
  }


},[token])
  const value = {
    
    user,setUser,showLogin, setShowLogin , backendUrl,token, setToken, credit, setCredit ,loadCreditData , logout,generateImage,userProfile, setUserProfile , userProfilePic, setUserProfilePic
  };
 


  return (
    <AppContext.Provider value={value}>
      {props.children}
      </AppContext.Provider>
  );
};

export default AppContextProvider;
