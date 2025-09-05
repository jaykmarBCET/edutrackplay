import crypto from 'crypto'

export const verifySignature = ({
  orderId,
  paymentId,
  razorpaySignature,
}: {
  orderId: string
  paymentId: string
  razorpaySignature: string
}) => {
  const razorpaySecretKey = process.env.RAZORPAY_SECRET_KEY_ID!
  if (!razorpaySecretKey) throw new Error("Missing RAZORPAY_KEY_SECRET in env")

  // Step 1: Create the string to sign
  const body = `${orderId}|${paymentId}`

  // Step 2: Generate expected signature
  const expectedSignature = crypto
    .createHmac('sha256', razorpaySecretKey)
    .update(body)
    .digest('hex')

  // Step 3: Match signatures
  return expectedSignature === razorpaySignature
}
