import React, { useState } from 'react'

// components
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Cards from '../components/Cards'
import Filter from '../components/Filter'

export const Home = () => {
  const [enabled,setEnabled]=useState(false);
  return (
    <>
      <Navbar />
      <Filter enabled = {enabled} setEnabled = {setEnabled} />
      <Cards enabled={enabled}/>
      <Footer />
    </>
  )
}

export default Home
