import {
    UilChat,
    UilUsersAlt,
    UilEstate, UilObjectGroup, UilAnalytics, UilTable, UilWhatsapp,

} from "@iconscout/react-unicons";
export const SidebarData = [

    {
        icon:UilTable,
        heading: 'Seller',
        link:'/adminDashboard/Seller'

    },
    {
        icon:UilTable,
        heading: 'Buyer',
        link:'/adminDashboard/Buyer'

    },
    {
        icon: UilAnalytics,
        heading:'Pending Orders',
        link:'/adminDashboard/All_orders'
    },
    {
        icon: UilAnalytics,
        heading:'Completed Orders',
        link:'/adminDashboard/Completed_Order'
    }

]
