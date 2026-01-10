// import { FC, useEffect, useRef, useState } from "react";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import axios from "axios";

// interface ProductImage {
//     url: string;
//     altText: string;
// }

// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   images: ProductImage[];
// }

// const NewArrivals: FC = () => {
//     const scrollRef = useRef<HTMLDivElement | null>(null);
//     const [isDragging, setIsDragging] = useState(false);
//     const [startX, setStartX] = useState(0);
//     const [scrollStartLeft, setScrollStartLeft] = useState(0);
//     const [canScrollLeft, setCanScrollLeft] = useState(false);
//     const [canScrollRight, setCanScrollRight] = useState(true);
//     const [newArrivals, setNewArrivals] = useState<Product[]>([]);
//     const [loading, setLoading] = useState(true);

// //     useEffect(() => {
// //     const fetchNewArrivals = async () => {
// //       try {
// //         setLoading(true);

// //         const response = await axios.get<Product[]>(
// //           `${import.meta.env.VITE_BACKEND_URL}/api/product/new-arrivals`
// //         );

// //         const validProducts: Product[] = response.data
// //           .map((product) => ({
// //             ...product,
// //             images:
// //               product.images?.filter(
// //                 (img) => img.url && img.url.trim() !== ""
// //               ) || [],
// //           }))
// //           .filter((product) => product.images.length > 0);

// //         setNewArrivals(validProducts);
// //       } catch (error) {
// //         console.error("Failed to fetch new arrivals:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchNewArrivals();
// //   }, []);

// useEffect(() => {
// //   const fetchNewArrivals = async () => {
// //     try {
// //       setLoading(true);

// //       const response = await axios.get(
// //         `${import.meta.env.VITE_BACKEND_URL}/api/product/new-arrivals`
// //       );

// //       console.log("API RESPONSE:", response.data);

// //       const products: Product[] = response.data.products;

// //       const validProducts: Product[] = products
// //         .map((product: Product) => ({
// //           ...product,
// //           images:
// //             product.images?.filter(
// //               (img) => img.url && img.url.trim() !== ""
// //             ) || [],
// //         }))
// //         .filter((product) => product.images.length > 0);

// //       setNewArrivals(validProducts);
// //     } catch (error) {
// //       console.error("Failed to fetch new arrivals:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// const fetchNewArrivals = async () => {
//   try {
//     setLoading(true);

//     const response = await axios.get<Product[]>(
//       `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
//     );

//     console.log("NEW ARRIVALS API RESPONSE 👉", response.data);

//     // Since your API returns an array, we can directly map over it
//     const validProducts = response.data
//       .map((product) => ({
//         ...product,
//         images:
//           product.images?.filter((img) => img.url && img.url.trim() !== "") || [],
//       }))
//       .filter((product) => product.images.length > 0);

//     setNewArrivals(validProducts);
//   } catch (error) {
//     console.error("Failed to fetch new arrivals:", error);
//   } finally {
//     setLoading(false);
//   }
// };

//   fetchNewArrivals();
// }, []);


//     // MOUSE DRAG
//     const handleMouseDown = (e: React.MouseEvent) => {
//         if (!scrollRef.current) return;
//         setIsDragging(true);
//         setStartX(e.pageX - scrollRef.current.offsetLeft);
//         setScrollStartLeft(scrollRef.current.scrollLeft);
//     };

//     const handleMouseMove = (e: React.MouseEvent) => {
//         if (!isDragging || !scrollRef.current) return;
//         const x = e.pageX - scrollRef.current.offsetLeft;
//         const walk = x - startX;
//         scrollRef.current.scrollLeft = scrollStartLeft - walk;
//     };

//     const handleMouseUpOrLeave = () => {
//         setIsDragging(false);
//     };

//     // SCROLL BUTTON (LEFT / RIGHT)
//     const scroll = (direction: "left" | "right") => {
//         if (!scrollRef.current) return;
//         const scrollAmount = direction === "left" ? -300 : 300;

//         scrollRef.current.scrollBy({
//             left: scrollAmount,
//             behavior: "smooth",
//         });
//     };

//     // UPDATE SCROLL BUTTON STATES
//     const updateScrollButtons = () => {
//         const container = scrollRef.current;
//         if (!container) return;

//         const left = container.scrollLeft;
//         const maxScroll = container.scrollWidth - container.clientWidth;

//         setCanScrollLeft(left > 0);
//         setCanScrollRight(left < maxScroll);
//     };

