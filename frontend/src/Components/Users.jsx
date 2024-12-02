import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil';
import SelectedUser from '../atoms/SelectedUser';

function Users({user}) {
    const navigate = useNavigate();

    const setSelectedUser = useSetRecoilState(SelectedUser)
    const submitHandler = (e) => {
        const {firstName, lastName, _id, username} = user;
        setSelectedUser({
            firstName,
            lastName,
            username,
            id: _id
        });
        
        navigate('/send');
    }

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-full ">
            <button onClick={(e,user)=>{submitHandler(user)}} className='px-5 py-2 bg-black mt-2 text-white rounded-lg'>Send Money</button>
        </div>
    </div>
}

export default Users