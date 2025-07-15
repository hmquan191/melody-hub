'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { verifyMoMoPayment } from '@/lib/services/payment'

export default function CheckoutSuccess() {
  // const router = useRouter();
  const searchParams = useSearchParams()
  const [verifying, setVerifying] = useState(true)
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState('')

  // Get payment status from URL parameters
  // MoMo might return different parameter names depending on the version
  const orderId = searchParams.get('orderId') || searchParams.get('orderid')
  const resultCode = searchParams.get('resultCode') || searchParams.get('resultcode')
  const message = searchParams.get('message') || searchParams.get('errorMessage')
  // const extraData = searchParams.get('extraData')

  useEffect(() => {
    const verifyPayment = async () => {
      if (orderId && resultCode) {
        try {
          setVerifying(true)
          const response = await verifyMoMoPayment(orderId, resultCode)

          if (response.success) {
            setVerified(response.verified || false)
          } else {
            setError(response.message || 'Payment verification failed')
            setVerified(false)
          }
        } catch (error) {
          console.error('Error verifying payment:', error)
          setError('Failed to verify payment status')
          setVerified(false)
        } finally {
          setVerifying(false)
        }
      } else {
        setVerifying(false)
        setError('Missing payment information')
        setVerified(false)
      }
    }

    verifyPayment()
  }, [orderId, resultCode])

  // Clear cart after successful payment
  useEffect(() => {
    if (resultCode === '0' && verified) {
      localStorage.removeItem('cart')
    }
  }, [resultCode, verified])

  if (verifying) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl p-8'>
          <div className='text-center'>
            <div className='mb-4'>
              <div className='w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto'></div>
            </div>
            <h1 className='text-2xl font-bold text-gray-800 mb-4'>Verifying Payment</h1>
            <p className='text-gray-600'>Please wait while we verify your payment...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl p-8'>
        {resultCode === '0' && verified ? (
          <div className='text-center'>
            <div className='mb-4 text-green-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-16 w-16 mx-auto'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
              </svg>
            </div>
            <h1 className='text-2xl font-bold text-gray-800 mb-4'>Payment Successful!</h1>
            <p className='text-gray-600 mb-6'>
              Thank you for your purchase. Your order has been processed successfully.
            </p>
            <p className='text-sm text-gray-500 mb-6'>Order ID: {orderId}</p>
            <div className='mt-6'>
              <Link
                href='/homepage'
                className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300'
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        ) : (
          <div className='text-center'>
            <div className='mb-4 text-red-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-16 w-16 mx-auto'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </div>
            <h1 className='text-2xl font-bold text-gray-800 mb-4'>Payment Failed</h1>
            <p className='text-gray-600 mb-6'>{error || message || 'There was an issue processing your payment.'}</p>
            <p className='text-sm text-gray-500 mb-6'>Error Code: {resultCode}</p>
            <div className='mt-6 space-x-4'>
              <Link
                href='/checkout'
                className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300'
              >
                Try Again
              </Link>
              <Link
                href='/homepage'
                className='bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition duration-300'
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
