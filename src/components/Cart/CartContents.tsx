import { RiDeleteBin3Line } from "react-icons/ri";
import { useAppDispatch } from '../../hooks';
import { removeFromCart, updateCartItemQuantity } from "../../redux/slices/cartSlice";

interface CartProduct {
    productId: number;
    name: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
    image: string;
}

interface CartContentsProps {
  cart: { products: CartProduct[] };
  userId: string | null;
  guestId?: string | null;
}

const CartContents: React.FC<CartContentsProps> =({cart,userId,guestId})=> {
    const dispatch = useAppDispatch();

    const handleAddToCart = (productId: any , delta: number , quantity: number , size: string, color: string) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1) {
            dispatch(updateCartItemQuantity({ 
                productId, 
                quantity: 
                newQuantity, 
                size, 
                color, 
                userId: userId ?? undefined, 
                guestId: guestId ?? undefined 
            }));
        }
    }

    const handleRemoveFromCart = (productId: any, size: string, color: string) => {
        dispatch(removeFromCart({ 
            productId, 
            size, 
            color, 
            userId: userId ?? undefined, 
            guestId: guestId ?? undefined 
        }));
    }

    return (
        <div>
            {cart.products.map((product: CartProduct, index: number) => (
                <div key={index} className="flex items-start justify-between py-4 border-b">
                    <div className="flex items-start">
                        <img src={product.image} alt={product.name} className="w-20 h-24 object-cover mr-4 rounded"/>
                        <div>
                            <h3>{product.name}</h3>
                            <p className="text-sm text-gray-500">
                                size: {product.size} | color: {product.color}
                            </p>
                            <div className="flex items-center mt-2">
                                <button 
                                onClick={() =>
                                     handleAddToCart(product.productId, -1, product.quantity, product.size, product.color)
                                }
                                className="border rounded px-2 py-1 text-xl font-medium">
                                    -
                                </button>
                                <span className="mx-4">{product.quantity}</span>
                                <button 
                                onClick={() =>
                                     handleAddToCart(product.productId, 1, product.quantity, product.size, product.color)
                                }className="border rounded px-2 py-1 text-xl font-medium">+</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>Rs. {product.price.toLocaleString()}</p>
                        <button
                        onClick={() => handleRemoveFromCart(product.productId, product.size, product.color)}
                        >
                            <RiDeleteBin3Line className="w-6 h-6 mt-2 text-red-600" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default CartContents;