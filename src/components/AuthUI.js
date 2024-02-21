import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../config/client";
const customTheme = {
  default: {
    colors: {
      brand: 'hsl(153 60.0% 53.0%)',
      brandAccent: 'hsl(154 54.8% 45.1%)',
      brandButtonText: 'white',
    },
  },
  dark: {
  
    colors: {
      brandButtonText: 'white',
      defaultButtonBackground: '#2e2e2e',
      defaultButtonBackgroundHover: '#3e3e3e',
      
    },
  },
  evenDarker: {
    colors: {
      brandButtonText: 'white',
      defaultButtonBackground: '#1e1e1e',
      defaultButtonBackgroundHover: '#2e2e2e',
    },
  },
}

const AuthUI = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        navigate("/Dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="auth-container">
      <Auth 
        supabaseClient={supabase}
        // controls whether to display only social providers
        providers={["google", "github", "discord"]}
        // onlyThirdPartyProviders
        redirectTo="http://localhost:3000/Dashboard"
        // comes with preconfigured themes, can add custom themes
        theme="dark"
        appearance={{
          theme: customTheme,
          className: {
            container: "provider-container",
            button: "auth-button"
          }
         }}
        // controls how to display the social provider icons
        socialLayout="horizontal"
        
      />
    </div>
  );
};

export default AuthUI;