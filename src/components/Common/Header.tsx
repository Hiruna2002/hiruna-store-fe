import Topbar from "../Layout/Topbar";
import Navbar from "./Navbar";

const Header: React.FC = () => {
    return(
        <header>
            <Topbar />
            <Navbar />
        </header>
    ) 
};

export default Header;