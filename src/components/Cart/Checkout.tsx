import { FC, useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import { useAppSelector } from '../../hooks';
import { useAppDispatch } from '../../hooks';



interface CartProduct {
    name: string;
    size: string;
    color: string;
    price: number;
    image: string;
}

interface CartType {
    products: CartProduct[];
    totalPrice: number;
}

interface ShippingAddress {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
}

const Checkout: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {cart,loading,error} = useAppSelector((state) => state.cart);
    const {user} = useAppSelector((state) => state.auth);

    const [checkoutId, setCheckoutId] = useState<string | null>(null);

    const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    });

     useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

//    const handleCreateCheckout = async(e: React.FormEvent) => {
//         e.preventDefault();
//         if(cart && cart.products.length > 0){
//             const res = dispatch(
//                 createCheckout({
//                     checkoutItems: cart.products,
//                     shippingAddress,
//                     paymentMethod: "Credit/Debit Card",
//                     totalPrice: cart.totalPrice,
//                 })
//             )
//             if((await res).payload && (await res).payload._id){
//                 setCheckoutId((await res).payload._id);
//             }
//         }
//     }

    const handleCreateCheckout = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!cart || cart.products.length === 0) return;

        const checkoutItems = cart.products.map(item => ({
            productId: item.productId,
            name: item.name ?? "Unknown Product",
            image: item.image ?? "/images/placeholder.png",
            price: item.price ?? 0,
            quantity: item.quantity,
        }));

        const actionResult = await dispatch(
            createCheckout({
            checkoutItems,
            shippingAddress,
            paymentMethod: "Credit/Debit Card",
            totalPrice: cart.totalPrice,
            })
        );

        if (createCheckout.fulfilled.match(actionResult)) {
            const checkout = actionResult.payload;
            if (checkout?._id) {
            setCheckoutId(checkout._id);
            }
        }
    };

    const handleInputChange =
        (field: keyof ShippingAddress) =>
        (e: ChangeEvent<HTMLInputElement>) => {
            setShippingAddress((prev) => ({
                ...prev,
                [field]: e.target.value,
            }));
        };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
            {/* Left Section */}
            <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl uppercase mb-6">Checkout</h2>

                <form onSubmit={handleCreateCheckout}>
                    <h3 className="text-lg mb-4">Contact Details</h3>

                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={user?.email || ""}
                            className="w-full p-2 border rounded"
                            disabled
                        />
                    </div>

                    <h3 className="text-lg mb-4">Delivery</h3>

                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">First Name</label>
                            <input
                                type="text"
                                value={shippingAddress.firstName}
                                onChange={handleInputChange("firstName")}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Last Name</label>
                            <input
                                type="text"
                                value={shippingAddress.lastName}
                                onChange={handleInputChange("lastName")}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <input
                            type="text"
                            value={shippingAddress.address}
                            onChange={handleInputChange("address")}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">City</label>
                            <input
                                type="text"
                                value={shippingAddress.city}
                                onChange={handleInputChange("city")}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Postal Code</label>
                            <input
                                type="text"
                                value={shippingAddress.postalCode}
                                onChange={handleInputChange("postalCode")}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Country</label>
                            <input
                                type="text"
                                value={shippingAddress.country}
                                onChange={handleInputChange("country")}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Contact</label>
                            <input
                                type="text"
                                value={shippingAddress.phone}
                                onChange={handleInputChange("phone")}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        {!checkoutId ? (
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-3 rounded"
                            >
                                Continue to payment
                            </button>
                        ) : (
                            <p className="text-green-600 text-center">
                                Checkout Created ✔
                            </p>
                        )}
                    </div>
                </form>
            </div>

            {/* Right Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg mb-4">Order Summary</h3>

                <div className="border-t py-4 mb-4">
                    {cart.products.map((product, index) => (
                        <div
                            key={index}
                            className="flex items-start justify-between py-2 border-b"
                        >
                            <div className="flex items-start">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-20 h-24 object-cover mr-4"
                                />
                                <div>
                                    <h3 className="text-md">{product.name}</h3>
                                    <p className="text-gray-500">
                                        Size: {product.size}
                                    </p>
                                    <p className="text-gray-500">
                                        Color: {product.color}
                                    </p>
                                </div>
                            </div>
                            <p className="text-xl">Rs.{product.price}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between text-lg mb-4">
                    <p>Subtotal</p>
                    <p>Rs.{cart.totalPrice.toLocaleString()}</p>
                </div>

                <div className="flex justify-between text-lg">
                    <p>Shipping</p>
                    <p>Free</p>
                </div>

                <div className="flex justify-between text-lg mt-4 border-t pt-4">
                    <p>Total</p>
                    <p>Rs.{cart.totalPrice.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
