import api from '@/redux/api/apiSlice'

const botApi = api.injectEndpoints({
  endpoints: build => ({
    getThreadMessages: build.query({
      query: threadId => ({
        url: `/threads/messages/${threadId}`
      })
    }),
    getBotUsingSlug: build.query({
      query: slug => ({
        url: `/bots/get-by-url/${slug}`
      })
    }),
    createThread: build.mutation({
      query: payload => ({
        url: '/threads/get-thread',
        method: 'POST',
        body: payload
      })
    }),
    getBotFAQ: build.query({
      query: bot_id => ({
        url: `/faqs/get-all?bot_id=${bot_id}`,
        params: { limit: 100 }
      })
    }),
    stopThreadRun: build.mutation({
      query: body => ({
        url: '/threads/stop-thread',
        method: 'POST',
        body
      })
    })
  })
})

export const {
  useGetThreadMessagesQuery,
  useGetBotUsingSlugQuery,
  useCreateThreadMutation,
  useGetBotFAQQuery,
  useStopThreadRunMutation
} = botApi
