import { atom } from "recoil";

const CurrentUser = atom({
    key:'CurrentUser',
    default:{
        firstName: "",
        lastname: "",
        balance: 0,
        id: ""
    }
})

export default CurrentUser;