/* eslint-disable @typescript-eslint/no-explicit-any */
// Payment service for handling MoMo payment integration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export interface PaymentResponse {
  success: boolean
  payUrl?: string
  message?: string
  error?: string
  verified?: boolean
  data?: any
}

/**
 * Create a MoMo payment request
 * @param amount - The payment amount in VND
 * @returns The payment URL to redirect to
 */
export const createMoMoPayment = async (amount: string): Promise<PaymentResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/payment/momo-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create payment')
    }

    // Handle the new response format from the backend
    if (data.data && data.data.payUrl) {
      return {
        success: true,
        payUrl: data.data.payUrl,
        message: data.message,
        data: data.data
      }
    }

    return data
  } catch (error) {
    console.error('Error creating MoMo payment:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create payment'
    }
  }
}

/**
 * Verify a MoMo payment
 * @param orderId - The order ID returned from MoMo
 * @param resultCode - The result code returned from MoMo
 * @returns Payment verification result
 */
export const verifyMoMoPayment = async (orderId: string, resultCode: string): Promise<PaymentResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/payment/momo/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ orderId, resultCode })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to verify payment')
    }

    return data
  } catch (error) {
    console.error('Error verifying MoMo payment:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to verify payment'
    }
  }
}
