
import { tagTypes } from '../tag-types';
import { baseApi } from './baseAPI';


export const categoryAPi = baseApi.injectEndpoints({
   endpoints: (build) => ({
      getCategory: build.query({
         query: (arg: Record<string, any>) => {
            return {
               url: '/found-item-categories',
               method: 'GET',
               params: arg,
            };
         },
         providesTags: [tagTypes.category],
      }),

   }),
});

export const { useGetCategoryQuery, } = categoryAPi;