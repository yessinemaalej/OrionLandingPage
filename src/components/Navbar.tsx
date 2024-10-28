
import Image from "next/image";
import Logo from "@/assets/images/Orion_alt_STK.png";
import MenuIcon from "@/assets/icons/menu.svg"
const Navbar = () => {
  return (
    <div className="bg-black">
    <div className="container ">
        <div className="py-7 flex items-center justify-between">
            <Image src={Logo} alt="logo" className="h-20 w-20 relative"/>
            <div className="border border-white border-opacity-30 h-10 w-10 inline-flex justify-center items-center rounded-lg mr-3 sm:hidden">
                <MenuIcon className="text-white" />
            </div>
            <nav className="gap-6 items-center hidden sm:flex">
                <a href="#" className="text-opacity-60 text-white hover:text-opacity-100 transition">Home</a>
                <a href="#" className="text-opacity-60 text-white hover:text-opacity-100 transition">About Us</a>
                <a href="#" className="text-opacity-60 text-white hover:text-opacity-100 transition">Orion</a>
                <a href="/roadmap" className="text-opacity-60 text-white hover:text-opacity-100 transition">Roadmap</a>
                <a href="/faqs" className="text-opacity-60 text-white hover:text-opacity-100 transition">FAQs</a>
            </nav>
            <div>
            {/* <button className="bg-purple py-2 px-4 rounded-lg">Join Now</button> */}
            </div>
        </div>
    </div>
    </div>
  )
}

export default Navbar