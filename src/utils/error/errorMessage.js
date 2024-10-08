import { AxiosError } from 'axios'

export const errorMessage = error => {
  if (error instanceof AxiosError) {
    console.error(error?.response?.data?.message)
    return error?.response?.data?.message
  } else {
    console.error(errorMessage(error))
    return errorMessage(error)
  }
}

export const rtkErrorMesage = error => {
  console.error(error?.data?.message || error?.message)
  return error?.data?.message || error?.message
}
