
import {supabase} from "../config/client";

// need to get the allergens for that user 
const getUserAllergens = async (userId) => {
    try {
        // accessing the user table for that specific userId
        const{data,error} = await supabase
        .from('users')
        .select('allergens')
        // filtering users colum where id = userId -> just to work on that user
        .eq("id",userId)
        .single() // selecing one row 

        if (error){
            throw new Error (error.message)
        }
// getting the allergens for that user 
        return data.allergens;
    }
    catch (error){
        console.error("Error retrieving user allergens", error.message);
        throw error;
    }
}

// getting the filtered meals for that user 
const getUserMeals = async(userId) =>{
    try{
        // getting the user allergens 
        const userAllergens = await getUserAllergens(userId)


        // querying the 'fountain_allergens' table and getting all the meals
        const {data:name, error} = await supabase 
        .from ('fountain_allergens')
        .select('*');

        if(error){
            throw new Error (error.message)
        }
        // now filtering the meals 
        const filteredMeals =  name.filter((meal)=>{
            // array of meals that dont contain any user allergens
             return  !userAllergens.some((allergen) =>  meal[allergen])
        })
        return filteredMeals;
    } 
    catch(error){
        console.error("Error retrieving filtered meals: " , error.message)
        throw error;
    }
}

export {getUserAllergens,getUserMeals}