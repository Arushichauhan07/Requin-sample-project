import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/reduxAuth";
import Login from "./Login";

const Register = ({ register, setRegister, setLogin }) => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const formRef = useRef(null);

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setRegister(false);
    }
  };

  // Always call useEffect and conditionally add/remove the event listener.
  useEffect(() => {
    if (register) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [register]); // Depend on `register`

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser({ email, password, userName, role }));
  };

  // Always call useEffect and manage `isAuthenticated` within it.
  useEffect(() => {
    if (isAuthenticated) {
      setRegister(false);
    }
  }, [isAuthenticated]); // Depend on `isAuthenticated`

  if (!register) return null; // Return null instead of skipping render logic.

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-all duration-500 z-50 ${
        register
          ? "opacity-100 scale-100 translate-x-0"
          : "opacity-0 scale-50 translate-x-full"
      }`}
    >
      <div
        ref={formRef}
        className="h-auto w-full max-w-md p-6 bg-white rounded-lg shadow-xl transform transition-all duration-500 ease-in-out animate-bounce-in shadow-slate-500"
      >
        <form onSubmit={handleRegister} className="space-y-4">
          <h2 className="text-2xl font-semibold text-center text-gray-700">
            Register
          </h2>
          <input
            name="userName"
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="User">User</option>
            <option value="Visitor">Visitor</option>
          </select>
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
            {loading ? "Getting Register" : "Register"}
          </button>
        </form>
        <span className="flex flex-row justify-center p-2">
          <p
            className="text-blue-700 cursor-pointer"
            onClick={() => {
              setRegister(false);
              setLogin(true);
            }}
          >
            Log in
          </p>
          , If you already have an account?
        </span>
      </div>
      
    </div>
    
  );
};

export default Register;
