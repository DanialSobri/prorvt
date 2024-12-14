import { createContext, useContext, useEffect, useState } from 'react';
import PocketBase from 'pocketbase';

type AuthContextType = {
  user: any;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

import { ReactNode } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const pb = new PocketBase('https://your-pocketbase-url');
  console.log('AuthProvider pb:', pb.authStore.model);
  useEffect(() => {
    const authData = pb.authStore.model;
    console.log('AuthContext authData:', authData);
    setUser(authData);
  }, []);

  const signIn = async (email:string, password:string) => {
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