//     useEffect(() => {
//         const container = scrollRef.current;
//         if (!container) return;

//         container.addEventListener("scroll", updateScrollButtons);
//         updateScrollButtons();

//         return () => {
//             container.removeEventListener("scroll", updateScrollButtons);
//         };
//     }, []);

//     return (
//         <section className="py-16 px-4 lg:px-0">
//             <div className="container mx-auto text-center mb-10 relative">
//                 <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
//                 <p className="text-lg text-gray-600 mb-8">
//                     Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
//                 </p>

//                 {/* Scroll Buttons */}
//                 <div className="absolute right-0 bottom-[-30px] flex space-x-2">
//                     {/* LEFT BUTTON */}
//                     <button
//                         onClick={() => scroll("left")}
//                         disabled={!canScrollLeft}
//                         className={`p-2 rounded border ${canScrollLeft ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
//                     >
//                         <FiChevronLeft className="text-2xl" />
//                     </button>

//                     {/* RIGHT BUTTON */}
//                     <button
//                         onClick={() => scroll("right")}
//                         disabled={!canScrollRight}
//                         className={`p-2 rounded border ${canScrollRight ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
//                     >
//                         <FiChevronRight className="text-2xl" />
//                     </button>
//                 </div>
//             </div>

//             {/* Scrollable Slider */}
//             <div
//                 ref={scrollRef}
//                 className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${
//                     isDragging ? "cursor-grabbing" : "cursor-grab"
//                 }`}
//                 onMouseDown={handleMouseDown}
//                 onMouseMove={handleMouseMove}
//                 onMouseUp={handleMouseUpOrLeave}
//                 onMouseLeave={handleMouseUpOrLeave}
//             >
//                 {newArrivals.map((product) => (
//                     <div key={product._id} className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative">
//                         <img
//                             src={product.images[0].url}
//                             alt={product.images[0].altText}
//                             className="w-full h-[500px] object-cover rounded-lg"
//                             draggable={false}
//                         />

//                         <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
//                             <Link to={`/product/${product._id}`}>
//                                 <h4 className="font-medium">{product.name}</h4>
//                                 <p className="mt-1">Rs. {product.price}</p>
//                             </Link>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default NewArrivals;
// function setLoading(arg0: boolean) {
//     throw new Error("Function not implemented.");
// }


// import { FC, useEffect, useRef, useState } from "react";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import axios from "axios";

// interface ProductImage {
//   url: string;
//   altText: string;
// }

// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   images: ProductImage[];
// }

// const NewArrivals: FC = () => {
//   const scrollRef = useRef<HTMLDivElement | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollStartLeft, setScrollStartLeft] = useState(0);
//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(true);
//   const [newArrivals, setNewArrivals] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch new arrivals from backend
//   useEffect(() => {
//     const fetchNewArrivals = async () => {
//       try {
//         setLoading(true);

//         const response = await axios.get<Product[]>(
//           `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
//         );

//         console.log("NEW ARRIVALS API RESPONSE 👉", response.data);

//         // Filter out products with no images
//         const validProducts = response.data
//           .map((product) => ({
//             ...product,
//             images: product.images?.filter(
//               (img) => img.url && img.url.trim() !== ""
//             ) || [],
//           }))
//           .filter((product) => product.images.length > 0);

//         setNewArrivals(validProducts);
//       } catch (error) {
//         console.error("Failed to fetch new arrivals:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNewArrivals();
//   }, []);

//   // Mouse drag handlers
//   const handleMouseDown = (e: React.MouseEvent) => {
//     if (!scrollRef.current) return;
//     setIsDragging(true);
//     setStartX(e.pageX - scrollRef.current.offsetLeft);
//     setScrollStartLeft(scrollRef.current.scrollLeft);
//   };

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!isDragging || !scrollRef.current) return;
//     const x = e.pageX - scrollRef.current.offsetLeft;
//     const walk = x - startX;
//     scrollRef.current.scrollLeft = scrollStartLeft - walk;
//   };

//   const handleMouseUpOrLeave = () => {
//     setIsDragging(false);
//   };

//   // Scroll buttons
//   const scroll = (direction: "left" | "right") => {
//     if (!scrollRef.current) return;
//     const scrollAmount = direction === "left" ? -300 : 300;
//     scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
//   };

//   // Update scroll button states
//   const updateScrollButtons = () => {
//     const container = scrollRef.current;
//     if (!container) return;
//     const left = container.scrollLeft;
//     const maxScroll = container.scrollWidth - container.clientWidth;
//     setCanScrollLeft(left > 0);
//     setCanScrollRight(left < maxScroll);
//   };

