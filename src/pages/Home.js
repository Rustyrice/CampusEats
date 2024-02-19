import React from 'react'

// components
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Cards from '../components/Cards'
import Filter from '../components/Filter'

export const Home = () => {
  return (
    <>
      <Navbar />
      <Filter />
      <Cards />
      <Footer />
    </>
  )
}

export default Home
