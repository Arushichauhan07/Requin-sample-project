import React,{useRef, useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logout } from "../features/auth/reduxAuth";

const Login = ({ login, setLogin, setRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);
    const formRef = useRef(null);

    
    const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    setEmail("")
    setPassword("")
  };

  const handleClickOutside = (event) => {
        if(formRef.current && !formRef.current.contains(event.target)){
            setLogin(false)
        }
    };

  useEffect(() => {
        if(login){
            document.addEventListener("mousedown", handleClickOutside);
        }else{
            document.removeEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    },[login]);

  useEffect(()=>{
      setLogin(false)
  },[isAuthenticated])

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        login ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-50 translate-x-full"
      }`}
    >
      <div ref={formRef} className="h-auto w-full max-w-md p-6 bg-white rounded-lg shadow-xl transform transition-all duration-500 ease-in-out animate-bounce-in  shadow-slate-500">
        <form onSubmit={handleLogin} className="space-y-4">
          <h2 className="text-2xl font-semibold text-center text-gray-700">Log in</h2>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-accent text-white rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent"
          >
           {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <span className="flex flex-row justify-center p-2">
            <p className="text-blue-700 cursor-pointer" onClick={()=>{
            setRegister(true)
            setLogin(false)}}>Sign up</p>, If you don't have an account?</span>
      </div>
    </div>
  );
};

export default Login;
