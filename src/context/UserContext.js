import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateUser = async (id, userData) => {
    setLoading(true);
    try {
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, ...userData } : user))
      );
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ users, updateUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
