import { useForm } from "react-hook-form"
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {
  checkUserAsync,
  selectError,
  selectLoggedInUser,
} from '../authSlice';
import { Link } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectError)
  const user = useSelector(selectLoggedInUser)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()


  return (
    <>
    {user && <Navigate to='/' replace={true}></Navigate>}
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form noValidate className="space-y-6" onSubmit={handleSubmit((data)=>{
      dispatch(checkUserAsync({email:data.email, password:data.password}))
    })}>
      <div>
        <label htmlFor="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div class="mt-2">
          <input id="email" {...register("email" , { required: "email is required"})} type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label htmlFor="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="text-sm">
            <Link to='/forget-password' class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
          </div>
        </div>
        <div class="mt-2">
          <input id="password" {...register("password" , {required: "Passwrod is required"})} type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
        {error && <p className="text-red-500">{error.message}</p>}

      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <Link to="/signup" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Create an Account</Link>
    </p>
  </div>
</div>
</>
  )
}
