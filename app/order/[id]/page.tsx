"use client"

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Loading from '@/app/loading';

type OrderDetails = {
  _id: string;
  userDetails: {
    fullName: string;
    age: number;
    address: string;
    phone: number;
  };
  room: {
    title: string;
  };
  checkIn: string;
  checkOut: string;
  numOfPeople: number;
  paymentMethod: string;
  totalPrice: number;
  status: 'pending' | 'paid' | 'cancelled';
  specialRequests?: string;
};

export default function OrderDetailsPage() {
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const params = useParams();
  const router = useRouter();

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/order/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.id]);

  // Update the order status to 'paid'
  const updateOrderStatus = async (status: 'paid') => {
    try {
      const response = await fetch(`/api/order/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      setOrder((prevOrder) => (prevOrder ? { ...prevOrder, status } : null));
    } catch (err) {
      setError('Failed to update order status');
    }
  };

  if (loading) return <Loading/>
  if (error) return <div className="text-center pt-16 text-error">{error}</div>;
  if (!order) return <div className="text-center pt-16">Order not found</div>;

  return (
    <div className="container mx-auto p-4 pt-16">
      <h1 className="text-3xl font-bold text-center mb-6">Order Details</h1>

      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">Booking Information</h2>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Room:</strong> {order.room.title}</p>
          <p><strong>Full Name:</strong> {order.userDetails.fullName}</p>
          <p><strong>Age:</strong> {order.userDetails.age}</p>
          <p><strong>Address:</strong> {order.userDetails.address}</p>
          <p><strong>Phone:</strong> {order.userDetails.phone}</p>
          <p><strong>Check In:</strong> {new Date(order.checkIn).toLocaleDateString()}</p>
          <p><strong>Check Out:</strong> {new Date(order.checkOut).toLocaleDateString()}</p>
          <p><strong>Number of People:</strong> {order.numOfPeople}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          <p><strong>Special Requests:</strong> {order.specialRequests || 'None'}</p>
          <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
          <p>
            <strong>Status:</strong>{' '}
            <span className={`badge ${order.status === 'paid' ? 'badge-success' : 'badge-warning'}`}>
              {order.status}
            </span>
          </p>
        </div>
      </div>

      {/* Payment Section */}
      {order.status !== 'paid' && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
          <PayPalScriptProvider options={{ "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE", // Add the intent property
                  purchase_units: [
                    {
                      amount: {
                        currency_code: 'USD', // Ensure currency_code is provided
                        value: order.totalPrice.toString(),
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                if (actions.order) {
                  const details = await actions.order.capture();
                  if (details.status === 'COMPLETED') {
                    await updateOrderStatus('paid');
                    router.push(`/order/${order._id}?payment=success`);
                  }
                }
              }}
            />
          </PayPalScriptProvider>
        </div>
      )}

      {error && <div className="alert alert-error">{error}</div>}
    </div>
  );
}
