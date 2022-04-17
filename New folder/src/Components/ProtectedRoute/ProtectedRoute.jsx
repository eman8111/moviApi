import React from 'react'
import {  Outlet, Navigate } from 'react-router-dom'

export default function ProtectedRoute({loginData}) {

  return (
    <>
    {loginData ? <Outlet /> : <Navigate to="login"/>}
    </>
  )
}
