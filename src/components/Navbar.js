import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AiOutlineHome, AiOutlineSetting, AiOutlineLogin } from 'react-icons/ai'
import { FaMapMarkerAlt, FaRegUserCircle } from 'react-icons/fa'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.REACT_APP_PUBLIC_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY,
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
    if (data?.session) {
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
        <div className="flex items-center">
          <div className="text-gray-800 text-3xl font-bold cursor-pointer">
            CampusEats
          </div>
        </div>
        <div className="text-center">
          <ul className="flex items-center justify-end list-none">
            {/* Mobile and tablet layout */}
            {isBottomBarVisible && (
              <div className="fixed bottom-0 left-0 right-0 bg-white p-3 flex justify-around items-center lg:hidden border-t-2 border-gray-200">
                <Link to="/home">
                  <div className="flex flex-col items-center cursor-pointer">
                    <AiOutlineHome className="text-2xl text-gray-300" />
                    <p className="text-xs text-gray-500">Home</p>
                  </div>
                </Link>
                <Link to="/map">
                  <div className="flex flex-col items-center cursor-pointer">
                    <FaMapMarkerAlt className="text-2xl text-gray-300" />
                    <p className="text-xs text-gray-500">Map</p>
                  </div>
                </Link>
                {loggedIn ? (
                  // if user is logged in, show settings
                  <>
                    <Link to="/settings">
                      <div className="flex flex-col items-center cursor-pointer">
                        <AiOutlineSetting className="text-2xl text-gray-300" />
                        <p className="text-xs text-gray-500">Settings</p>
                      </div>
                    </Link>
                  </>
                ) : (
                  // if user is not logged in, show login
                  <Link to="/auth">
                    <div className="flex flex-col items-center cursor-pointer">
                      <AiOutlineLogin className="text-2xl text-gray-300" />
                      <p className="text-xs text-gray-500">Log in</p>
                    </div>
                  </Link>
                )}
              </div>
            )}
            {/* Laptop and desktop layout */}
            <div className="hidden lg:flex items-center">
              <Link to="/auth">
                <button
                  className="
                        inline-block
                        px-14
                        py-1
                        text-lg
                        font-bold
                        leading-relaxed
                        text-white
                        transition-colors
                        duration-200
                        transform
                        bg-green-400
                        rounded-lg
                        hover:bg-green-500
                        ml-3
                      "
                >
                  Open Map
                </button>
              </Link>
              {loggedIn ? (
                // if user is logged in, show user icon
                <>
                  <div className="flex flex-col items-center cursor-pointer px-3">
                    <FaRegUserCircle className="text-4xl text-gray-300 " />
                  </div>
                </>
              ) : (
                // if user is not logged in, show login icon
                <>
                  <Link to="/auth">
                    <div className="flex flex-col items-center cursor-pointer px-3">
                      <AiOutlineLogin className="text-4xl text-gray-300" />
                    </div>
                  </Link>
                </>
              )}
            </div>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
