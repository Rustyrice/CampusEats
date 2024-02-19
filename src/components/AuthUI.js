import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../config/client";

const AuthUI = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        navigate("/dp1");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // registering the user (Nico )
  
  const registerUser = async (user)=>{
    try{
      const{id} = user ;
      // store the user id in the user table
      await supabase.from("users").insert({
        id,
        isAdmin: false,
        allergens : []
      })
    } catch (error){
      console.error ("Error registering the user", error.message)
    }
  }

  return (
    <Auth 
      supabaseClient={supabase}
      providers={["google", "github", "discord"]}
      // controls whether to display only social providers
      // onlyThirdPartyProviders
      redirectTo="http://localhost:3000/Dashboard"
      // comes with preconfigured themes, can add custom themes
      appearance={{ theme: ThemeSupa }}
      // controls how to display the social provider icons
      socialLayout="horizontal"

      // invoking the 'registerUser' function (NICO)
      onUserRegistered = {(user)=>registerUser(user)}
    />
  );
};

export default AuthUI;