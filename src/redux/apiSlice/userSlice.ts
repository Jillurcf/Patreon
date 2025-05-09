import { api } from "../baseApi";

const userSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: ()=> ({
                url: `/users/auth/profile`,
                method: "GET"
            }),
            providesTags: ["user"]
        }),
        patchUpdateUserProfile: builder.mutation({
            
            query: (formData) => ({
              url: '/users/auth/update-profile-by-user',
              method: 'PATCH',
              body: formData, // this will be FormData
              // Do NOT set headers here — let fetch infer multipart/form-data
            }),
            invalidatesTags: ['user'],
          }),
          
          
    })
})

export const {

    useGetUserQuery,
    usePatchUpdateUserProfileMutation,
} = userSlice;