import { useEffect, useState } from "react";
import { checkLoggedIn } from "../(content)/_utils/user";

interface User {
  name: string;
  email: string;
  role: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      const data = await checkLoggedIn();

      if (data && data.isAuthenticated) {
        setLoggedIn(true);
        setUser({
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
        });
      }
    }
    checkLogin();
  }, []);

  return { user, loggedIn };
}
