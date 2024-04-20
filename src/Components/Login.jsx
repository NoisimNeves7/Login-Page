import React, { useState } from "react";
import Header from "./Header";
import bg from "/bg.jpg";
import { validate } from "./utils/validations";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from './utils/firebase'
import { useNavigate } from "react-router-dom";
import { addUser } from "../store/reducers/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isSignIn, setisSignIn] = useState(true);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("")
  const [error, seterror] = useState("")
  

  const toggleSignInForm =()=>{
    setisSignIn((prev) => !prev);
  }
  const handleButtonClick = (e) => {
    
    const errorMessage = validate(email,password)
    seterror(errorMessage)

    if(error)return;

    // ------------------------------WRITING SIGN IN /SIGN UP ------------------------------


    // ----------------------------------SIGN UP ------------------------------
    if(!isSignIn){
      createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // console.log(user);

    // ---------------------UPDATING THE USER PROFILE --------------------------------
    updateProfile(user, {
      displayName: name, photoURL: "https://plus.unsplash.com/premium_photo-1688739352540-a75b102d8551?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8"
    }).then(() => {

      const {email,uid,displayName,photoURL} = auth.currentUser;
        dispatch(addUser({email:email,uid:uid,displayName:displayName,photoURL:photoURL}))
      // Profile updated!
      // ...

    }).catch((error) => {
      // An error occurred
      // ...
    });


    // navigate('/browse')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterror(errorCode +"-"+ errorMessage)
    // ..
  });

    }

    // ----------------------------------SIGN IN ------------------------------
    else{
      signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    navigate('/browse')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterror(errorCode +"-"+ errorMessage)
  });
    }



    
  };
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6),rgba(0,0,0,.6)),url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="w-screen h-screen"
    >
      <Header />
      <div className="w-96 max-h-[65%] bg-[#464545a9]  mx-auto mt-20 p-10">
        <form
          action=""
          className="flex flex-col gap-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <p className="text-2xl text-white font-bold">
            {isSignIn ? "Sign In" : "Sign Up"}
          </p>
          {!isSignIn && <input
            type="text"
            placeholder="Name"
            className="px-4 py-2"
            value={name}
            onChange={(e)=>setname(e.target.value)}
          />}
          <input
            type="text"
            placeholder="Email Address"
            className="px-4 py-2"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
          />
          <input type="password" placeholder="Password" className="px-4 py-2"  value={password} onChange={(e)=>setpassword(e.target.value)}/>
          
          <div>
          {error && <p className="text-red-500">{error}</p>}
          <button onClick={()=>handleButtonClick()}  className="px-4 py-2 bg-[#E50914] text-white mt-4 mb-4">
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
          <p className="text-zinc-300">{isSignIn ? 'New to Netflix? ':'Already Registered? '}<button onClick={()=>toggleSignInForm()} className="text-white font-bold cursor-pointer">{isSignIn ? 'Sign Up':'Sign In'}</button></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
