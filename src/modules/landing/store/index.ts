import React, { useContext } from 'react';
import { LandingType } from './store';

export const LandingStoreContext =
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  React.createContext<LandingType>(null!);
export function useLandingStore(): LandingType {
  return useContext(LandingStoreContext);
}
