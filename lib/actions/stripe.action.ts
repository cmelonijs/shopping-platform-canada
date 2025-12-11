'use server'

import { headers } from 'next/headers'
import { stripe } from '../../lib/stripe'
import { getOrderById } from '@/lib/actions/order.actions'
import { formatId } from '../utils'

export async function fetchClientSecret(orderId: string): Promise<string> {
  const origin = (await headers()).get('origin')

  const orderData = await getOrderById(orderId)
  if (!orderData.success || !orderData.order) {
    throw new Error('Order not found')
  }

  const { order } = orderData
  const totalAmount = Math.round(Number(order.totalPrice) * 100)

  const session = await stripe.checkout.sessions.create({
  ui_mode: 'embedded',
  line_items: [
    {
      price_data: {
        currency: 'cad',
        product_data: { name: `Order #${formatId(order.id)}` },
        unit_amount: totalAmount,
      },
      quantity: 1,
    },
  ],
  mode: 'payment',
  return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/en/order/${order.id}`,
  metadata: {
    orderId: order.id, 
  },
});

  if (!session.client_secret) {
    throw new Error('Client secret not avaiable')
  }

  return session.client_secret
}