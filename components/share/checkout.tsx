"use client"
import { fetchClientSecret } from "@/lib/actions/stripe.action"
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Checkout({ orderId }: { orderId: string }) {
  return (
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={{
        fetchClientSecret: () => fetchClientSecret(orderId),
        onComplete: () => {
          console.log("Payment complete!")
        },
      }}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  )
}