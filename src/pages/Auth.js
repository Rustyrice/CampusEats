import React from 'react'

import AuthUi from '../components/AuthUI'


const Auth = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <h2 className =" p-12 my-28 font-bold text-4xl border-double border-2 border-green-500 animate-wiggle">
          CampusEats
        </h2>
        <AuthUi /> 
      </div>
      
    </>
  )
  //<div>hello from auth</div>
}

export default Auth
