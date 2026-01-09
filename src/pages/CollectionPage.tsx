// import { useEffect, useRef, useState } from "react"
// import {FaFilter} from "react-icons/fa"
// import FilterSidebar from "../components/Products/FilterSidebar"
// import SortOptions from "../components/Products/SortOptions"
// import ProductGrid from "../components/Products/ProductGrid"

// const CollectionPage = () => {
//     const [products, setProducts] = useState ([])
//     const sidebarRef = useRef(null);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false)

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     }

//     const handleClickOutside = (e) => {
//         // close sidebar if clicked outside
//         if(sidebarRef.current && !sidebarRef.current.contains(e.target)) {
//             setIsSidebarOpen(false)
//         }
//     }

//     useEffect(() => {
//         // add event listner for clicks
//         document.addEventListener("mousedown",handleClickOutside);

//         // clean event listner
//         return () => {
//             document.removeEventListener("mousedown",handleClickOutside)
//         };
//     }, []);

//     useEffect(() => {
//         setTimeout(() => {
//             const fetchedProducts = [
//                 {
//                     _id: "1",
//                     name: "Product 1",
//                     price: 1500,
//                     images: [{url: "https://picsum.photos/500/500?random=1"}]
//                 },
//                 {
//                     _id: "2",
//                     name: "Product 2",
//                     price: 2000,
//                     images: [{url: "https://picsum.photos/500/500?random=2"}]
//                 },
//                 {
//                     _id: "3",
//                     name: "Product 3",
//                     price: 1200,
//                     images: [{url: "https://picsum.photos/500/500?random=3"}]
//                 },
//                 {
//                     _id: "4",
//                     name: "Product 4",
//                     price: 2300,
//                     images: [{url: "https://picsum.photos/500/500?random=4"}]
//                 },
//                 {
//                     _id: "5",
//                     name: "Product 5",
//                     price: 1500,
//                     images: [{url: "https://picsum.photos/500/500?random=5"}]
//                 },
//                 {
//                     _id: "6",
//                     name: "Product 6",
//                     price: 2000,
//                     images: [{url: "https://picsum.photos/500/500?random=6"}]
//                 },
//                 {
//                     _id: "7",
//                     name: "Product 7",
//                     price: 1200,
//                     images: [{url: "https://picsum.photos/500/500?random=7"}]
//                 },
//                 {
//                     _id: "8",
//                     name: "Product 8",
//                     price: 2300,
//                     images: [{url: "https://picsum.photos/500/500?random=8"}]
//                 },
//             ];
//             setProducts(fetchedProducts);
//         },1000)
//     }, [])
//   return (
//     <div className="flex flex-col lg:flex-col">
//         {/* Mobile Filter Button */}
//         <button onClick={toggleSidebar} className="lg:hidden border p-2 flex justify-center items-center">
//             <FaFilter className="mr-2" />
//         </button>

//         {/* Filter Sidebar */}
//         <div 
//             ref={sidebarRef}
//             className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50
//             left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static 
//             lg:translate-x-0`}    
//         >
//             <FilterSidebar />
//         </div>
//         <div className="flex-grow p-4">
//             <h2 className="text-2xl uppercase mb-4">All Colection</h2>

//             {/* sort Option */}
//             <SortOptions />

//             {/* Product Grid */}

//             <ProductGrid products={products} />
//         </div>
//     </div>
//   )
// }

// export default CollectionPage





import { FC, use, useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";
import { useAppSelector } from '../hooks';
import { useAppDispatch } from '../hooks';


interface ProductImage {
  url: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  images: ProductImage[];
}


const CollectionPage:FC = () => {
  const {Collection} = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const {loading, error} = useAppSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);
  const [products, setProducts] = useState<Product[]>([]);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({collection: Collection, ...queryParams}));
  }, [dispatch, Collection, searchParams])

  const toggleSidebar = (): void => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleClickOutside = (e: MouseEvent): void => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target as Node)
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" />
        Filters
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white overflow-y-auto
        transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>

        {/* Sort Options */}
        <SortOptions />

        {/* Product Grid */}
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
