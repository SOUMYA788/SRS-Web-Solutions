import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { BiSolidSun, BiSolidMoon } from 'react-icons/bi';


const ThemeSwitch = () => {
    const [mounted, setMounted] = useState(false);

    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, [])

    const switchTheme = (e) => {
        e.preventDefault();
        setTheme(theme === "dark" ? "light" : "dark")
    }

    if (!mounted) return null;

    return (
        <div>
            <button type="button" onClick={switchTheme} className="w-10 h-10 mx-auto p-[0.6rem] bg-slate-800 text-slate-400 dark:bg-slate-600 dark:text-yellow-400 dark:focus:border-slate-400 flex justify-center items-center rounded-md cursor-pointe outline-none border-2 border-transparent focus:text-slate-100 transition-colors">
                {theme === "dark" ? <BiSolidSun className="w-full h-full outline-none border-none" /> : <BiSolidMoon className="w-full h-full outline-none border-none" />}
            </button >
        </div >
    )
}

export default ThemeSwitch