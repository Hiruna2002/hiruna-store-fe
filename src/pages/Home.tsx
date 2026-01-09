// import Hero from "../components/Layout/Hero";
// import FeaturedCollection from "../components/Products/FeaturedCollection";
// import FeaturesSection from "../components/Products/Features";
// import Features from "../components/Products/Features";
// import GenderCollectionSection from "../components/Products/GenderCollectionSection";
// import NewArrivals from "../components/Products/NewArrivals";
// import ProductDetails from "../components/Products/ProductDetails";
// import ProductGrid from "../components/Products/ProductGrid";

// import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch, RootState } from "../redux/store";
// import { fetchProductsByFilters } from "../redux/slices/productsSlice";
// import axios from "axios";
// import { useEffect, useState } from "react";


// interface BestSellerProduct {
//   _id: string;
// }

// const Home:React.FC = () => {
//     const dispatch = useDispatch<AppDispatch>();

//     const { products, loading, error } = useSelector((state: RootState) => state.products);

// //   useSelector(
// //     (state: RootState) => state.products
// //   );

//   const [bestSellerProduct, setBestSellerProduct] =
//     useState<BestSellerProduct | null>(null);

//   useEffect(() => {
//     dispatch(
//       fetchProductsByFilters({
//         gender: "Women",
//         category: "Bottom Wear",
//         limit: "8",
//       })
//     );

//     const fetchBestSeller = async () => {
//       try {
//         const response = await axios.get<BestSellerProduct>(
//         `${import.meta.env.VITE_BACKEND_URL}/api/products/best-sellers`  
//         );
//         setBestSellerProduct(response.data);
//       } catch (error) {
//         console.error("Failed to fetch best seller product", error);
//       }
//     };

//     fetchBestSeller();
//   }, [dispatch]);

//     return (
//         <div>
//             <Hero />
//             <GenderCollectionSection />
//             <NewArrivals />

//             {/* {Best Seller} */}
//             <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
//             {bestSellerProduct ? (
//                 <ProductDetails productId={bestSellerProduct._id} />
//             ) : (
//                 <p className="text-center">Loading best seller product...</p>
//             )}
// {/* 
//             <div className="mx-auto container">
//                 <h2 className="text-3xl text-center font-bold mb-4">
//                     Top Wears for Women
//                 </h2>
//                 <ProductGrid 
//                     products={[bestSellerProduct]}
//                     loading={false} 
//                     error={null} 
//                 />
//             </div> */}

//             <div className="mx-auto container">
//     <h2 className="text-3xl text-center font-bold mb-4">
//         Top Wears for Women
//     </h2>

//     {bestSellerProduct ? (
//         <ProductGrid 
//             products={[bestSellerProduct]}
//             loading={false} 
//             error={null} 
//         />
//     ) : (
//         <div className="text-center py-10">
//             <p>Loading best seller...</p>
//             {/* optional: skeleton loader දාන්නත් පුළුවන් */}
//         </div>
//     )}
// </div>

            

//             <FeaturedCollection />
//             <FeaturesSection />
//         </div>
//     );
// }

// export default Home;



import Hero from "../components/Layout/Hero";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/Features";
import Features from "../components/Products/Features";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../components/Products/ProductGrid"; // Added import for Product interface

interface BestSellerProduct {
  _id: string;
}
const Home:React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error } = useSelector((state: RootState) => state.products);
// useSelector(
// (state: RootState) => state.products
// );
  const [bestSellerProduct, setBestSellerProduct] =
    useState<BestSellerProduct | null>(null);
  const [bestSellerFull, setBestSellerFull] =
    useState<Product | null>(null); // Added state for full product details
  useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: "8",
      })
    );
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get<BestSellerProduct>(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/best-sellers`
        );
        setBestSellerProduct(response.data);
        // Fetch full product details using the _id
        const productResponse = await axios.get<Product>(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/${response.data._id}`
        );
        setBestSellerFull(productResponse.data);
      } catch (error) {
        console.error("Failed to fetch best seller product", error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);
    return (
        <div>
            <Hero />
            <GenderCollectionSection />
            <NewArrivals />
            {/* {Best Seller} */}
            <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
            {bestSellerProduct ? (
                <ProductDetails productId={bestSellerProduct._id} />
            ) : (
                <p className="text-center">Loading best seller product...</p>
            )}
{/*
            <div className="mx-auto container">
                <h2 className="text-3xl text-center font-bold mb-4">
                    Top Wears for Women
                </h2>
                <ProductGrid
                    products={[bestSellerProduct]}
                    loading={false}
                    error={null}
                />
            </div> */}
            <div className="mx-auto container">
    <h2 className="text-3xl text-center font-bold mb-4">
        Top Wears for Women
    </h2>
    {bestSellerFull ? (
        <ProductGrid
            products={[bestSellerFull]}
            loading={false}
            error={null}
        />
    ) : (
        <div className="text-center py-10">
            <p>Loading best seller...</p>
            {/* optional: skeleton loader දාන්නත් පුළුවන් */}
        </div>
    )}
</div>
           
            <FeaturedCollection />
            <FeaturesSection />
        </div>
    );
}
export default Home;