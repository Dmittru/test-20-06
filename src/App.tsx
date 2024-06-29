import React, { useState, useRef, useCallback } from "react";
import { User } from "./lib/types";
import { Button } from "./components/ui/Button.tsx";
import UserInfo from "./components/shared/UserInfo.tsx";
import { useThrottle } from "./hooks/useThrottle.tsx";
import { JSON_PLACEHOLDER_URL } from "./lib/constaints/index.js";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const userCache = useRef<Map<number, User>>(new Map());

  const fetchRandomUser = useCallback(async () => {
    try {
      const id = Math.floor(Math.random() * 10) + 1;
      if (userCache.current.has(id)) {
        setUser(userCache.current.get(id) || null);
        console.log('got user from cache')
        return;
      }
  
      const response = await fetch(`${JSON_PLACEHOLDER_URL}/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = (await response.json()) as User;
      userCache.current.set(id, data);
      setUser(data);
      console.log('current: ', user)
      console.log('list of users: ', userCache)
    } catch (error) {
      console.error("Fetch user failed:", error);
    }
  }, []);

  const handleButtonClick = useThrottle(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      fetchRandomUser();
    },
    2000,
  );

  return (
    <div>
      <header>Get a random user</header>
      <Button onClick={handleButtonClick}>
        get random user data
      </Button>
      <UserInfo user={user} />
    </div>
  );
}

export default App;
