import React, { useState, useEffect } from "react";
import SelectionBox from "../components/SelectionBox";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { supabase } from "../config/client";
import userPreferenceService from "../services/userPreferenceService";

const DietarySelectionPage3 = () => {
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
        <div className="flex items-center justify-center w-full h-full overflow-hidden text-white break-all bg-green-500 rounded-full"></div>
      </div>

      <p className="text-center text-gray-700 text-xl mb-4 mt-5">
        Please tick all of the boxes where you have allergies:
      </p>

      {/* CHECKLIST */}
      <div className="flex flex-col justify-center ml-5 mr-5 content-center">
        <SelectionBox
          desc="Lupin"
          checked={preferences.lupin}
          onClick={() => updatePreferences("lupin")}
        />
        <SelectionBox
          desc="Soya"
          checked={preferences.soya}
          onClick={() => updatePreferences("soya")}
        />
        <SelectionBox
          desc="Egg"
          checked={preferences.egg}
          onClick={() => updatePreferences("egg")}
        />
        <SelectionBox
          desc="Milk"
          checked={preferences.milk}
          onClick={() => updatePreferences("milk")}
        />
        <SelectionBox
          desc="Fish"
          checked={preferences.fish}
          onClick={() => updatePreferences("fish")}
        />
        <SelectionBox
          desc="Crustaceans"
          checked={preferences.crustaceans}
          onClick={() => updatePreferences("crustaceans")}
        />
        <SelectionBox
          desc="Molluscs"
          checked={preferences.molluscs}
          onClick={() => updatePreferences("molluscs")}
        />
        <SelectionBox
          desc="Mustard"
          checked={preferences.mustard}
          onClick={() => updatePreferences("mustard")}
        />
        <SelectionBox
          desc="Celery"
          checked={preferences.celery}
          onClick={() => updatePreferences("celery")}
        />
        <SelectionBox
          desc="Peanuts"
          checked={preferences.peanuts}
          onClick={() => updatePreferences("peanuts")}
        />
        <SelectionBox
          desc="Sesame Seeds"
          checked={preferences.sesame_seeds}
          onClick={() => updatePreferences("sesame_seeds")}
        />
        <SelectionBox
          desc="Sulphur Dioxide"
          checked={preferences.sulphur_dioxide}
          onClick={() => updatePreferences("sulphur_dioxide")}
        />

        {/* NAVIGATION BUTTONS */}
        <div className="flex justify-center content-center mb-5 mt-5">
          <Link
            to="/dp2"
            state={preferences}
            className="hover:bg-green-400 rounded-md bg-white font-bold text-green-500 opacity-50 p-5 px-10"
          >
            Previous
          </Link>
          <Link
            to="/home"
            className="hover:bg-green-400 rounded-md bg-green-500 p-5 px-10 text-white"
            onClick={() => {
              userPreferenceService.submitPreferences(preferences, user.id);
            }}
          >
            Submit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DietarySelectionPage3;
