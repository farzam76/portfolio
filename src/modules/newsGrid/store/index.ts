import React, { useContext } from 'react';
import { NewsGridType } from './store';

export const NewsGridStoreContext =
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  React.createContext<NewsGridType>(null!);
export function useNewsGridStore(): NewsGridType {
  return useContext(NewsGridStoreContext);
}
