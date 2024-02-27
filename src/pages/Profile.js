import React, { useEffect, useState } from "react";
import { supabase } from "../config/client";



const Profile = () => {
  const [userdata, setUserData] = useState('');
  const [newuserdata, setNewUserData] = useState('');


  useEffect(() => {

    const getUser = async () => {
      const { error, data: { user } } = await supabase.auth.getUser()

        if (error){
          console.log("Cant import users")
        }else{
          const userdata = await supabase.from("users").select('*').eq('id', user.id)
          if (error){
            console.log("Cant import users")
          }
          else{
            setUserData(userdata.data[0])
          }
        }
    }
    getUser()
  });

  const UpdateUser = async () => {
    console.log(newuserdata)
    const { error } = await supabase
    .from('users')
    .update({username: newuserdata})
    .eq('id', userdata.id)

  if (error) {
    console.error(`Error updating username ${error}`);
    throw error;
  }
  else{
    setNewUserData('')
  }

  }


  const UpdateHandler = (event) =>{
    setNewUserData(event.target.value);
  }


  return (
  // <h1>{userdata.username}</h1>,
  // <h1> {userdata.allergens}</h1>

    <form onSubmit={UpdateUser}>
      <input
          placeholder= {userdata.username}
          value={newuserdata}
          onChange={UpdateHandler}
      />
      <input type="submit" />

    </form>




  )
};


export default Profile;

