import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserProfile = 'tutor' | 'veterinarian' | null;

interface AuthContextType {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load profile from AsyncStorage on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem('userProfile');
        if (savedProfile) {
          setProfileState(savedProfile as UserProfile);
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const setProfile = async (newProfile: UserProfile) => {
    try {
      if (newProfile === null) {
        await AsyncStorage.removeItem('userProfile');
      } else {
        await AsyncStorage.setItem('userProfile', newProfile);
      }
      setProfileState(newProfile);
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ profile, setProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
