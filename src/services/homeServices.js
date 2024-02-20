
import {supabase} from "../config/client";
// const {user} = supabase.auth.getUser();
// const {userId} = user.id;

// need to get the allergens for that user 
const getUserAllergens = async (userId) => {
    try {
        // accessing the user table for that specific userId
        const{data: user,error} = await supabase
        .from('users')
        .select('allergens')
        // filtering users colum where id = userId -> just to work on that user
        .eq("id",userId)
        .single() // selecing one row 

        if (error){
            throw new Error (error.message)
        }
        // checking code 
        console.log("Retrieved the user allergens: ", user.allergens);

        const allergenKeys = Object.keys(user.allergens)
        const allergensArray = allergenKeys.filter(allergen =>{
            return user.allergens[allergen]
        })
        console.log("filtered allergens array: ", allergensArray);

        return allergensArray;
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

        // checking
        console.log("User allergens:", userAllergens);

        // querying the 'fountain_allergens' table and getting all the meals
        const {data:userMeals, error} = await supabase 
        .from ('fountain_allergens')
        .select('*');

        if(error){
            throw new Error (error.message)
        }
        // checking
        console.log("Retrieved all meals:", userMeals);

        // now filtering the meals 
        const filteredMeals =  userMeals.filter((meal)=>{
            // array of meals that dont contain any user allergens
             return  !userAllergens.some((allergen) =>  meal[allergen])
        })

        // checking 
        console.log("Filtered meals:", filteredMeals);

        return filteredMeals;
    } 
    catch(error){
        console.error("Error retrieving filtered meals: " , error.message)
        throw error;
    }
}

const getAllMeals = async (userId)=>{
    try {
        const {data:allMeals,error}= await supabase
        .from ('fountain_allergens')
        .select('*')

        if(error){
            throw new Error (error.message)
        }
        return allMeals
    }
    catch(error){
        console.error("Error retrieving all meals: ", error.message)
        throw error
    }
}



export {getUserAllergens,getUserMeals,getAllMeals}