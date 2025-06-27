import axios from 'axios'
import { auth } from '@clerk/nextjs/server'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getAuthHeaders = async () => {
  const { getToken } = auth()
  const token = await getToken()
  
  return {
    Authorization: `Bearer ${token}`,
  }
}

export const authenticatedApiCall = async (config: any) => {
  const authHeaders = await getAuthHeaders()
  return apiClient({
    ...config,
    headers: {
      ...config.headers,
      ...authHeaders,
    },
  })
}

export const clientApiCall = async (token: string, config: any) => {
  return apiClient({
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
  })
}