import { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import {adminlist, getUsers} from "./helper/userapicalls"


const AdminListing = () => {
    
  const { user, token } = isAutheticated();
  const [datas, setDatas] = useState([]);
  const [loader, setLoader] = useState(false);
  
  useEffect(() => {
    setLoader(true);
    adminlist(user._id, token).then(data => {
        if (data.error) {
            setLoader(false);
          console.log(data.error);
        } else {
          setDatas(data);
          setLoader(false);
        }
      });
    },[])
    const content = () => (
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
    )
    return(
        <Base title={loader ? "" : "All Admins"} description={loader ? "" : "These ar the creators of this application" }>


        {loader ? <h1 className="text-white text-center fontLight">Loading ...</h1> 
          : datas < 1 ? <h1 className="text-white text-center fontLight pt-5 ">No admins</h1>
          : content()
        }

        </Base>
    )
}

export default AdminListing;