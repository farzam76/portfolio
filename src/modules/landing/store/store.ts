import { Instance, types } from 'mobx-state-tree';
import { callEndpoint, RequestState, State } from '../../axios';


export const LandingStore = types
  .model('Landing', {
    
  })
  .actions((self) => ({
    
  }))
  .actions((self) => ({
    
  }));

export type LandingType = Instance<typeof LandingStore>;
