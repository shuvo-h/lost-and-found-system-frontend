
import { tagTypes } from '../tag-types';
import { baseApi } from './baseAPI';


export const foundAPi = baseApi.injectEndpoints({
   endpoints: (build) => ({
      
      createFoundItem: build.mutation({
         query: (data) => ({
            url: '/found-items',
            method: 'POST',
            // contentType: 'multipart/form-data',
            data,
         }),
         invalidatesTags: [tagTypes.found],
      }),
      
      getFoundItems: build.query({
         query: (arg: Record<string, any>) => {
            return {
               url: '/found-items',
               method: 'GET',
               params: arg,
            };
         },
         providesTags: [tagTypes.found],
      }),

   }),
});

export const { useGetFoundItemsQuery, useCreateFoundItemMutation  } = foundAPi;