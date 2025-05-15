import { api } from "../baseApi";

const serviceSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllService: builder.query({
      query: ({ search, title, page = 1, limit = 10 }) => {
        let queryString = '/services/get-all-services';
        const params = new URLSearchParams();

        if (search) params.append('query', search);
        if (title) params.append('title', title);
        params.append('page', page);
        params.append('limit', limit);

        const queryParams = params.toString();
        if (queryParams) {
          queryString += `?${queryParams}`;
        }

        return {
          url: queryString,
          method: 'GET',
        };
      },
      providesTags: ['service'],
    }),
    postBecmeAContibutor: builder.mutation({
      query: () => ({
        url: `/services/become-contributor`,
        method: "POST",
        invalidatesTags: ["service"]
      })
      
    })
  }),
  
});

export const { useGetAllServiceQuery,

  usePostBecmeAContibutorMutation,
 } = serviceSlice;
