import { Instance, types } from 'mobx-state-tree';


export const LandingStore = types
  .model('Landing', {

  })
  .actions(() => ({

  }))
  .actions(() => ({

  }));

export type LandingType = Instance<typeof LandingStore>;
