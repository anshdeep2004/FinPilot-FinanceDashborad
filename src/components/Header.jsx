import React from "react";
import { Search, Moon, Sun } from 'lucide-react'
import { useState } from "react"
import photo from '../assets/ansh_photo_passport_size.jpg'

const Header = () => {
    const [active, setActive] = useState("Dashboard");
    const tabs = ["Dashboard", "Transaction", "Insights", "Settings"];

    return (
        <header className="bg-white text-black px-6 py-3 flex flex-col m-0">
            <div className="flex border-b border-gray-300 pb-4">
                <div className="flex gap-16">
                    <div className="flex gap-5">
                        <img src={''} alt="Logo" className="h-8 w-8 mr-2" />
                        <h1 className="text-2xl font-bold">FinPilot</h1>
                    </div>
                    <div className="flex items-center gap-1 m-0 border border-gray-300 rounded-l-xl rounded-r-xl px-2 w-96 py-0 h-10">
                        <Search className="text-black my-1" />
                        <input type="text" placeholder="Search..." className="outline-none my-1 mx-1 rounded-full w-full" />
                    </div>
                </div>
                <div className="flex items-center gap-5 ml-auto">
                    <div className="border border-gray-300 rounded-full p-2 w-8 h-8 flex items-center justify-center">
                        <Moon className="text-gray-500 cursor-pointer" />
                        {/* <Sun className="text-gray-500 cursor-pointer" /> */}
                    </div>
                    <div className="flex items-center gap-3">
                        <img src={photo} alt="Profile" className="h-9 w-9 rounded-lg" />
                        <div className="flex flex-col text">
                            <span className="text-sm font-medium">Anshdeep Singh</span>
                            <span className="text-xs text-gray-500">anshdeep@gmail.com</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex py-5 items-center justify-between">
                <h1 className="text-black font-bold text-3xl p">Good morning, Anshdeep</h1>
                <div className="flex items-center gap-3 border-b border-gray-300">
                    {tabs.map((tab) => (
                        <div key={tab} onClick={() => setActive(tab)}
                        className="relative group cursor-pointer px-5 pb-3 text-gray-600 font-medium hover:text-green-600 hover:font-medium transition-colors duration-300">
                            <span className={`${active === tab ? "text-green-600 font-medium" : ""}`}>{tab}</span>
                            <span className={`absolute left-0 bottom-0 h-0.75 bg-green-600 rounded-full transition-all duration-300
                                ${active === tab ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                        </div>
                    ))}
                </div>
            </div>
        </header>
    )
}
export default Header;