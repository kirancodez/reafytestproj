
// import React from "react";
// import Card from "react-bootstrap/Card";
// import Base from "../core/Base";
// import { createuser, isAutheticated } from "../auth/helper";
// import { adminlist, usercount } from "./helper/userapicalls";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Dashboard = () => {
//     const { user, token } = isAutheticated();
//     adminlist(user._id, token ) 
    
//     const [admincount, setAdmincount] = useState("")
//     const [usercounts, setUsercounts] = useState("")
//     const [loader, setLoader] = useState(false)

//     useEffect(() => {
//         adminlist(user._id, token ).then(data => {
//             if(data.error){
//                 console.log(data.error)
//             }
//             else{
//                 setAdmincount(data.length)
//             }
//         })

//         usercount(user._id, token ).then(data => {
//             if(data.error){
//                 console.log(data.error)
//             }
//             else{
//                 setUsercounts(data)
//             }
//         })
//     },[])
//     const content = () => (
//         <div className="container">
//         <div className="row">
//             <Card style={{ width: "22rem" }} className={user.isAdmin ? "" : "avoid-clicks" }>
//                 <Link to="/admin/list"  >
//                 <Card.Body>
//                     <h1>{admincount}</h1>
//                     <p>Total Admins</p>
//             </Card.Body>
//                 </Link>
//             </Card>
//                 <Card style={{ width: "22rem" }}>
            
//                 <Link to= { 
//                     user.assignedPerm.includes("user-list") ? "/user/list"
//                     : user.assignedPerm.includes("user-edit") ? "/user/edit"
//                     : "" }
//                     className={
//                         user.assignedPerm.includes("user-list") ? ""
//                         : user.assignedPerm.includes("user-edit") ? ""
//                         : "avoid-clicks"    
//                      }>
//                     <Card.Body>
//                         <h1>{usercounts}</h1>
//                         <p>Total Users  </p>
//                     </Card.Body>
//                 </Link>
//                 </Card>
//         </div>
//     </div>
//     )
    
//     return(
//         <Base>
//             {admincount && usercounts ? content() : <h1 className="text-white text-center fontLight">Loading ... </h1>}
//         </Base>
//     )
// }

// export default Dashboard;