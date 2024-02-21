import React, { useState, useEffect } from "react";
import SelectionBox from "../components/SelectionBox";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { supabase } from "../config/client";

const DietarySelectionPage2 = () => {
  const location = useLocation();

  const [preferences, setPreferences] = useState(
    location.state
      ? location.state
      : {
          lupin: false,
          soya: false,
          egg: false,
          milk: false,
          fish: false,
          crustaceans: false,
          molluscs: false,
          mustard: false,
          celery: false,
          peanuts: false,
          sesame_seeds: false,
          sulphur_dioxide: false,
          halal: false,
          vegan: false,
          vegetarian: false,
        }
  );

  // GET DETAILS OF CURRENT USER UPON PAGE LOAD
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchUserData() {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        if (data) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    }
    fetchUserData();
  }, []);

  const updatePreferences = (val) => {
    setPreferences({
      ...preferences,
      [val]: !preferences[val],
    });
  };

  return (
    <div>
      {/* LOGO */}
      <p className="text-center font-bold text-2xl mt-10">CampusEats</p>

      {/* PROGRESS BAR */}
      <div className="mt-5 flex-start flex h-2.5 w-full overflow-hidden rounded-full bg-blue-gray-50 font-sans text-xs font-medium">
        <div className="flex items-center justify-center w-1/2 h-full overflow-hidden text-white break-all bg-green-500 rounded-full"></div>
      </div>

      <p className="text-center text-gray-700 text-xl mb-4 mt-5">
        What are your dietary preferences?
      </p>

      {/* CHECKLIST */}
      <div className="flex flex-col justify-center ml-5 mr-5 content-center">
        <SelectionBox
          desc="Halal"
          onClick={() => updatePreferences("halal")}
          checked={preferences.halal}
        />
        <SelectionBox
          desc="Vegetarian"
          onClick={() => updatePreferences("vegetarian")}
          checked={preferences.vegetarian}
        />
        <SelectionBox
          desc="Vegan"
          onClick={() => updatePreferences("vegan")}
          checked={preferences.vegan}
        />

        {/* BUTTONS */}

        <div className="absolute inset-x-0 bottom-0 h-16 flex justify-center mb-5">
          <Link
            to={`/dp3`}
            state={preferences}
            className="hover:bg-green-400 rounded-md bg-green-500 p-5 px-10 text-white"
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DietarySelectionPage2;
