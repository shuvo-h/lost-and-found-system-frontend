
import { tagTypes } from '../tag-types';
import { baseApi } from './baseAPI';


export const claimAPi = baseApi.injectEndpoints({
   endpoints: (build) => ({
      getClaimItems: build.query({
         query: (arg: Record<string, any>) => {
            return {
               url: '/claims',
               method: 'GET',
               params: arg,
            };
         },
         providesTags: [tagTypes.claim],
      }),

   }),
});

export const { useGetClaimItemsQuery, } = claimAPi;