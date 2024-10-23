'use client';

import Button from '@/app/components/navs/Button';
import React, { useState, useEffect } from 'react';
// import Switch from "react-switch";
import { useTheme } from '../../context/ThemeContext';
import { Switch } from "@/components/ui/switch"


export default function ToggleTheme() {

    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <label className="flex">
                {/* <Switch checked={theme === 'light'} uncheckedIcon={false} checkedIcon={false} activeBoxShadow={null} offColor="#faf9f7" onColor="#3d3d3d" offHandleColor="#3d3d3d" width={40} height={20} onHandleColor="#faf9f7" onChange={toggleTheme} /> */}
                <Switch
                    checked={theme === 'light'}
                    onCheckedChange={toggleTheme}
                />
            </label>
        </>
    );
}
