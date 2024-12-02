import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import SelectedUser from '../atoms/SelectedUser'
import Axios from '../atoms/axios';
import CurrentUser from '../atoms/CurrentUser';

const SendMoney = () => {
  const [currentUser, setCurrentUser] = useRecoilState(CurrentUser)
  const selectedUser = useRecoilValue(SelectedUser);
  const [money,setMoney] = useState(0);
  const axiosInstance = useRecoilValue(Axios)
  const navigate = useNavigate()

  const submithandler = async() => {
      const res = await axiosInstance.post('/account/transfer', {
        to: selectedUser.id,
        from: currentUser.id,
        money
      }, {
        headers:{
          Authorization: "Bearer " + localStorage.getItem("token"),
          'Content-Type': 'application/json',
        }
      });

      if(res.status == 200) {
        alert("Amount : " + money + " is successfully transfered to " + selectedUser.firstName );
        setCurrentUser((prev) => ({
          ...prev,
          balance: prev.balance - money,
        }));
        navigate('/dashboard');
      }
  }


  return (
    <div className='bg-[#343e3ecd] h-[100vh] w-[100vw] flex justify-center items-center text-white'>
        <div className='w-[50%] h-[60%] bg-[#2f2d2db1] flex flex-col items-center rounded-3xl  gap-10'>
          <h1 className='text-white pt-10 text-4xl font-semibold'>Send Money</h1>

          <div className='flex flex-col pt-10' >
            <div className='flex gap-5 items-center '>
              <div className="circle w-14 h-14 rounded-full bg-white text-black flex justify-center items-center text-xl mb-3">{selectedUser.firstName[0].toUpperCase()}</div>
              <h2 className='text-4xl'>{selectedUser.firstName}</h2>
            </div>
            <h3>Amount (in Rs)</h3>

            <input onChange={(e)=>{setMoney(e.target.value)}} className='outline-none py-3 px-3 mt-3 text-black text-2xl' placeholder='Enter Amount ....'  type="number" name="money" id="money" />
            <button onClick={submithandler} className='outline-none py-2 font-semibold rounded-xl px-3 mt-7 bg-white text-black text-xl' name='submit'> Initiate Transfer </button>
          </div>
        </div>
    </div>
  )
}

export default SendMoney