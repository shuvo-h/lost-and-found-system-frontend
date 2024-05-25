
import { TMeta } from '@/types'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import { axiosInstance,  } from './axiosInstance'

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method?: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
      headers?: AxiosRequestConfig['headers']
      meta?: TMeta,
      contentType?: string,
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers, contentType }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers:{
          "Content-Type": contentType || "application/json"
        },
      })
      // console.log({result});
      
      return result
    } catch (axiosError:any) {
      // console.log(axiosError);
      
     
      return {
        error: {
          status: axiosError?.statusCode,
          errorDetails: axiosError?.errorDetails,
          message: axiosError?.message,
          data: null,
        },
      }
    }
  }

  