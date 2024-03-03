import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/client";
import userService from '../services/userService'

const UserInfo = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  // GET DETAILS OF CURRENT USER UPON PAGE LOAD
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchUserData() {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        if (data) {
          setUser(data.user); 
          console.log(data)
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    }
    fetchUserData();
  }, []);

  

  const userSubmit = (userName,userID) => {

    if (userName.length < 4) {
      alert("Username must be at least 4 characters long.");
      return;
    }


    userService.submitUsername(userName,userID);
    navigate('/dp1');
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">

    <Typography className = "mb-24 font-bold " variant="h2" color="blue-gray">
        CampusEats
    </Typography>
    <Card color="transparent" shadow={false}>
    
      <Typography className = "mb-6 font-bold" variant="h4" color="blue-gray">
        User Info
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Please enter a username to make your profile unqiue!
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Username
          </Typography>
          <Input
            size="lg"
            placeholder="Enter your username here..."
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <Button onClick={()=>userSubmit(username,user?.id)} color="green" size="lg"className="mt-6" fullWidth >
          Next
        </Button>

        
      </form>
    </Card>
    </div>
  )
}

export default UserInfo