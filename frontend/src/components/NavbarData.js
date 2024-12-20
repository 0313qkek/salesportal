import {
    FaHome,
    FaTachometerAlt,
    FaBoxOpen,
    FaUserAlt,
    FaShoppingBag,
    FaBook,
    FaChalkboardTeacher,
    FaChartLine,
    FaEnvelope,
    FaShareAlt,
    FaClipboard,
    FaCog,
    FaSignOutAlt,
    FaEnvelopeOpenText,
} from 'react-icons/fa';

export const NavbarData = [
    {
        title: 'Home',
        path: '/',
        icon: <FaHome />,
        cName: 'nav-text',
    },
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <FaTachometerAlt />,
        cName: 'nav-text',
    },
    {
        title: 'Products',
        path: '/products',
        icon: <FaBoxOpen />,
        cName: 'nav-text',
    },
    {
        title: 'Customer',
        path: '/customer',
        icon: <FaUserAlt />,
        cName: 'nav-text',
    },
    {
        title: 'Order',
        path: '/order',
        icon: <FaShoppingBag />,
        cName: 'nav-text',
    },
    {
        title: 'Resource Hub',
        path: '/resourcehub',
        icon: <FaBook />,
        cName: 'nav-text',
    },
    {
        title: 'Sales Training',
        path: '/salestraining',
        icon: <FaChalkboardTeacher />,
        cName: 'nav-text',
    },
    {
        title: 'Competitor Analysis',
        path: '/competitor',
        icon: <FaChartLine />,
        cName: 'nav-text',
    },
    {
        title: 'Messages',
        path: '/messages',
        icon: <FaEnvelope />,
        cName: 'nav-text',
    },
    {
        title: 'Shared Files',
        path: '/sharedfiles',
        icon: <FaShareAlt />,
        cName: 'nav-text',
    },
    {
        title: 'Sales Script Library',
        path: '/salesscriptlibrary',
        icon: <FaClipboard />,
        cName: 'nav-text',
    },
    {
        title: 'MailWizz',
        path: '/mailwizz',
        icon: <FaEnvelopeOpenText />,
        cName: 'nav-text',
    },
    {
        title: 'Settings',
        path: '/settings',
        icon: <FaCog />,
        cName: 'nav-text',
    },
    {
        title: 'Log out',
        path: '/logout',
        icon: <FaSignOutAlt />,
        cName: 'nav-text',
    },
];