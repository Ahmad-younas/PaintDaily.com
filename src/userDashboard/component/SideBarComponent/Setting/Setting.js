import React, { useState } from 'react';
import ToggleButton from 'react-toggle-button'
import Styled from "./Setting.module.css"
import AdminNavbar from "../../../../adminDashboard/component/Navbar/AdminNavbar";
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import hotToast from 'react-hot-toast';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function Setting (props) {
const [seller, setSeller] = useState([]);
const [updateSetting, setUpdateSetting] = useState({});
const sellerPosts = useSelector(state => state.SellerPosts)
const address = sellerPosts.address;
const password = sellerPosts.password
const id = sellerPosts.id;
console.log(sellerPosts);
const handleChange = (event) => {
    console.log(event.target.value);
    setUpdateSetting({
          ...updateSetting,
          [event.target.name]: event.target.value

      });
  }

  const UpdateSetting = () =>{
    axios({
        method: 'PATCH',
        url: `http://localhost:9090/api/updateSellerSetting/${id}`,
        data:updateSetting
      }).then((res) => {
        console.log("Checkout",res);
        if(res.status === 200){
            toast.success('👤 Update Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            setUpdateSetting("");
            hotToast.success("Updated")
        }
      }).catch((err) => {
        console.log(err);
      })
  }

  const DeleteSeller = () =>{
    axios({
        method: 'PATCH',
        url: `http://localhost:9090/api/DeleteSellerProductByID/${id}`,
        data:updateSetting
      }).then((res) => {
        console.log("Checkout",res);
        if(res.status === 200){
            // setUpdateSetting("");
        }
      }).catch((err) => {
        console.log(err);
      })
  }
   
    return (
        <main>
            <AdminNavbar/>
             <div style={{marginTop:'50px', marginLeft:'60px', marginRight:"40px",overflowY: "scroll", height: '545px',}} className={Styled.ScrollBar} >
                 <div style={{
                     display: 'flex',
                     justifyContent: 'center',
                     marginTop: '5%',
                     marginLeft: '5%',
                     marginRight: '5%'
                 }}>
                     <h3 style={{fontSize: '4rem', fontWeight:'bold', color: 'black'}}>Settings</h3>
                 </div>
                 <form style={{marginLeft: '5%', marginRight: '4%', width: '50%'}}>

                     <h4 style={{
                         fontSize: '1.3rem',
                         fontWeight: '600',
                         color: '#285742',
                         marginTop: '4%',
                         marginBottom: '4%'
                     }}>Update Password</h4>


                     <div className="form-group">
                         <label htmlFor="exampleFormControlInput1" style={{
                             marginLeft: '-0.1%',
                             marginBottom: '2%',
                             marginTop: '2%',
                             fontWeight: '600',
                             color: '#3f403f'
                         }}>Current Password</label>
                         <input type="text" className="form-control" id="exampleFormControlInput1"
                                style={{outline: 'none', marginBottom: '0.5%'}} required={true} value={password}/>
                     </div>

                     <div className="form-group">
                         <label htmlFor="exampleFormControlInput1" style={{
                             marginLeft: '-0.1%',
                             marginBottom: '2%',
                             marginTop: '2%',
                             fontWeight: '600',
                             color: '#3f403f'
                         }}>New Password</label>
                         <input type="text" className="form-control" id="exampleFormControlInput1"
                                style={{outline: 'none', marginBottom: '0.5%'}} required={true} onChange={handleChange} name='password'/>
                     </div>

                     <h4 style={{
                         fontSize: '1.3rem',
                         fontWeight: '600',
                         color: '#285742',
                         marginTop: '6%',
                         marginBottom: '4%'
                     }}>Update Your Address</h4>

                     <div className="form-group">
                         <label htmlFor="exampleFormControlInput1" style={{
                             marginLeft: '-0.1%',
                             marginBottom: '2%',
                             marginTop: '2%',
                             fontWeight: '600',
                             color: '#3f403f'
                         }}>Current Address</label>
                         <input type="text" className="form-control" id="exampleFormControlInput1"
                                style={{outline: 'none', marginBottom: '0.5%'}} required={true} value={address}/>
                     </div>
                     <div className="form-group">
                         <label htmlFor="exampleFormControlInput1" style={{
                             marginLeft: '-0.1%',
                             marginBottom: '2%',
                             marginTop: '2%',
                             fontWeight: '600',
                             color: '#3f403f'
                         }}>New Address</label>
                         <input type="text" className="form-control" id="exampleFormControlInput1"
                                style={{outline: 'none', marginBottom: '0.5%'}} onChange={handleChange} name='address' required={true}/>
                     </div>


                     <button type="button" className="btn" onClick={UpdateSetting}  style={{
                         background: '#1d28f3',
                         color: 'white',
                         width: '18%',
                         height: '8%',
                         fontSize: '1.2rem',
                         marginTop: '3%'
                     }}>Update
                     </button>

                     <h4 style={{
                         fontSize: '1.3rem',
                         fontWeight: '600',
                         color: '#285742',
                         marginTop: '6%',
                         marginBottom: '4%'
                     }}>Delete Your Account</h4>

                     <p>Once you delete your account, there is no going back. Please be certain.</p>
                     <button type="button" className="btn" style={{
                         background: '#b82c1a',
                         color: 'white',
                         width: '18%',
                         height: '8%',
                         fontSize: '1.2rem',
                         marginBottom: '25%',
                         
                     }}>Delete
                     </button>
                 </form>
            </div>
            <footer className="sticky-footer" style={{boxShadow:  "20px 20px 60px #bebebe -20px -20px 60px #ffffff", backgroundColor:'#984fc2', padding:'12px', height:'60px'}}>
                <div className="container my-auto">
                    <div className="copyright text-center my-auto">
            <span style={{color:'white'}}>Copyright &copy; {new Date().getFullYear()} - Developed by PaintDaily
            </span>
                    </div>
                </div>
                <ToastContainer/>
            </footer>
        </main>
    );
}

export default Setting;