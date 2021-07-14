import { useState, useEffect } from "react";
import Base from "../core/Base";
import { createuser, isAutheticated } from "../auth/helper";
import {getUsers, getUser, updateUser, deleteUser, makeAdmin} from "./helper/userapicalls"
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import toast, { Toaster } from 'react-hot-toast';


const UserEdit = () => {
const { user, token } = isAutheticated();
const [datas, setDatas] = useState([]);
const [editModal, setEditModal] = useState(false);

const [edits, setEdits] = useState({
    editId: "",
    name: "",
    email: "",
    phoneNumber: "",
    age: "",
    modal: false,
    permissions: [],
    sucess: false,
    error: "",
})

const { editId ,name, email, phoneNumber, age, modal, sucess, permissions, error} = edits;
const onEditHandler = (event) => {
  let id = event.currentTarget.getAttribute('data-id')
  setEdits({...edits, editId: id, modal: !modal });
}

const handleChange = name => event => {
  setEdits({...edits, error: false, [name]: event.target.value })
}

const onUpdatehandler = (event) => {
  updateUser(user._id, token, editId, {name, email, phoneNumber, age, assignedPerm:permissions}).then(data => {
    if(data.error){
      console.log(data.error)
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
            const { id, age, assignedPerm, email, isAdmin, name, phoneNumber  } = data;
            setEdits({...edits, editId: data._id, name: name, email: email, phoneNumber: phoneNumber, permissions: assignedPerm, age: age })
            setChecked(assignedPerm);
        }
    })
},[editId])

// checkbox
const [checked, setChecked] = useState([]);
const checkChange = tags => event => {
  let selected = [...checked];
  let find = selected.indexOf(tags)
  if(find > -1){
    selected.splice(find, 1)
  }
  else {
    selected.push(tags)
  }
  setChecked(selected)
  setEdits({...edits, permissions: selected})
}

// Delete User
const [ deleteSuccess, setdeleteSuccess ] = useState(false);
const deleteHandler = (event) => {
  let id = event.currentTarget.getAttribute('data-id')
  deleteUser(user._id, token, id).then(data => {
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

// Make Admin
const [ adminSuccess, amdinSuccess ] = useState(false);
const adminHandler = (event) => {
  let id = event.currentTarget.getAttribute('data-id')
  makeAdmin(user._id, token, id).then(data => {
    if(data.error){
      console.log(data.error)
    }
    if(data.err === "ACCESS DENIDE"){
      toast.error('Oops..! only admin can do this action', {
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
      setdeleteSuccess(!adminSuccess);
      toast.success('Succesfully made user as Admin', {
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
  upermission: "",
  uage: "",
  usuccess: false,
  uerror: ""
});

const { umodal, uname, uemail, upassword, uphone, uage, upermission, usucces, uerror } = userCreate;
const createButtonHandle = (event) => {
  setUserCreate({...userCreate, umodal:!umodal});
}

const handleCreateChange = name => event => {
  setUserCreate({ ...userCreate, error: false, [name]: event.target.value });
};

// user checkbox
const [uchecked, setUchecked] = useState(["view"]);
const ucheckChange = tags => event => {
  let selected = [...uchecked];
  let find = selected.indexOf(tags)
  if(find > -1){
    selected.splice(find, 1)
  }
  else {
    selected.push(tags)
  }
  setUchecked(selected)
  setUserCreate({...userCreate, upermission: selected})
}

useEffect(() => {
  getUsers(user._id, token).then(data => {
  if (data.error) {
      console.log(data.error);
  } else {
      setDatas(data);
  }
  });
},[edits, deleteSuccess, adminSuccess, userCreate])

const onSubmit = event => {
  event.preventDefault();
  createuser(user._id, token, { 
    name:uname, 
    email: uemail, 
    password: upassword, 
    phoneNumber: uphone, 
    age: uage, 
    assignedPerm :upermission })
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
          upermission: "",
          uage: "",
          usuccess: true
        });
      }
    })
    .catch(err => console.log("Error in signup"));
};

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
              <p className="mt-2 mb-0">Access Permissions</p>
              <label >
                <input type="checkbox" className="m-2 mr-0" id="user-list"
                onChange={checkChange("user-list")}
                checked={checked.includes("user-list")}
                ></input>
                <span >User list</span>
              </label>
              <label>
                <input className="m-2 mr-0" type="checkbox" id="user-edit" 
                onChange={checkChange("user-edit")}
                checked={checked.includes("user-edit")}
                ></input>
                <span>User Edit</span>
              </label>
              <label>
                <input className="m-2 mr-0" type="checkbox" id="dashboard" 
                onChange={checkChange("dashboard")}
                checked={checked.includes("dashboard")}
                ></input>
                <span>Dashboard</span>
              </label>
          </form>
      </ModalBody>
      <ModalFooter>
          <button className="crtlbtn btn" onClick={(e) => (setEdits({...edits, modal: !modal}))} >Close</button>
          <button className="crtlbtn btn" onClick={onUpdatehandler}>Update</button>
      </ModalFooter>
    </Modal>
)

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
              <label>
                <input className="m-2 mr-0" type="checkbox" id="Cuser-list"
                onChange={ucheckChange("user-list")}
                checked={uchecked.includes("user-list")}
                ></input>
                <span>User list</span>
              </label>
              <label>
                <input className="m-2 mr-0" type="checkbox" id="Cuser-edit" 
                onChange={ucheckChange("user-edit")}
                checked={uchecked.includes("user-edit")}
                ></input>
                <span>User Edit</span>
              </label>
              <label>
                <input className="m-2 mr-0" type="checkbox" id="Cdashboard" 
                onChange={ucheckChange("dashboard")}
                checked={uchecked.includes("dashboard")}
                ></input>
                <span>Dashboard</span>
              </label>
          </form>
      </ModalBody>
      <ModalFooter>
          <button className="crtlbtn btn"  onClick={() => (setUserCreate({...userCreate, umodal: !umodal}))}>Close</button>
          <button className="crtlbtn btn" onClick={onSubmit}>Add</button>
      </ModalFooter>
    </Modal>
)


return(
        <Base title={datas ? "" : "User edit and epdate page"} description={datas ? "" : "You can Create, Update, Delete users from here"} >
          <button onClick={createButtonHandle} className="addUser">+</button>
        {editModalb()}
        {createUserModal()}
        <Toaster 
            position="bottom-center"
            reverseOrder={false}/>
        {datas < 1 ?  <h1 className="text-white text-center fontLight pt-5 ">No users! .. Add users by clicking '+' button bellow</h1> :         
        <div className="col-md-8 mx-auto mt-4">
            <table className="col-md-7 bg-white table text-center listTable">
                    <thead>
                        <tr>
                        <th scope="col">Name {datas.length}</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Age</th>
                        <th scope="col">controls</th>
                        </tr>
                    </thead>
                    {datas.map((item, index) => (
                      <tbody key={index}>
                            <tr>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.age}</td>
                            <td>
                                <button className="btn controlBtn" data-id={item._id} onClick={onEditHandler}    >Edit</button>
                                <button className="btn controlBtn" data-id={item._id}  onClick={deleteHandler}>Delete</button>
                                <button className="btn controlBtn" data-id={item._id}  onClick={adminHandler} >Make Admin</button>
                            </td>
                            </tr>
                        </tbody>
                    ))}
            </table>
        </div>}
        </Base>
    )

}
export default UserEdit;