import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";
import { useAppSelector } from '../hooks';

interface CheckoutItem {
    productId: string;
    name: string;
    color: string;
    size: string;
    price: number;
    qty: number;
    image: string;
}

interface ShippingAddress {
    address: string;
    city: string;
    country: string;
}

interface Checkout {
    _id: string;
    createdAt: Date;
    checkoutItems: CheckoutItem[];
    shippingAddress: ShippingAddress;
}





const OrderConfirmationPage: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {checkout} = useAppSelector((state) => state.checkout);

     useEffect(() => {
        if (checkout?._id) {
            dispatch(clearCart())
            if (typeof window !== 'undefined') {
                localStorage.removeItem("cart")
            }
        } else {
            navigate("/my-orders")
        }
    }, [checkout, dispatch, navigate])


    // const calculateEstimatedDelivery = (createdAt: Date): string => {
    //     const orderDate = new Date(createdAt);
    //     orderDate.setDate(orderDate.getDate() + 10);
    //     return orderDate.toLocaleDateString();
    // };

    const calculateEstimatedDelivery = (createdAt?: Date | string): string => {
        if (!createdAt) return "—";

        const orderDate = new Date(createdAt);
        // invalid date එකක් නම්
        if (isNaN(orderDate.getTime())) return "—";

        orderDate.setDate(orderDate.getDate() + 10);
        return orderDate.toLocaleDateString();
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
                Thank You for Your Order
            </h1>

            {checkout && (
                <div className="p-6 rounded-lg border">
                    {/* Order Header */}
                    <div className="flex justify-between mb-20">
                        <div>
                            <h2 className="text-xl font-semibold">
                                Order Id: {checkout._id}
                            </h2>
                            <p className="text-gray-500">
                                Order Date:{" "}
                                {checkout?.createdAt 
                                    ? new Date(checkout.createdAt).toLocaleDateString() 
                                    : "Loading..."}
                            </p>
                        </div>

                        <div>
                            <p className="text-emerald-700 text-sm">
                                Estimated Delivery: {calculateEstimatedDelivery(checkout?.createdAt)}
                            </p>
                        </div>
                    </div>

                    {/* Ordered Items */}
                    <div className="mb-20">
                        {checkout.checkoutItems.map((item) => (
                            <div
                                key={item.productId}
                                className="flex items-center mb-4"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-md mr-4"
                                />

                                <div>
                                    <h4 className="text-md font-semibold">
                                        {item.name}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        {item.color} | {item.size}
                                    </p>
                                </div>

                                <div className="ml-auto text-right">
                                    <p className="text-md">Rs.{item.price}</p>
                                    <p className="text-sm text-gray-500">
                                        Qty: {item.quantity}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Payment & Delivery */}
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-lg font-semibold mb-2">
                                Payment
                            </h4>
                            <p className="text-gray-600">
                                Debit / Credit Card
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-2">
                                Delivery
                            </h4>
                            <p className="text-gray-600">
                                {checkout.shippingAddress.city},{" "}
                                {checkout.shippingAddress.country}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderConfirmationPage;
