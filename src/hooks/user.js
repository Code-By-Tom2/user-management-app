
import { useState } from "react";

export function useUser() {
  const [user, setUser] = useState(null);

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return { user, updateUser };
}
