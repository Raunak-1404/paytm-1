import { atom } from "recoil";

const SelectedUser = atom({
    key:'SelectedUser',
    default:{
        firstName: "",
        lastname: "",
        balance: 0,
        id: ""
    }
})

export default SelectedUser;