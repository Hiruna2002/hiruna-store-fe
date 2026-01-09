import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/slices/orderSlice";
import { useAppDispatch } from '../hooks';
import { useAppSelector } from '../hooks';

interface OrderItem {
  name: string;
  image: string;
}

interface ShippingAddress {
  city: string;
  Country: string;
}

interface Order {
  _id: string;
  createdAt: Date;
  shippingAddress?: ShippingAddress;
  orderItems: OrderItem[];
  totalPrice: number;
  isPaid: boolean;
}


const MyOrdersPage:FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {orders,loading,error} = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);


  const handleRowClick = (orderId: string | number) => {
    navigate(`/order/${orderId}`);
};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>

      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-sm sm:text-base text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4">Shipping Address</th>
              <th className="py-3 px-4">Items</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="py-2 px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </td>

                  <td className="py-2 px-4 font-medium text-gray-900">
                    #{order._id}
                  </td>

                  <td className="py-2 px-4">
                    {order.createdAt.toLocaleDateString()}{" "}
                    {order.createdAt.toLocaleTimeString()}
                  </td>

                  <td className="py-2 px-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.Country}`
                      : "N/A"}
                  </td>

                  <td className="py-2 px-4">
                    {order.orderItems.length}
                  </td>

                  <td className="py-2 px-4">
                    Rs. {order.totalPrice}
                  </td>

                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="py-4 px-4 text-center text-gray-500"
                >
                  You have no orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
