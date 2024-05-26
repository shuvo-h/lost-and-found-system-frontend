
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
      createClaimItem: build.mutation({
         query: (data) => ({
            url: '/claims',
            method: 'POST',
            // contentType: 'multipart/form-data',
            data,
         }),
         invalidatesTags: [tagTypes.claim,tagTypes.metric,tagTypes.me],
      }),


   }),
});

export const { useGetClaimItemsQuery, useCreateClaimItemMutation} = claimAPi;