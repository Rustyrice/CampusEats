import React, { useState, useEffect } from "react";
import SelectionBox from "../components/SelectionBox";
import { Link } from "react-router-dom";
import { supabase } from "../config/client";
import userPreferenceService from "../services/userPreferenceService";

const Settings = () => {
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [username, setUsername] = useState('User')

  // GET DETAILS OF CURRENT USER UPON PAGE LOAD
  useEffect(() => {
    async function fetchUserData() {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        if (data) {
          setUser(data.user);
          const userData = await supabase
            .from("users")
            .select("allergens,username")
            .eq("id", data.user.id);
          if (error) {
            console.log("Cant import users");
          } else {
            setPreferences(userData.data[0].allergens);
            setUsername(userData.data[0].username);
          }
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

  if (preferences)
    return (
      <div>
        {/* LOGO */}
        <p className="text-center font-bold text-2xl mt-10">CampusEats</p>

        {/* PROGRESS BAR
      <div className="mt-5 flex-start flex h-2.5 w-full overflow-hidden rounded-full bg-blue-gray-50 font-sans text-xs font-medium">
        <div className="flex items-center justify-center w-1/2 h-full overflow-hidden text-white break-all bg-green-500 rounded-full"></div>
      </div> */}

        <p className="text-center text-gray-700 text-xl mb-4 mt-5">
        Greetings, {username}! 
        </p>
        <p className="text-center text-gray-700 text-l mb-4 mt-5">
        Customize your dietary preferences below and click submit to save.
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
              to="/home"
              className="hover:bg-green-400 rounded-md bg-green-500 p-5 px-10 text-white"
              onClick={() => {
                userPreferenceService.submitPreferences(preferences, user.id);
              }}
            >
              Save Preferences
            </Link>
          </div>
        </div>
      </div>
    );
  return (
    <div>
      <p>Loading your preferences...</p>
    </div>
  );
};

export default Settings;
