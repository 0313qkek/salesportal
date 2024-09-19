import React from 'react'
import { CiHome } from "react-icons/ci";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuBox } from "react-icons/lu";
import { IoPeopleOutline } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import { GrResources } from "react-icons/gr";
import { CiMemoPad } from "react-icons/ci";
import { IoIosGitCompare } from "react-icons/io";
import { FaRegMessage } from "react-icons/fa6";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { TbScript } from "react-icons/tb";
import { MdAlternateEmail } from "react-icons/md";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <CiHome />,
        cName: 'nav-text'
    },
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <MdOutlineSpaceDashboard />,
        cName: 'nav-text'
    },
    {
        title: 'Products',
        path: '/products',
        icon: <LuBox />,
        cName: 'nav-text'
    },
    {
        title: 'Customer',
        path: '/customer',
        icon: <IoPeopleOutline />,
        cName: 'nav-text'
    },
    {
        title: 'Order',
        path: '/order',
        icon: <LuShoppingBag />,
        cName: 'nav-text'
    },
    {
        title: 'Resource Hub',
        path: '/resourcehub',
        icon: <GrResources />,
        cName: 'nav-text'
    },
    {
        title: 'Sales Training',
        path: '/salestraining',
        icon: <CiMemoPad />,
        cName: 'nav-text'
    },
    {
        title: 'Competitor Analysis',
        path: '/competitor analysis',
        icon: <IoIosGitCompare />,
        cName: 'nav-text'
    },
    {
        title: 'Messages',
        path: '/messages',
        icon: <FaRegMessage />,
        cName: 'nav-text'
    },
    {
        title: 'Shared Files',
        path: '/sharedfiles',
        icon: <FaRegShareFromSquare />,
        cName: 'nav-text'
    },
    {
        title: 'Sales Script Library',
        path: '/salesscript',
        icon: <TbScript />,
        cName: 'nav-text'
    },{
        title: 'MailWizz',
        path: '/mailwizz',
        icon: <MdAlternateEmail />,
        cName: 'nav-text'
    },
]