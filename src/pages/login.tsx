'use client'

import { LoadingIcon } from '@/components/ui/Icons'
import { useAuthentication } from '@/hooks/authentication.hook'
import router from 'next/router'
import type React from 'react'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface LoginFormData {
  username: string
  password: string
}

export default function LoginForm() {
  const { login } = useAuthentication()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data: LoginFormData) => {
    if (isSubmitting) return

    const { username, password } = data
    setError('')

    setIsSubmitting(true)

    try {
      await login({ username, password })
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid username or password')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(data => onSubmit(data))}>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                {...register('username', {
                  required: true,
                })}
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                disabled={isSubmitting}
              />
              {errors.username && <span className="text-red-500 text-sm mt-1">Please enter a valid username</span>}
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                {...register('password', {
                  required: true,
                })}
                id="password"
                {...register('password', {
                  required: true,
                })}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm pr-10"
                placeholder="Password"
                disabled={isSubmitting}
                type="password"
              />
              {errors.password && <span className="text-red-500 text-sm mt-1">Please enter a valid password</span>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoadingIcon />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
