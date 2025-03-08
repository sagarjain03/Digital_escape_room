import React from "react";
import { Link } from "react-router-dom";
import { useUser, UserButton, SignInButton, SignUpButton } from "@clerk/clerk-react";

const Home = () => {
  const { isSignedIn } = useUser();

  return (
    <nav >
      <Link to="/" className="text-xl font-bold">My App</Link>

      <div>
        {isSignedIn ? (
          <>
            <Link to="/string-game" className="mx-4">Let's Go</Link>
           
            <UserButton />
          </>
        ) : (
          <>
            <SignInButton />
            <SignUpButton />
          </>
        )}
      </div>
    </nav>
  );
};

export default Home;