//   useEffect(() => {
//     const container = scrollRef.current;
//     if (!container) return;

//     container.addEventListener("scroll", updateScrollButtons);
//     updateScrollButtons();

//     return () => {
//       container.removeEventListener("scroll", updateScrollButtons);
//     };
//   }, []);

//   // Loading or empty state
//   if (loading) {
//     return <p className="text-center py-16">Loading new arrivals...</p>;
//   }

//   if (!newArrivals.length) {
//     return <p className="text-center py-16">No products found.</p>;
//   }

//   return (
//     <section className="py-16 px-4 lg:px-0">
//       <div className="container mx-auto text-center mb-10 relative">
//         <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
//         <p className="text-lg text-gray-600 mb-8">
//           Discover the latest styles straight off the runway, freshly added to
//           keep your wardrobe on the cutting edge of fashion.
//         </p>

//         {/* Scroll Buttons */}
//         <div className="absolute right-0 bottom-[-30px] flex space-x-2">
//           <button
//             onClick={() => scroll("left")}
//             disabled={!canScrollLeft}
//             className={`p-2 rounded border ${
//               canScrollLeft
//                 ? "bg-white text-black"
//                 : "bg-gray-200 text-gray-400 cursor-not-allowed"
//             }`}
//           >
//             <FiChevronLeft className="text-2xl" />
//           </button>

//           <button
//             onClick={() => scroll("right")}
//             disabled={!canScrollRight}
//             className={`p-2 rounded border ${
//               canScrollRight
//                 ? "bg-white text-black"
//                 : "bg-gray-200 text-gray-400 cursor-not-allowed"
//             }`}
//           >
//             <FiChevronRight className="text-2xl" />
//           </button>
//         </div>
//       </div>

//       {/* Scrollable Slider */}
//       <div
//         ref={scrollRef}
//         className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${
//           isDragging ? "cursor-grabbing" : "cursor-grab"
//         }`}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUpOrLeave}
//         onMouseLeave={handleMouseUpOrLeave}
//       >
//         {newArrivals.map((product) => (
//           <div
//             key={product._id}
//             className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
//           >
//             <img
//               src={product.images[0]?.url || ""}
//               alt={product.images[0]?.altText || product.name}
//               className="w-full h-[500px] object-cover rounded-lg"
//               draggable={false}
//             />

//             <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
//               <Link to={`/product/${product._id}`}>
//                 <h4 className="font-medium">{product.name}</h4>
//                 <p className="mt-1">Rs. {product.price}</p>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default NewArrivals;

// 

import { FC, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

interface ProductImage {
  url: string;
  altText: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  images: ProductImage[];
}

const NewArrivals: FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStartLeft, setScrollStartLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      
      try {
        setLoading(true);

        const response = await axios.get(
          'http://localhost:9000/api/products/new-arrivals'   
        );

        console.log("NEW ARRIVALS API RESPONSE 👉", response.data);

        // handle both array and object with products key
        const products: Product[] = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data.products)
          ? response.data.products
          : [];

        const validProducts = products
          .map((p) => ({
            ...p,
            images: p.images?.filter((img) => img.url && img.url.trim() !== "") || [],
          }))
          .filter((p) => p.images.length > 0);

        setNewArrivals(validProducts);
      } catch (error) {
        console.error("Failed to fetch new arrivals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  // MOUSE DRAG
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollStartLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollStartLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // SCROLL BUTTON
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const left = scrollRef.current.scrollLeft;
    const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    setCanScrollLeft(left > 0);
    setCanScrollRight(left < maxScroll);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons();

    return () => container.removeEventListener("scroll", updateScrollButtons);
  }, []);

  if (loading) return <p className="text-center py-10">Loading new arrivals...</p>;
  if (newArrivals.length === 0) return <p className="text-center py-10">No new arrivals found.</p>;

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* Scroll Buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded border ${canScrollLeft ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded border ${canScrollRight ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Scrollable Slider */}
      <div
        ref={scrollRef}
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {newArrivals.map((product) => (
          <div key={product._id} className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative">
            <img
              src={product.images[0]?.url || "/placeholder.png"}
              alt={product.images[0]?.altText || product.name}
              className="w-full h-[500px] object-cover rounded-lg"
              draggable={false}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`/product/${product._id}`}>
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">Rs. {product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
