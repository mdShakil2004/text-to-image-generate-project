import  { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import {motion} from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  
  // create state and setState
  const [state, setState] = useState('Login');
  const {setShowLogin, backendUrl,setToken,setUser} = useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 


  const onSubmitHandler =  async(e) => { 
    e.preventDefault();
    // const ch = {name,email,password};
    
    
    try { 
      
      if(state=='Login'){
       
        // login logic 

      const {data} = await axios.post(backendUrl+'/api/user/login',{email,password});
      
      
     
      if(data.success){
        
        setToken(data.token);
        setUser(data.user);    
        localStorage.setItem("token",data.token);
        setShowLogin(false);
      }
      else{
      

          toast.error(data.message);  // toast notification 
      }

      }
      else{
        // register logic
        
        const {data} = await axios.post(backendUrl+'/api/user/register',{name,email,password});
        console.log("data ",data)
        if(data.success){
          toast.success(data.message);   // toast notification

          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token",data.token);
          setShowLogin(false);
        }
        else{
            toast.error(data.message);  // toast notification
        }
      
    }
  }
     catch (error) { 
      // toast.error("user does not exist");  // tost notification
      // console.log(error.response.data.message);

      toast.error(error.response.data.message);  // toast notification
      
      

      
    }


  }



  useEffect(() => {
    // do something when state changes
    document.body.style.overflow = 'hidden';  // disable scroll
  return () => {
    document.body.style.overflow = 'unset';  // enable scroll
  }
  },[])


  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center ">
        <motion.form onSubmit={onSubmitHandler}
          initial={{ opacity: 0.2,y: 50}}
          transition={{duration: 1}}
          whileInView={{y: 0, opacity: 1}}
          viewport={{once: true}}
        className="relative bg-white p-10 rounded-xl text-state-500 ">
            <div className="flex flex-col items-center ">
                <h1 className="text-2xl font-medium text-neutral-700 text-center ">{state}</h1>
                <p className="text-sm">Welcome back! Please sign in to continue </p>
                { state !== 'Login' &&
                <div className="border px-6 py-2 mt-5 rounded-full gap-2 flex items-center ">
                <img src={assets.profile_icon} alt="" width={30} />
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Full Name" className="outline-none text-sm "/>
                </div>
                 }

                <div className="border px-6 py-2 mt-4 rounded-full gap-2 flex items-center ">
                <img src={assets.email_icon} alt="" width={20} />
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="Email" placeholder="Email Id" className="outline-none text-sm "/>
                </div>
                <div className="border px-6 py-2 mt-4 rounded-full gap-2 flex items-center ">
                <img src={assets.lock_icon} alt="" width={20} />
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="Password" placeholder="Password" className="outline-none text-sm "/>
                </div>
            </div>
          
            <p className=" text-sm text-blue-500 my-4 cursor-pointer ">Forget Password</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-full ">{state==='Login' ? 'Login' : 'create account'} </button>
            {state === 'Login' ? 
            <p className="mt-5 text-center">Don&apos;t have an account? <span className="text-blue-600 cursor-pointer" onClick={() => setState('Sign Up')} >Sign Up</span> </p>
             :
            <p className="mt-5 text-center">Already have an account? <span className="text-blue-600 cursor-pointer" onClick={() => setState('Login')} >Login</span> </p>
            }
          <img onClick={() => setShowLogin(false)} className="absolute top-5 right-5 cursor-pointer scale-105 transition-all duration-300 hover:scale-110"  src={assets.cross_icon} alt="" />
        </motion.form>
    </div>
  );
};

export default Login;
