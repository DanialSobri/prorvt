import { createContext, useContext, useEffect, useState } from 'react';
import PocketBase from 'pocketbase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const pb = new PocketBase('https://your-pocketbase-url');
  console.log('AuthProvider pb:', pb.authStore.model);
  useEffect(() => {
    const authData = pb.authStore.model;
    console.log('AuthContext authData:', authData);
    setUser(authData);
  }, []);

  const signIn = async (email, password) => {
    const authData = await pb.collection('users').authWithPassword(email, password);
    console.log(authData);
    setUser(authData);
  };

  const signOut = () => {
    pb.authStore.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);