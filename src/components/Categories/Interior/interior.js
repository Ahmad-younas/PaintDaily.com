import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { Star } from '../../../userDashboard/component/Stars/Star';

import Navbar from '../../navbar/Navbar';
import Footer from '../../footer/Footer';
import Style from './interior.module.css';


import interiorslider from "../../../../src/assets/Images/interiorslider.jpg";



const Interior = () => {
    const [data, Setdata] = useState([]);
    const [query, setQuery] = useState("");
    console.log(query);
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
    console.log("data", data);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);


    // Filter Data
    const InteriorPaint = data.filter(dta=>{
        return (dta.selectCategory === "Interior Paint");
      });


    //   Records Per Page
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 12;
    const lastindex = currentPage*recordsPerPage;
    const firstIndex = lastindex-recordsPerPage;
    const records = InteriorPaint.slice(firstIndex,lastindex);


    // Pagination
    const npage = Math.ceil(InteriorPaint.length/recordsPerPage)
    const numbers= [...Array(2+1).keys()].slice(1);
    console.log(numbers);




return (
        <main>

            <Navbar/>

            <img className={Style.pimage} src={interiorslider}/>





            <div className={Style.search}>

                <input type="text" className={Style.searchTerm} placeholder="Search 'white interior paint'"  onChange={(e)=>{setQuery(e.target.value)}}/>


                    <button type="submit" className={Style.searchButton}>
                    <i className="fa fa-search"></i>
                    </button>

            </div> 




            <h2 className={Style.pheading}>Interior Paints</h2>


        <div className={Style.product_side}>
            <div className={ `row`}>
           
            {records.filter((user)=>user.productTitle.toLowerCase().includes(query)).map((dta,index)=>(
           
           
           <div className={Style.prod} >

                        <div  key={index} style={{width:"80%"}}>

                        <span className={Style.code_color}>Code: {dta.productColorName}</span>


                        <div style={{width: '20px'}} className={Style.image_box}>
                            <img src={dta.productColorImage}/>
                        </div>


                        <div className={Style.prod_title}>
                        <Link style={{ textDecoration: "none"}} to={`/productPage/${dta.id}`}>
                            <p style={{color:"Black"}}>{dta.productTitle}</p>
                        </Link>
                        </div>



                        <div className={Style.desc_box}>
                        <span style={{ color: '#6e6d6a', fontSize: '18px', paddingLeft: '22px'}}>{dta.productWeight}</span>
                      </div>


                        <div>

                          <div className={Style.bottom_line}>
                            
                             <Star stars={dta.totalRating}/>

                             <p className={Style.product_price}>Rs {dta.price}</p>


                          </div>

                        </div>




                    </div>
                    
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
};

export default Interior;