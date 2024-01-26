import { useContext } from 'react';
import { StoreContext } from '@/stores/provider';

export const useStores = () => {
  return useContext(StoreContext);
};
