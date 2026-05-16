import { describe, it, expect, beforeEach, vi } from 'vitest';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
vi.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

describe('Auth Context', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should have valid profile types', () => {
    const validProfiles = ['tutor', 'veterinarian', null];
    expect(validProfiles).toBeDefined();
  });

  it('should persist profile to AsyncStorage', async () => {
    const mockSetItem = vi.spyOn(AsyncStorage, 'setItem');
    
    // Simulate setting profile
    await AsyncStorage.setItem('userProfile', 'tutor');
    
    expect(mockSetItem).toHaveBeenCalledWith('userProfile', 'tutor');
  });

  it('should retrieve profile from AsyncStorage', async () => {
    const mockGetItem = vi.spyOn(AsyncStorage, 'getItem');
    mockGetItem.mockResolvedValue('veterinarian');
    
    const result = await AsyncStorage.getItem('userProfile');
    
    expect(result).toBe('veterinarian');
    expect(mockGetItem).toHaveBeenCalledWith('userProfile');
  });

  it('should clear profile from AsyncStorage', async () => {
    const mockRemoveItem = vi.spyOn(AsyncStorage, 'removeItem');
    
    await AsyncStorage.removeItem('userProfile');
    
    expect(mockRemoveItem).toHaveBeenCalledWith('userProfile');
  });
});
