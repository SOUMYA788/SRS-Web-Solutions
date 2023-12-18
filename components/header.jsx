import Image from 'next/image';
import Link from 'next/link'
import HeaderUserCorner from '@/components/HeaderUserCorner';
import NavLink from './NavLink';

const Header = () => {
    return (
        <header className="w-full bg-[rgba(255,255,255,0.6)] text-gray-700 text-sm flex flex-col md:flex-row md:gap-10 items-center p-3 body-font sticky top-0 left-0 z-20 backdrop-blur-sm shadow-md">

            <Link href="/" className="flex text-center items-center text-gray-900 font-bold mb-4 md:mb-0">
                <Image src="/images/logo.png" alt="logo" width={50} height={50} className="w-11 h-11 object-contain" />
            </Link>

            <nav className=" flex flex-1 flex-wrap items-center justify-center gap-5">

                <NavLink navRef="/" navLinkClass="capitalize cursor-pointer font-semibold hover:text-black border-slate-500 px-2 py-1" activeNavClass="border-b-2">
                    home
                </NavLink>

                <NavLink navRef="/about" navLinkClass="capitalize cursor-pointer font-semibold hover:text-black border-slate-500 px-2 py-1" activeNavClass="border-b-2">
                    about
                </NavLink>

                <NavLink navRef="/contact" navLinkClass="capitalize cursor-pointer font-semibold hover:text-black border-slate-500 px-2 py-1" activeNavClass="border-b-2">
                    contact
                </NavLink>

                <div className="mx-auto md:ml-auto md:mr-0">
                    <HeaderUserCorner />
                </div>
                    
            </nav>
        </header>
    )
}

export default Header