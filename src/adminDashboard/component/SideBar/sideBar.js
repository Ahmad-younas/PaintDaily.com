import React from 'react';
import {useState} from "react";
import Styled from './sidebar.module.css';
import {SidebarData} from "../../utils";
import {UilSignOutAlt, UilWhatsapp} from "@iconscout/react-unicons";
import {Link,Outlet} from "react-router-dom";

import img from '../../assets/img.png';

const SideBar = () => {
    const [selected, setSelected] = useState(0);
    return (
        <div className={Styled.Sidebar}>
            {/*{logo}*/}
            <div className={Styled.logo}>
                <Link to={"/adminDashboard/categories"}><img  className={Styled.Img} src={img}  alt={"PaintDaily"}/></Link>
            </div>
            {/* menu */}
            <div className={Styled.menu}>
                {SidebarData.map((item,index)=>{
                    return(
                        <Link style={{textDecoration:"none", color:"white"}} className={Styled.itemLinks} to={item.link}>
                        <div className={selected===index?`${Styled.menuItem} ${Styled.active}`:`${Styled.menuItem}`} key={index} 
                        
                        onClick={()=>setSelected(index)}
                        >
                            <div className={selected===index?`${Styled.selected}`:`${Styled.unSelected}`}>
                              <item.icon/>
                            </div>
                            
                            <span style={{fontSize:"18px"}} className={selected===index?`${Styled.selectedText}`:null}>{item.heading}</span>
                        </div>
                        </Link>
                    )
                })}
                 <div className={Styled.menuItem}>
                    <a style={{textDecoration:"none", color:"white"}} className={Styled.WhatsApp} href={"https://wa.me/923167906557"} target={"_blank"}><UilWhatsapp/>
                        <span style={{color:'white', marginLeft:'15px'}}>WhatsApp</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SideBar;