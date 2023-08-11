import React, { useState } from 'react'
import "./Auth.css"
import logo2 from "../../img/logo2.png"
import { logIn, signUp } from '../../actions/AuthAction';
import { useDispatch, useSelector } from 'react-redux';

const Auth = () => {

  const dispatch = useDispatch()
  const loading = useSelector((state)=>state.authReducer.loading)
  const [isSignUp, setIsSignUp]= useState(true);
  console.log(loading)
  // const dispatch = useDispatch()
  const [data, setData]= useState({firstname: "",lastname:"",username:"",password:"",confirmpass:""});
  
  // handle Change in input
  const [confirmPass, setConfirmPass] = useState(true);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  // Form Submission
  const handleSubmit = (e) => {
    // setConfirmPass(true);
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data));
    }
  };
    // Reset Form
    const resetForm = () => {
      setConfirmPass(true);
      setData({firstname: "",lastname:"",username:"",password:"",confirmpass:""});
    };


  return (
    
    <div className="auth">
      {/* Left Side */}
        <div className="auth-lef"> 
         <div className="authName">
            <img src={logo2} alt="logoAuth" />
            <h6>With TourChat, share and stay in touch with those around you</h6>
         </div>

        </div>
     {/* right Side */}
        <div className="auth-right">
      <form className="infoForm authForm" onSubmit={handleSubmit} >
        <h3>{isSignUp ? "Sign Up": "Log In"}</h3> 
          {
            isSignUp && 
        <div>
          <input type="text" placeholder="First Name" 
          className='infoInput' name="firstname" value={data.firstName} onChange={handleChange}/>
          <input type="text" placeholder="Last Name" 
          className='infoInput' name="lastname" value={data.lastName} onChange={handleChange}/>
        </div>
          }

        <div>
        <input type="email" placeholder="User Name" 
          className='infoInput' name="username"value={data.userName}  onChange={handleChange} />
        </div>
        <div>
        <input type="password" placeholder="Password" 
          className='infoInput' name="password" value={data.password} onChange={handleChange} />
          { isSignUp && 
        <input type="password" placeholder="Confirm Password" 
          className='infoInput' name="confirmpass" value={data.confirmpass} onChange={handleChange} />
          }
        </div>
        <span style={{display:confirmPass? "none": "block", color:"red", fontSize:"12px", alignSelf: "flex-end"}}>
          *Password is not the same 
        </span>
        <div>
          <span 
           onClick={()=> {setIsSignUp((prev)=> !prev); resetForm()}}
           style={{fontSize:"12px", cursor:"pointer"}} >
            {isSignUp ? "Already have an account. Login !": "Don't have an account ? Sign up"}
            </span>
        </div>
        <button type="submit" className="button infoButton" disabled={loading}>
          {loading? "Loading..." : isSignUp ? "SignUp": "Log In" }
        </button>
      </form>
    </div>


    </div>
  )
}

export default Auth