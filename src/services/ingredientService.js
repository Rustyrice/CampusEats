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
  const { data, error } = await supabase
    .from("fountain_allergens")
    .insert(newMeal)
    .select();

  if (error) {
    console.error(`Error adding meal ${error}`);
    throw error;
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
