import { supabase } from "../config/client";

const getUsername = async (userID) => {
  const { data, error } = await supabase
    .from("users")
    .select("username")
    .eq("id", userID);

  if (error) {
    console.error(error);
  }
  return data;
};

const submitUsername = async (userName, userID) => {
    console.log(userName)
    console.log(userID)
  const { data, error } = await supabase
    .from("users")
    .update({ username: userName })
    .eq("id", userID)
    .select();

  console.log(await getUsername(userID));

  if (error) {
    console.error(error);
  }
  return data;
};

export default {
  getUsername,
  submitUsername,
};