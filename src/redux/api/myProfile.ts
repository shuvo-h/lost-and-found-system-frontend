
import { tagTypes } from '../tag-types';
import { baseApi } from './baseAPI';


export const profileAPi = baseApi.injectEndpoints({
   endpoints: (build) => ({
      getMYProfile: build.query({
         query: () => {
            return {
               url: '/my-profile',
               method: 'GET',
            };
         },
         providesTags: [tagTypes.user],
      }),

   }),
});

export const { useGetMYProfileQuery, } = profileAPi;