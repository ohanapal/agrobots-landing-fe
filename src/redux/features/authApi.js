import api from '@/redux/api/apiSlice'

const rootApi = '/users'

const authApi = api.injectEndpoints({
  endpoints: build => ({
    signup: build.mutation({
      query: payload => ({
        url: `${rootApi}/request-signup`,
        method: 'POST',
        body: payload
      })
    }),
    signupVerify: build.mutation({
      query: payload => ({
        url: `${rootApi}/signup`,
        method: 'POST',
        body: payload
      })
    }),
    login: build.mutation({
      query: payload => ({
        url: '/auth/login',
        method: 'POST',
        body: payload
      })
    }),
    forgotPassword: build.mutation({
      query: payload => ({
        url: '/password-manager/forget-password',
        method: 'POST',
        body: payload
      })
    }),
    forgotOTPVerify: build.mutation({
      query: payload => ({
        url: '/password-manager/verify-otp',
        method: 'POST',
        body: payload
      })
    }),
    resetPassword: build.mutation({
      query: payload => ({
        url: '/password-manager/reset-password',
        method: 'POST',
        body: payload
      })
    })
  })
})

export const {
  useSignupMutation,
  useSignupVerifyMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useForgotOTPVerifyMutation,
  useResetPasswordMutation
} = authApi
