'use client';

import Image from "next/image";
import logo from '@/assets/img/logo.png'
import { useLogin } from './useLogin' 

export default function Home() {
  const { handleSubmit, error, loading } = useLogin()

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white border border-gray-300 px-10 py-12">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image src={logo} alt="Company Logo" priority width={160} height={160} />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-1">ERP Login</h3>
          <p className="text-gray-600 text-sm">
            Please enter your credentials to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="px-4 py-2 border border-gray-300 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="px-4 py-2 border border-gray-300 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 text-sm font-medium hover:bg-blue-700 transition duration-300 cursor-pointer">{loading ? 'Logging in...' : 'Login'}</button>

          {error && (
            <div className="text-sm text-red-700 bg-red-100 border border-red-300 p-2 text-center">
              <strong>Error:</strong> {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
