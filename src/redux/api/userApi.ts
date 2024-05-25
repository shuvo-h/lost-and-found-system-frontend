
import { tagTypes } from '../tag-types';
import { baseApi } from './baseAPI';


export const userApi = baseApi.injectEndpoints({
   endpoints: (build) => ({
      getAllUsers: build.query({
         query: () => {
            return {
               url: '/users',
               method: 'GET',
            };
         },
         providesTags: [tagTypes.user],
      }),
      updateUserStatusById: build.mutation({
        query: ({user_id,status}) => ({
            url: `/users/${user_id}/status`,
            method: 'PATCH',
            // contentType: 'multipart/form-data',
            data:{status},
        }),
        invalidatesTags: [tagTypes.user],
    }),

   }),
});

export const { useGetAllUsersQuery, useUpdateUserStatusByIdMutation } = userApi;