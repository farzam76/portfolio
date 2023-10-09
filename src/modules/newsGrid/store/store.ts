import { Instance, types } from 'mobx-state-tree';
import { callEndpoint, RequestState, State } from '../../axios';
export interface NewsArticle {
  title:string;
    site: string;
    guid: string,
    url:string;
    clean_summary:string;
    publish_date:string;
    top_image:string;
    tags:string[];
    related : {guid:string}[];
}
export interface PagginatedResponse <T> {
    count:number;
    next?:string;
    previous?:string;
    results:T[];
}

export const NewsGridStore = types
  .model('newsGrid', {
    trendingArticles: types.optional(types.frozen<RequestState<PagginatedResponse<NewsArticle>>>(), {
      state: State.Initial,
    }),
  })
  .actions((self) => ({
    setTrendingArticles: (state: RequestState<PagginatedResponse<NewsArticle>>) => {
        self.trendingArticles = state;
      },
  }))
  .actions((self) => ({
    fetchTrendingByCountry: async ({ countryCode }: { countryCode: string }): Promise<void> => {
        const request = callEndpoint<PagginatedResponse<NewsArticle>>({
          config: {
            method: 'get',
            url: `/trending/${countryCode}`,
          },
        });
        // eslint-disable-next-line no-restricted-syntax
        for await (const requestState of request) {
          self.setTrendingArticles(requestState);
        }
      },
  }));

export type NewsGridType = Instance<typeof NewsGridStore>;
