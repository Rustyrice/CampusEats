import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  AiOutlineHome,
  AiOutlineHeatMap,
  AiOutlineSetting,
} from 'react-icons/ai'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.REACT_APP_PUBLIC_SUPABASE_URL, // Your Supabase URL
  process.env.REACT_APP_SUPABASE_ANON_KEY, // Your Supabase anonymous key
)

const Navbar = () => {
  const [isBottomBarVisible, setBottomBarVisible] = useState(true)
  const [loggedIn, setLoggedin] = useState(false)

  useEffect(() => {
    let prevScrollPos = window.pageYOffset
    let isScrollingDown = false

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      isScrollingDown = prevScrollPos < currentScrollPos
      prevScrollPos = currentScrollPos

      setBottomBarVisible(!isScrollingDown)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  async function checkLoggedIn() {
    const { data } = await supabase.auth.getSession()
    if (data.session) {
      // if there is a session, user is logged in
      setLoggedin(true)
    } else {
      setLoggedin(false)
    }
  }

  useEffect(() => {
    checkLoggedIn() // check if user is logged in on page load
  }, [])

  return (
    <div className="w-full fixed bg-white z-50">
      <nav className="relative flex flex-wrap items-center justify-center lg:justify-between px-4 py-2 border-b-2 border-gray-200">
        <div className="flex items-center">CampusEats</div>

        <div className="text-center">
          <ul className="flex items-center justify-end list-none">
            {/* Mobile and tablet layout */}
            {isBottomBarVisible && (
              <>
                <Link to="/home">
                  <div className="flex flex-col items-center cursor-pointer">
                    <AiOutlineHome className="text-2xl text-gray-300" />
                    <p className="text-xs text-gray-500">Home</p>
                  </div>
                </Link>
                <div className="flex flex-col items-center cursor-pointer">
                  <AiOutlineHeatMap className="text-2xl text-gray-300" />
                  <p className="text-xs text-gray-500">Map</p>
                </div>
                {loggedIn ? (
                  <>
                    <div className="flex flex-col items-center cursor-pointer">
                      <AiOutlineSetting className="text-2xl text-gray-300" />
                      <p className="text-xs text-gray-500">Settings</p>
                    </div>
                  </>
                ) : (
                  <Link to="/auth">
                    <div className="flex flex-col items-center cursor-pointer">
                      <AiOutlineSetting className="text-2xl text-gray-300" />
                      <p className="text-xs text-gray-500">Log in</p>
                    </div>
                  </Link>
                )}
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
