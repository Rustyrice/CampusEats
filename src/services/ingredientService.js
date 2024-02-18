import { supabase } from "../config/client";

const fetchMeals = async () => {
  const { data, error } = await supabase.from("fountain_allergens").select();
  if (error) {
    console.error(`Error fetching meals ${error}`);
    throw error;
  }
  if (data) {
    return data;
  }
};

// newMeal must be valid JSON object
const addMeal = async (newMeal) => {
  // check if a meal with same name as newMeal exists (case insensitive)
  const { data: existingMeals, error: selectError } = await supabase
    .from("fountain_allergens")
    .select("*")
    .ilike("name", newMeal.name);

  if (selectError) {
    console.error(`Error checking for existing meal: ${selectError}`);
    throw selectError;
  }

  if (existingMeals.length > 0) {
    console.error(`A meal with the name ${newMeal.name} already exists.`);
    return { error: `A meal with the name ${newMeal.name} already exists.` };
  }

  // error checking passed successfully
  const { data, error: insertError } = await supabase
    .from("fountain_allergens")
    .insert(newMeal)
    .select();

  if (insertError) {
    console.error(`Error adding meal ${insertError}`);
    throw insertError;
  }
  if (data) {
    return data;
  }
};

const updateMeal = async (id, newMeal) => {
  const { data, error } = await supabase
    .from("fountain_allergens")
    .update(newMeal)
    .eq("id", id)
    .select();

  if (error) {
    console.error(`Error updating meal ${error}`);
    throw error;
  }
  if (data) {
    return data;
  }
};

const deleteMeal = async (id) => {
  const { data, error } = await supabase
    .from("fountain_allergens")
    .delete()
    .match({ id });

  if (error) {
    console.error(`Error deleting meal ${error}`);
    throw error;
  }
  if (data) {
    return data;
  }
};

export default {
  fetchMeals,
  addMeal,
  updateMeal,
  deleteMeal,
};
