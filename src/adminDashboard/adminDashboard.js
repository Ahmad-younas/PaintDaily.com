import React from 'react';
import Style from './dashboard.module.css';
import SideBar from "./component/SideBar/sideBar";
import { Route, Routes } from "react-router-dom";
import ChatBoard from "./component/SideBarComponent/Chat/ChatBoard";
import Categories from "./component/SideBarComponent/Categories/categories";
import Allorders from "./component/SideBarComponent/AllOrders/Allorders";
import Seller from "../userDashboard/component/Seller/Seller";
import Buyer from "../userDashboard/component/Buyer/Buyer";
import Completed from './component/CompletedOrders/Completed';
const AdminDashboard = () => {
    return (
        <React.Fragment>
            <div className={Style.App}>
                <div className={Style.AppGlass}>
                    <SideBar />
                    <Routes>
                        <Route exact path="/categories" element={<Categories />} />
                        <Route exact path="/completed_Order" element={<Completed/>}/>
                        <Route exact path="/chat" element={<ChatBoard />} />
                        <Route exact path="/seller" element={<Seller />} />
                        <Route exact path="/buyer" element={<Buyer />} />
                        <Route exact path="/all_orders" element={<Allorders />} />
                        <Route exact path="*" element={<Categories/>} />
                    </Routes>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AdminDashboard;