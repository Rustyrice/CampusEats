import { supabase } from '../config/client'
// const {user} = supabase.auth.getUser();
// const {userId} = user.id;

// need to get the allergens for that user
const getUserAllergens = async (userId) => {
  try {
    // Retrieve user allergens
    // const userAllergens = await getUserAllergens(userId);

    // console.log("User allergens:", userAllergens); // Log retrieved allergens

    // accessing the user table for that specific userId
    const { data: user, error } = await supabase
      .from('users')
      .select('allergens')
      // filtering users column where id = userId -> just to work on that user
      .eq('id', userId)
      .single() // selecing one row

    if (error) {
      throw new Error(error.message)
    }
    // checking code
    console.log('Retrieved the user allergens: ', user.allergens)

    const allergenKeys = Object.keys(user.allergens)
    const allergensArray = allergenKeys.filter((allergen) => {
      return user.allergens[allergen]
    })

    // Check if allergensArray is an array and log the result
    console.log('Is allergensArray an array? ', Array.isArray(allergensArray))

    console.log('filtered allergens array: ', allergensArray)

    return allergensArray
  } catch (error) {
    console.error('Error retrieving user allergens', error.message)
    throw error
  }
}

// getting the filtered meals for that user
// const getUserMeals = async(userId) =>{
//     try{
//         // getting the user allergens
//         const userAllergens = await getUserAllergens(userId)

//         // checking
//         console.log("User allergens:", userAllergens);

//         // querying the 'fountain_allergens' table and getting all the meals
//         const {data:userMeals, error} = await supabase
//         .from ('fountain_allergens')
//         .select('*');

//         if(error){
//             throw new Error (error.message)
//         }
//         // checking
//         console.log("heyyyyyy");

//         console.log("Retrieved all meals before filtering:", userMeals);

//         // now filtering the meals
//         const filteredMeals =  userMeals.filter((meal)=>{
//             // array of meals that dont contain any user allergens

//              return  !userAllergens.some((allergen) =>  meal[allergen])
//         })

//         // checking
//         console.log("Is filteredMeals an array? ", Array.isArray(filteredMeals));
//         console.log("Filtered meals:", filteredMeals);

//         // return filteredMeals;
//         return {
//             data: filteredMeals,
//             error: null,
//           };
//     }
//     catch(error){
//         console.error("Error retrieving filtered meals: " , error.message)
//         throw error;
//     }
// }

const getUserMeals = async (userId) => {
  try {
    // getting the user allergens
    const userAllergens = await getUserAllergens(userId)

    // checking
    console.log('User allergens:', userAllergens)

    // querying the 'fountain_allergens' table and getting all the meals
    const { data: userMeals, error } = await supabase
      .from('fountain_allergens')
      .select('*')

    if (error) {
      throw new Error(error.message)
    }

    // Check if preferences are present in user allergens
    const preferencesInAllergens = [
      'halal',
      'vegetarian',
      'vegan',
    ].filter((preference) => userAllergens.includes(preference))

    // Filter meals based on preferences if they are present in user allergens
    let filteredMeals = userMeals
    if (preferencesInAllergens.length > 0) {
      filteredMeals = filteredMeals.filter((meal) =>
        preferencesInAllergens.every((preference) => meal[preference]),
      )

      // Remove preferences from allergens list
      preferencesInAllergens.forEach((preference) => {
        const index = userAllergens.indexOf(preference)
        if (index !== -1) {
          userAllergens.splice(index, 1)
        }
      })
    }

    // Now filter meals where allergens are false
    filteredMeals = filteredMeals.filter(
      (meal) => !userAllergens.some((allergen) => meal[allergen]),
    )

    // checking
    console.log('Is filteredMeals an array? ', Array.isArray(filteredMeals))
    console.log('Filtered meals:', filteredMeals)

    return {
      data: filteredMeals,
      error: null,
    }
  } catch (error) {
    console.error('Error retrieving filtered meals: ', error.message)
    throw error
  }
}

const getAllMeals = async (userId) => {
  try {
    const { data: allMeals, error } = await supabase
      .from('fountain_allergens')
      .select('*')

    if (error) {
      throw new Error(error.message)
    }

    console.log('Is allMeals an array? ', Array.isArray(allMeals))
    console.log('All meals:', allMeals)

    return allMeals
  } catch (error) {
    console.error('Error retrieving all meals: ', error.message)
    throw error
  }
}

export { getUserAllergens, getUserMeals, getAllMeals }
