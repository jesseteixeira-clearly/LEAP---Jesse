'server-only'
import { TEST_SECRET } from '@/constants/user.constants'
import { SignJWT, jwtVerify } from 'jose'
import { NextRequest } from 'next/server'
 
export const createJWT = async (userName: string, passWord: string) => {
  const jwtKey = new TextEncoder().encode(TEST_SECRET)

  return await new SignJWT({ userName, passWord }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().sign(jwtKey)
}

export const checkSession = async (request?: NextRequest) => {
  const token = request?.cookies?.get('token')?.value  
  if (!token) {
    return null
  }

  const jwtKey = new TextEncoder().encode(TEST_SECRET)

  try {
    const { payload } = await jwtVerify(token, jwtKey)
    return payload
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}
