const { default: api } = require('../api/apiSlice')

const usersApi = api.injectEndpoints({
  endpoints: build => ({
    getUser: build.query({
      query: id => ({
        url: `users/get/${id}`
      }),
      providesTags: ['user']
    })
  })
})

export const { useGetUserQuery } = usersApi
