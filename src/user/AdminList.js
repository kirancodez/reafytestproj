import { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import {adminlist, getUsers} from "./helper/userapicalls"


const AdminListing = () => {
    
  const { user, token } = isAutheticated();
  const [datas, setDatas] = useState([]);
  
  useEffect(() => {
    adminlist(user._id, token).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setDatas(data);
        }
      });
    },[])
    
    return(
        <Base title="Admins" description="We are the admins of the page">
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
        </div>

        </Base>
    )
}

export default AdminListing;