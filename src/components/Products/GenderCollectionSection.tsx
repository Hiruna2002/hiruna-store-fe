import { FC } from "react";
import mensCollectionImage from "../../assets/mens-collection.webp"
import womensCollectionImage from "../../assets/womens-collection.webp"
import { Link } from "react-router-dom";

const GenderCollectionSection:FC = () => {
    return(
        <section className="py-6 px-4 lg:px-0">
             <div className="container mx-auto flex flex-col md:flex-row gap-8">
                {/* {Women's Collection} */}
                <div className="relative flex-1 ml-5">
                    <img src={womensCollectionImage} alt="Womem's collection image" 
                    className="w-full h-[700px] object-cover" />
                    <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
                        <h2 className="texy-2xl font-bold text-gray-900 mb-3">
                            Women's Collection
                        </h2>
                        <Link to="/collections/all?gender=Women" className="text-gray-900 mb-3">
                            Shop Now
                        </Link>
                    </div>
                </div>
                {/* {Mens Collection} */}
                <div className="relative flex-1 mr-5">
                    <img src={mensCollectionImage} alt="Men's collection image" 
                    className="w-full h-[700px] object-cover" />
                    <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
                        <h2 className="texy-2xl font-bold text-gray-900 mb-3">
                            Men's Collection
                        </h2>
                        <Link to="/collections/all?gender=Men" className="text-gray-900 mb-3">
                            Shop Now
                        </Link>
                    </div>
                </div>
             </div>
        </section>
    );
}

export default GenderCollectionSection