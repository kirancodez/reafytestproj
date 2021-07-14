import { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import {getUsers} from "./helper/userapicalls"


const UserList = () => {
    
  const { user, token } = isAutheticated();
  const [datas, setDatas] = useState([]);
  
  useEffect(() => {
      getUsers(user._id, token).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setDatas(data);
        }
      });
    },[])
    
    return(
        <Base title={datas  ? "" : "All users"} description={datas ? "" : "This page shows all the users loged in to the system"}>
          {datas < 1 ?  <h1 className="text-white text-center fontLight pt-5 ">Oops! ...  there is no users so far ... !</h1> :         
          <div className="col-md-6 mx-auto mt-4">
            <table className="col-md-7 bg-white table text-center listTable">
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Age</th>
                        </tr>
                    </thead>
                    {datas.map((item, index) => (
                      <tbody>
                            <tr>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.age}</td>
                            </tr>
                        </tbody>
                    ))}
           
            </table>
        </div>}


        </Base>
    )
}

export default UserList;