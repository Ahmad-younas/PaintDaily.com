import React, {useEffect} from 'react';
import Navbar from '../../navbar/Navbar';
import Footer from '../../footer/Footer';
import {roll_brush} from "../../../utils/categoryArray";
import Style from './brushesRoller.module.css';
import {Link} from 'react-router-dom'
import paintbrushes from "../../../../src/assets/Images/paintbrushes.jpg";
import axios from 'axios';
import {useState} from "react";
import { Star } from '../../../userDashboard/component/Stars/Star';
function BrushesRoller(props) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const [data, Setdata] = useState([]);
    const [query, setQuery] = useState("");
    useEffect(() => {
      axios({
        method: 'GET',
        url: 'http://localhost:9090/api/getAllproducts',
      }).then((res) => {
        // console.log(res.data);
        Setdata(res.data);
  
      }).catch((err) => {
        console.log(err);
      })
    }, []);
    const Brushes = data.filter((dta)=>{
        return (dta.selectCategory === "Brushes & Rollers");
      });
      const [currentPage, setCurrentPage] = useState(1)
      const recordsPerPage = 12;
      const lastindex = currentPage*recordsPerPage;
      const firstIndex = lastindex-recordsPerPage;
      const records = Brushes.slice(firstIndex,lastindex);
      const npage = Math.ceil(Brushes.length/recordsPerPage)
      const numbers= [...Array(npage+1).keys()].slice(1);
    return (
        <main>
            <Navbar/>
            <img className={Style.pimage} src={paintbrushes}/>

            <div className={Style.search}>
                <input type="text" className={Style.searchTerm} placeholder="Search 'white interior paint'"  onChange={(e)=>setQuery(e.target.value)}/>
                    <button type="submit" className={Style.searchButton}>
                    <i className="fa fa-search"></i>
                    </button>
            </div> 

<h2 className={Style.pheading}>Brushes and Rollers</h2>

<div className={Style.product_side}>
<div className={ `row`}>
{records.filter((user)=>user.productTitle.toLowerCase().includes(query)).map((dta,index)=>(
            // {Brushes.map((data,index)=>(
            <div className={Style.prod} >
                 <Link to={"/productPage"}>

                        <div key={index} style={{width:"80%"}}>
                        <span className={Style.code_color}>Code: {dta.productColorName}</span>

                        <div className={Style.image_box}>
                            <img className="" src={dta.productImage}/>
                        </div>
                        <div className={Style.prod_title}>
                            <p style={{color:"Black"}}>{dta.productTitle}</p>
                        </div>
                        <div className={Style.desc_box}>
                        <span style={{ color: '#6e6d6a', fontSize: '18px', paddingLeft: '22px', paddingTop: '150px'  }}>{dta.productWeight}</span>
                      </div>

                        <div className={Style.bottom_box}>

                          <div className={Style.bottom_line} style={{ color: "Black" }}>
                            
                             <Star stars={dta.totalRating}/>
                             {/* <Link to ="#" className={Style.rev}>Reviews</Link> */}
                             <p className={Style.product_price}>Rs {dta.price}</p>
                          </div>
                        </div>
                    </div>
                </Link>
            </div>
            ))}
            </div>
            </div>
            <div style={{marginLeft:"42%", marginBottom:"4%"}}>
            <nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li class="page-item">
                            <Link class="page-link" to="#" onClick={perPage}>Previous</Link>
                        </li>

                        {
                            numbers.map((n,i)=>(
                                <li class={`page-item ${currentPage === n ? 'active': ''}`} key={i}>
                                    <Link class="page-link" to="#" onClick={()=>changeCPage(n)} >{n}</Link>
                                </li>
                            ))
                                

                        }

                        <li class="page-item">
                            <Link class="page-link" to="#" onClick={nextPage}>Next</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <Footer/>
        </main>

    );
    function perPage (){

        if(currentPage !== firstIndex){
            setCurrentPage(currentPage-1)
        }
    }
    function changeCPage (id){
        setCurrentPage(id);
    }
    function nextPage (){
        if(currentPage !== firstIndex){
            setCurrentPage(currentPage+1)
        }
    }
}

export default BrushesRoller;