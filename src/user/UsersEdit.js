import { useState, useEffect } from "react";
import Base from "../core/Base";
import { createuser, isAutheticated } from "../auth/helper";
import {getUsers, getUser, updateUser, deleteUser, getDesignation, getReporters} from "./helper/userapicalls"
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import toast, { Toaster } from 'react-hot-toast';
import { useLocation } from "react-router-dom";
import PageItem from 'react-bootstrap/PageItem'
import Pagination from 'react-bootstrap/Pagination'

const UserEdit = () => {
const { user, token } = isAutheticated();
const [datas, setDatas] = useState([]);
const [editModal, setEditModal] = useState(false);
const [loader, setLoader] = useState(false);
const [update, setUpdate] = useState(false);
const [create, setCreate] = useState(false);

// Load Deignations
const [designations, setDesignations] = useState([]);
const [reporters, setReporters] = useState([""]);

const search = useLocation().search;
const page=new URLSearchParams(search).get("page");

useEffect(() => {
  getDesignation().then( items => {
    if(items.error){
      console.log(items.error)
    }
    else{
      setDesignations(items)
    }
  })
  
  getReporters().then( items => {
    if(items.error){
      console.log(items.error)
    }
    else{
      setReporters(items)
    }
  })
}, [])


const [edits, setEdits] = useState({
    editId: "",
    name: "",
    email: "",
    phoneNumber: "",
    age: "",
    modal: false,
    role: "",
    reporter: "",
    designation: "",
    sucess: false,
    error: "",
})

const { editId ,name, email, phoneNumber, age, modal,role, sucess, error, reporter, designation} = edits;
const onEditHandler = (event) => {
  let id = event.currentTarget.getAttribute('data-id')
  setEdits({...edits, editId: id, modal: !modal });
}

const handleChange = name => event => {
  setEdits({...edits, error: false, [name]: event.target.value })
}

const onUpdatehandler = (event) => {
  updateUser(user._id, token, editId, {name, email, phoneNumber, age, role, reporter_id: reporter, designation}).then(data => {
    if(data.error){
      toast.error(data.error, {
        style: {
          border: '2px solid #ed4f4f',
          padding: '22px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#ed4f4f',
          secondary: '#FFFAEE',
        },
      });
    }
    else{
      setUpdate(!update);
      setEdits({...edits, modal: !modal})
      toast.success('User Updated Successfully ', {
        style: {
          border: '2px solid #ed4f4f',
          padding: '22px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#ed4f4f',
          secondary: '#FFFAEE',
        },
      });
    }
  })
}

useEffect(() => {
    getUser(user._id, token, editId ).then(data => {
        if(data.error){
          console.log(data.error)
        }
        else{
          console.log(data)
            const { id, age, assignedPerm, email, isAdmin, name, phoneNumber, role, designation  } = data;
            setEdits({...edits, editId: data._id, name: name, email: email, phoneNumber: phoneNumber, age: age, role: role, reporter: data.reporter_id, designation: designation })
        }
    })
},[editId])

// Delete User
const [ deleteSuccess, setdeleteSuccess ] = useState(false);
const deleteHandler = (event) => {
  let id = event.currentTarget.getAttribute('data-id')
  deleteUser(id).then(data => {
    if(data.error){
      console.log(data.error)
    }
    else{
      setdeleteSuccess(!deleteSuccess);
      toast.success('User deleted Successfully', {
        style: {
          border: '2px solid #ed4f4f',
          padding: '22px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#ed4f4f',
          secondary: '#FFFAEE',
        },
      });
    }
  })
}

// Add new User
const [userCreate, setUserCreate ] = useState({
  umodal: false,
  uname: "",
  uemail: "",
  upassword: "",
  uphone: "",
  urole: "2",
  ureporter: "1",
  uage: "",
  udesignation: "1",
  usuccess: false,
  uerror: ""
});

const { umodal, uname, uemail, upassword, uphone, uage, urole, ureporter, usucces, uerror, udesignation } = userCreate;
const createButtonHandle = (event) => {
  setUserCreate({...userCreate, umodal:!umodal});
}

const handleCreateChange = name => event => {
  setUserCreate({ ...userCreate, error: false, [name]: event.target.value });
};


useEffect(() => {
  setLoader(true)
  getUsers(user._id, token, page).then(data => {
  if (data.error) {
      console.log(data.error);
  } else {
    // console.log(data["data"])
      setDatas(data);
      setLoader(false)
  }
  });
},[create, deleteSuccess, update])

const onSubmit = event => {
  event.preventDefault();
  createuser({ 
    name:uname, 
    email: uemail, 
    password: upassword, 
    phoneNumber: uphone, 
    age: uage, 
    role : urole,
    designation : udesignation,
    reporter_id: ureporter
  })
    .then(data => {
      if (data.error) {
        toast.error(data.error, {
          style: {
            border: '2px solid #ed4f4f',
            padding: '22px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#ed4f4f',
            secondary: '#FFFAEE',
          },
        });
        setUserCreate({ ...userCreate, uerror: data.error, usuccess: false });
      } else {
        setCreate(!create)
        toast.success("User created successfully", {
          style: {
            border: '2px solid #ed4f4f',
            padding: '22px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#ed4f4f',
            secondary: '#FFFAEE',
          },
        });
        setUserCreate({
          ...userCreate,
          umodal: false,
          uname: "",
          uemail: "",
          upassword: "",
          uerror: "",
          uage: "",
          usuccess: true
        });
      }
    })
    .catch(err => console.log("Error in signup"));
};


let active = page;
let items = [];

for (let number = 1; number <= Math.ceil(datas.count/10) ; number++) {
  items.push(
    <Pagination.Item  onClick={()=> window.location.href='/user/edit?page=' + number} key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}

const paginationBasic = (
  <div>
    <Pagination size="sm">{items}</Pagination>
  </div>
);
// Update User Modal
const editModalb = () => (
<Modal show ={modal}>
      <ModalBody>
          <h1 className="fontLight text-center">Update the user details</h1>
          <form className="updateForm">
              <label for="name">Name</label>
              <input type="text" className="form-control" onChange={handleChange("name")} value={name} />
              <label for="name">Email</label>
              <input type="email" className="form-control" onChange={handleChange("email")} value={email} />
              <label for="name">Phone</label>
              <input type="number" className="form-control" onChange={handleChange("phoneNumber")} value={phoneNumber} />
              <label for="name">Age</label>
              <input type="number" className="form-control"  onChange={handleChange("age")} value={age} />
              <label for="team" className="form-control"> Designation 
              <select className="form-control w-100" name="city" onChange={handleChange("designation")}>
                    {
                      designations?.data?.map((item, index) => { 
                      return <option selected={designation === item._id} value={item._id} >{item.designation_type}</option>
                      })
                    }
              </select>
              </label>
              <label for="team" className="form-control"> Team 
              <select className="form-control w-100" name="city" onChange={handleChange("reporter")}>
                {
                  reporters?.data?.map((item, index) => { 
                    return <option selected={ reporter === item._id }  value={item._id} >{item.name}</option>
                    })
                }
              </select>
              </label>
              <p className="mt-2 mb-0">Role</p>
              <label>
                <input className="m-2 mr-0" type="radio"  name="userrole"
                onClick={handleChange("role")}
                value="employee"
                checked={role === "employee"}
                ></input>
                <span>Employeee</span>
              </label>
              <label>
                <input className="m-2 mr-0" type="radio"  name="userrole"
                onClick={handleChange("role")}
                checked={role === "reporter"}
                value="reporter"
                ></input>
                <span>Reporter</span>
              </label>
              <label>
                <input className="m-2 mr-0" type="radio"   name="userrole"
                onClick={handleChange("role")}
                checked={role === "admin"}
                value="admin"
                ></input>
                <span>Admin</span>
              </label>
          </form>
      </ModalBody>
      <ModalFooter>
          <button className="crtlbtn btn" onClick={(e) => (setEdits({...edits, modal: !modal}))} >Close</button>
          <button className="crtlbtn btn" onClick={onUpdatehandler}>Update</button>
      </ModalFooter>
    </Modal>
)

// Create User Modal 
const createUserModal = () => (
<Modal show ={umodal}>
      <ModalBody>
          <h1 className="fontLight text-center">Create a new user</h1>
          <form className="updateForm">
              <label>Name</label>
              <input type="text" className="form-control" onChange={handleCreateChange("uname")} placeholder="name" />
              <label>Email</label>
              <input type="email" className="form-control" onChange={handleCreateChange("uemail")}  placeholder="email" />
              <label>Password</label>
              <input type="text" className="form-control" onChange={handleCreateChange("upassword")}   placeholder="password" />
              <label>Phone</label>
              <input type="number" className="form-control" onChange={handleCreateChange("uphone")}  placeholder="Phone" />
              <label>Age</label>
              <input type="number" className="form-control" onChange={handleCreateChange("uage")}   placeholder="Age" />
              <label for="team" className="form-control"> Designationss 
              <select className="form-control w-100" name="city" onChange={handleCreateChange("udesignation")}>
                    {
                      designations?.data?.map((item, index) => { 
                      return <option  value={item._id} >{item.designation_type}</option>
                      })
                    }
              </select>
              </label>
              <label for="team" className="form-control"> Team 
              <select className="form-control w-100" name="city" onChange={handleCreateChange("ureporter")}>
                    {
                      reporters?.data?.map((item, index) => { 
                      return <option  value={item._id} >{item.name}</option>
                      })
                    }
              </select>
              </label>
              
              <label for="role"> Role<br/>
              <label>
                <input className="m-2 mr-0" type="radio"    name="userrole"
                onClick={handleCreateChange("urole")}
                value="employee"
                ></input>
                <span>Employeee</span>
              </label>
              <label>
                <input className="m-2 mr-0" type="radio"    name="userrole"
                onClick={handleCreateChange("urole")}
                value="reporter"
                ></input>
                <span>Reporter</span>
              </label>
              <label>
                <input className="m-2 mr-0" type="radio"    name="userrole"
                onClick={handleCreateChange("urole")}
                value="admin"
                ></input>
                <span>Admin</span>
              </label>
              </label>
          </form>
      </ModalBody>
      <ModalFooter>
          <button className="crtlbtn btn"  onClick={() => (setUserCreate({...userCreate, umodal: !umodal}))}>Close</button>
          <button className="crtlbtn btn" onClick={onSubmit}>Add</button>
      </ModalFooter>
    </Modal>
)

const tables = () => (
  <div className="col-md-10 mx-auto mt-4">
            <table className="col-md-12 bg-white table text-center listTable">
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Age</th>
                        <th scope="col">Designation</th>
                        <th scope="col">Team</th>
                        <th scope="col">Role</th>
                        <th scope="col">Controls</th>
                        </tr>
                    </thead>
                    
                    {datas?.data?.map((item, index) => (
                      <tbody key={index}>
                            <tr>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.age}</td>
                            <td>{item.Designation}</td>
                            <td>{item.Reporter}</td>
                            <td>{item.role}</td>
                            <td>
                                <button  className="btn controlBtn" data-id={item._id} onClick={onEditHandler} > Edit</button>
                                <button className="btn controlBtn" data-id={item._id}  onClick={deleteHandler}>Delete</button>
                            </td>
                            </tr>
                        </tbody>
                    ))}
            </table>
            <h1>{
            // Math.ceil(datas.count/5)
 
            paginationBasic

            }</h1>
        </div>
)

return(
        <Base title={loader ? "" : "All Users"} description={loader ? "" : "Edit, Update, Delete users from here" }  >
          <button onClick={createButtonHandle} className="addUser">+</button>
        {editModalb()}
        {createUserModal()}
        <Toaster 
            position="bottom-center"
            reverseOrder={false}/>
        {loader ? <h1 className="text-white text-center fontLight">Loading ...</h1> 
          : datas < 1 ? <h1 className="text-white text-center fontLight pt-5 ">Oops! ...  there is no users so far ... !</h1>
          : tables()}
          
        </Base>
    )

}
export default UserEdit;