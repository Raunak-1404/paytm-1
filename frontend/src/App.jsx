import { BrowserRouter, Route , Routes} from "react-router-dom"
import SignUp from "./Components/SignUp"
import SignIn from "./Components/SignIn"
import DashBoard from "./Components/DashBoard"
import SendMoney from "./Components/SendMoney"


function App() {
    return (
        <div>
           <BrowserRouter >
              <Routes>
                <Route path="/signup" element={<SignUp />} ></Route>
                <Route path="/signin" element={<SignIn />} ></Route>
                <Route path="/dashboard" element={<DashBoard />} ></Route>
                <Route path="/send" element={<SendMoney />} ></Route>
              </Routes>
           </BrowserRouter>   
        </div>    
    )
}

export default App
