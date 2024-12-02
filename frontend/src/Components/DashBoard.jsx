import React, { useEffect, useState } from 'react';
import Users from './Users';
import Axios from '../atoms/axios';
import { useRecoilValue } from 'recoil';
import CurrentUser from '../atoms/CurrentUser';

const DashBoard = () => {
  const axiosInstance = useRecoilValue(Axios);
  const [searches, setSearches] = useState(""); 
  const [users, setUsers] = useState([]);
  const currentUser = useRecoilValue(CurrentUser);
  
  
  const getSearches = async () => {
    try {
      const res = await axiosInstance.get(`/users/get-users?filter=${searches}`);
      // Filter out the current user based on `_id`
      
      const filteredUsers = res.data.filter(user => user._id !== currentUser.id);
      setUsers(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearches();
  }, [searches]);

  return (
    <div className='w-[100vw] h-[100vh] bg-[#7F7F7F] flex flex-col'>
      <div className='w-full flex justify-between bg-white h-20 items-center px-10'>
        <h1 className='text-2xl font-semibold'>Payments App</h1>
        <div className='flex gap-6 h-10 items-center'>
          <p className='text-xl'>Hello, {currentUser.firstName}</p>
          <div className='bg-[#7F7F7F] rounded-full h-12 w-12 flex justify-center items-center text-2xl text-white'>
            <p>{currentUser.firstName[0]}</p>
          </div>
        </div>
      </div>

      <div className='w-full h-20 flex items-center px-10 text-4xl pt-10 bg-white'>
        Your Balance ${currentUser.balance}
      </div>

      <div className='h-[calc(100%-160px)] bg-white flex flex-col'>
        <h1 className='px-10 pt-10 text-2xl'>Users</h1>
        <div className='w-full flex justify-center h-16 mt-10'>
          <input 
            onChange={(e) => setSearches(e.target.value)} 
            value={searches} 
            className='w-[90%] border border-black h-full rounded-lg outline-none text-xl px-5 text-black' 
            placeholder='Search Users.....' 
            type="text" 
          />
          {searches.length > 0 && (
            <button onClick={() => setSearches("")} className="absolute top-[29.5%] right-28 text-zinc-400 text-3xl ri-close-fill">X</button>
          )}
        </div>

        <div className='h-full overflow-y-auto overflow-x-hidden mt-5 px-24 flex flex-col gap-3'>
          {users.map((user) => (
            <Users key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
