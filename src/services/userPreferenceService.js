import { supabase } from "../config/client";

const getPreferences = async (userID) => {
  const { data, error } = await supabase
    .from("users")
    .select("allergens")
    .eq("id", userID);

  if (error) {
    console.error(error);
  }
  return data;
};

const submitPreferences = async (preferences, userID) => {
  const { data, error } = await supabase
    .from("users")
    .update({ allergens: preferences })
    .eq("id", userID)
    .select();

  if (error) {
    console.error(error);
  }
  return data;
};

export default {
  getPreferences,
  submitPreferences,
};
