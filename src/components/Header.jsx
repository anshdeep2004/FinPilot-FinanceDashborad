import React, { useState, useEffect } from "react";
import { Search, Moon, Sun, Menu, X } from 'lucide-react'
import photo from '../assets/ansh_photo_passport_size.jpg'
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png'

const Header = ({ theme, setTheme }) => {

    const [open, setOpen] = useState(false);
    const [role, setRole] = useState("admin");

    const [openMobileMenu, setOpenMobileMenu] = useState(false);

    useEffect(() => {
        const savedRole = localStorage.getItem("role");
        if (savedRole) setRole(savedRole);
    }, []);

    const changeRole = (newRole) => {
        setRole(newRole);
        localStorage.setItem("role", newRole);
        setOpen(false);
        window.location.reload(); // simple refresh
    };

    const tabs = [
        {name : "Dashboard", path : "/"},
        {name : "Transaction", path : "/transaction"},
        {name : "Insights", path : "/insights"},
        {name : "Settings", path : "/settings"},
    ];

    return (
        <header className="bg-white dark:bg-gray-950 text-black dark:text-gray-100 px-6 pt-3 flex flex-col m-0">
            <div className="flex border-b border-gray-300 dark:border-b dark:border-gray-700 pb-4">
                <div className="flex gap-16">
                    <div className="flex gap-5">
                        <img src={logo} alt="Logo" className="h-8 w-8 mr-2 mt-1" />
                        <h1 className="text-2xl font-bold">FinPilot</h1>
                    </div>
                    <div className="hidden min-[1000px]:flex items-center gap-1 m-0 border border-gray-300 dark:border dark:border-gray-700 rounded-l-xl rounded-r-xl px-2 w-96 py-0 h-10">
                        <Search className="text-black dark:text-white my-1" />
                        <input type="text" placeholder="Search..." className="outline-none py-1 px-1 rounded-full w-full" />
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-5 ml-auto relative">

                    <div onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
                    className={`${theme === "dark" ? "bg-black" : "bg-white"} border border-gray-300 rounded-full p-2 w-8 h-8 flex items-center justify-center`}>
                        {theme === "dark" ? (
                            <Sun className="text-white bg-black cursor-pointer" />
                        ) : (
                            <Moon className="text-gray-500 cursor-pointer" />
                        )}
                    </div>

                    {/* PROFILE BUTTON */}
                    <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => setOpen(!open)}
                    >
                        <img src={photo} alt="Profile" className="h-9 w-9 rounded-lg" />
                        <div className="flex flex-col">
                            <span className="hidden min-[550px]:block text-sm font-medium">Anshdeep Singh</span>
                            <span className="hidden min-[550px]:block text-xs text-gray-500 dark:text-gray-400">{role}</span>
                        </div>
                    </div>

                    {/* DROPDOWN */}
                    {open && (
                        <div className="absolute right-0 top-12 bg-white border border-gray-300 dark:border dark:border-gray-700 dark:bg-[#121614] rounded-xl shadow-lg p-4 w-56 z-50">

                            {/* Profile Info */}
                            <div className="flex flex-col items-center mb-3">
                                <img src={photo} className="h-14 w-14 rounded-full mb-2 dark:border dark:border-gray-700" />
                                <p className="text-sm font-medium">Anshdeep Singh</p>
                                <p className="text-xs text-gray-500">anshdeep@gmail.com</p>
                            </div>

                            {/* Role Buttons */}
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => changeRole("user")}
                                    className={`border px-3 py-1 dark:border dark:border-gray-700 rounded-lg text-sm ${
                                        role === "user" ? "bg-green-700 text-white" : "bg-green-600 text-white"
                                    }`}
                                >
                                    User
                                </button>

                                <button
                                    onClick={() => changeRole("admin")}
                                    className={`border dark:border dark:border-gray-700 px-3 py-1 rounded-lg text-sm ${
                                        role === "admin" ? "bg-green-700 text-white" : "bg-green-600 text-white"
                                    }`}
                                >
                                    Admin
                                </button>
                            </div>

                        </div>
                    )}
                </div>
            </div>

            {/* NAVBAR SAME */}
            <div className="flex py-5 items-center justify-between">
                <h1 className="text-black font-bold text-2xl dark:text-gray-100">
                    Good morning, Anshdeep
                </h1>

                {/* DESKTOP NAV */}
                <div className="hidden min-[1000px]:flex items-center gap-3 border-b border-gray-300 dark:border-gray-700">
                    {tabs.map((tab) => (
                    <NavLink key={tab.name} to={tab.path}
                        className={({ isActive }) =>
                        `relative group cursor-pointer px-5 pb-3 text-gray-600 dark:text-gray-200 font-medium transition-colors duration-300 
                        ${isActive ? "text-green-600 dark:text-green-500" : "hover:text-green-600 hover:dark:text-green-500"}`
                        }
                    >
                        {({ isActive }) => (
                        <div>
                            <span>{tab.name}</span>
                            <span
                            className={`absolute left-0 bottom-0 h-[2.5px] bg-green-600 rounded-full transition-all duration-300
                            ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                            ></span>
                        </div>
                        )}
                    </NavLink>
                    ))}
                </div>

                {/* MOBILE BURGER */}
                <div className="min-[1000px]:hidden">
                    <button onClick={() => setOpenMobileMenu(!openMobileMenu)}>
                    {openMobileMenu ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>
            {openMobileMenu && (
                <div className="min-[1000px]:hidden bg-white dark:bg-gray-950 border-t border-gray-300 dark:border-gray-700 px-6 py-4 flex flex-col gap-4">

                    {tabs.map((tab) => (
                    <NavLink
                        key={tab.name}
                        to={tab.path}
                        onClick={() => setOpenMobileMenu(false)}
                        className={({ isActive }) =>
                        `text-gray-700 dark:text-gray-200 font-medium py-2 px-2 rounded-lg transition 
                        ${isActive ? "bg-green-100 dark:bg-green-900 text-green-600" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`
                        }
                    >
                        {tab.name}
                    </NavLink>
                    ))}

                </div>
            )}
        </header>
    )
}
export default Header;