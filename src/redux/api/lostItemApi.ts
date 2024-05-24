
import { tagTypes } from '../tag-types';
import { baseApi } from './baseAPI';


export const lostAPi = baseApi.injectEndpoints({
   endpoints: (build) => ({
      getLostItems: build.query({
         query: (arg: Record<string, any>) => {
            return {
               url: '/lost-items',
               method: 'GET',
               params: arg,
            };
         },
         providesTags: [tagTypes.lost],
      }),
      getLostItemById: build.query({
            query: (arg: Record<string, any>) => {
                return {
                url: '/lost-items',
                method: 'GET',
                params: arg,
                };
            },
            transformResponse: (response: any,) => {
                return {
                   ...response?.length ? response[0]:{} ,
                };
             },
        }),
        
        createLostItem: build.mutation({
            query: (data) => ({
                url: '/lost-items',
                method: 'POST',
                // contentType: 'multipart/form-data',
                data,
            }),
            invalidatesTags: [tagTypes.lost],
        }),
        
        updateLostItemById: build.mutation({
            query: ({item_id,data}) => ({
                url: `/lost-items/${item_id}`,
                method: 'PATCH',
                // contentType: 'multipart/form-data',
                data,
            }),
            invalidatesTags: [tagTypes.lost],
        }),
    
        
      deleteLostItemById: build.mutation({
         query: (item_id) => ({
            url: `/lost-items/${item_id}`,
            method: 'DELETE',
            // contentType: 'multipart/form-data',
         }),
         invalidatesTags: [tagTypes.lost],
      }),
      

   }),
});

export const { 
   useGetLostItemsQuery, 
   useGetLostItemByIdQuery,
   useCreateLostItemMutation,
   useUpdateLostItemByIdMutation,
    useDeleteLostItemByIdMutation,
} = lostAPi;