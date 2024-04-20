import React, { useEffect } from 'react'
import logo from '/logo.png'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../store/reducers/userSlice';

const Header = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {value} = useSelector(state=>state.user);
  console.log(value)




  const handleSignOut = ()=>{
signOut(auth).then(() => {
  // Sign-out successful.

  
}).catch((error) => {
  // An error happened.
  navigate("/error")
});
  }
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {email,uid,displayName,photoURL} = user;
        dispatch(addUser({email:email,uid:uid,displayName:displayName,photoURL:photoURL}))
        navigate('/browse')
        
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser())
        navigate("/");
      }
    });
  },[])
  return (
    <div className='w-screen flex justify-between p-10' >
      <div className='w-[10%]'>
      <img src={logo} alt="" />
    </div>
    {value && <div className='flex items-center gap-2'>
      <p>{value.displayName}</p>
      <img className='w-10 h-10' src={value.photoURL} alt="" />
    <button onClick={()=>handleSignOut()} className='font-bold text-xl '>Log Out</button>
    </div>}
    </div>
  )
}

export default Header