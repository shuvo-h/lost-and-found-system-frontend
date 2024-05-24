
import { tagTypes } from '../tag-types';
import { baseApi } from './baseAPI';


export const foundAPi = baseApi.injectEndpoints({
   endpoints: (build) => ({
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
      getFoundItemById: build.query({
         query: (itemId:String) => {
            return {
               url: `/found-items/${itemId}`,
               method: 'GET',
            };
         },
      }),
      
      createFoundItem: build.mutation({
         query: (data) => ({
            url: '/found-items',
            method: 'POST',
            // contentType: 'multipart/form-data',
            data,
         }),
         invalidatesTags: [tagTypes.found],
      }),

      updateFoundItemById: build.mutation({
         query: ({item_id,data}) => ({
            url: `/found-items/${item_id}`,
            method: 'PATCH',
            // contentType: 'multipart/form-data',
            data,
         }),
         invalidatesTags: [tagTypes.found],
      }),
      
      deleteFoundItemById: build.mutation({
         query: (item_id) => ({
            url: `/found-items/${item_id}`,
            method: 'DELETE',
            // contentType: 'multipart/form-data',
         }),
         invalidatesTags: [tagTypes.found],
      }),
      

   }),
});

export const { 
   useGetFoundItemsQuery, 
   useGetFoundItemByIdQuery,
   useCreateFoundItemMutation , 
   useUpdateFoundItemByIdMutation,
   useDeleteFoundItemByIdMutation,
} = foundAPi;