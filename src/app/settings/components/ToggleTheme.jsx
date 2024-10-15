'use client';

import Button from '@/app/components/navs/Button';
import React, { useState, useEffect } from 'react';
import Switch from "react-switch";
import { useTheme } from '../../context/ThemeContext';

export default function ToggleTheme() {

    const { theme, toggleTheme } = useTheme();

    return (
        <>
            {/* <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" onChange={toggleTheme} />
                <div className="relative w-11 h-6 bg-offwhite peer-focus:outline-none rounded-full peer dark:bg-lightgray peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-darkgray"></div>
            </label> */}
            <label className="flex">
                <Switch checked={theme === 'light'} uncheckedIcon={false} checkedIcon={false} activeBoxShadow={null} offColor="#faf9f7" onColor="#3d3d3d" offHandleColor="#3d3d3d" width={40} height={20} onHandleColor="#faf9f7" onChange={toggleTheme} />
            </label>
        </>
    );
}
