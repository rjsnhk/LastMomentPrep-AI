import React, { useState } from 'react'
import {FaRegEye , FaRegEyeSlash} from 'react-icons/fa6'

const Input = ({label, type, placeholder, value, onChange}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <label className='text-[13px] text-slate-800'>{label}</label>
      <div className="input-box">
      <input
        type={type=="password" ? showPassword ? 'text' : 'password' : type}
        placeholder={placeholder}
        value={value}
        onChange={(e)=>onChange(e)}
        className="w-full bg-transparent outline-none"
      />
      {type === 'password' && (
        <>
          {showPassword ? (<FaRegEyeSlash size={22} onClick={() => togglePasswordVisibility()} className='text-primary cursor-pointer' />) : <FaRegEye size={22} onClick={() => togglePasswordVisibility()} className='text-slate-400 cursor-pointer' />}
        </>
      )}
      </div>
      
    </div>
  )
}

export default Input
