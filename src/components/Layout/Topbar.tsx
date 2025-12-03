import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const Topbar: React.FC = () => {
  return (
    <div className="bg-store-red text-white">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        
        {/* Social Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-gray-300">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <RiTwitterXLine className="h-5 w-5" />
          </a>
        </div>

        {/* Middle Text */}
        <div className="text-sm text-center flex-grow">
          <span>We ship Islandwide - Fast and reliable shipping!</span>
        </div>

        {/* Phone Number */}
        <div className="text-sm hidden md:block">
          <a href="tel:+94742721724" className="hover:text-gray-300">
            (+94) 74 272 1724
          </a>
        </div>

      </div>
    </div>
  );
};

export default Topbar;