
import { tagTypes } from '../tag-types';
import { baseApi } from './baseAPI';


export const metricApi = baseApi.injectEndpoints({
   endpoints: (build) => ({
      getDashboardMetrics: build.query({
         query: () => {
            return {
               url: '/metrics',
               method: 'GET',
            };
         },
        //  providesTags: [tagTypes.user],
      }),

   }),
});

export const { useGetDashboardMetricsQuery, } = metricApi;