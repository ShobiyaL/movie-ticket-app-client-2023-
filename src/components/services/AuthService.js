import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://movie-ticket-app-server.vercel.app/api/',
    
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      //  console.log(token);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
        
        return headers
      }
    },
  }),
  endpoints: (build) => ({
    getDetails: build.query({
      query: () => ({
        url: `protected/user/profile`,
        method: 'GET',
      }),
    }),
  }),
})

// export react hook
export const { useGetDetailsQuery } = authApi