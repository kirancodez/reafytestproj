import { useState, useEffect } from "react";
import { isAutheticated } from "../auth/helper";
import { fetchlogs, getUserNames } from "./helper/userapicalls"
import Base from "../core/Base"
import { Link } from "react-router-dom"
import { DropdownButton,Dropdown} from "react-bootstrap"
import Pagination from 'react-bootstrap/Pagination'
import PageItem from 'react-bootstrap/PageItem'
import { useLocation } from "react-router-dom"

const Logs = () => {
    
    const search = useLocation().search;
    const page= new URLSearchParams(search).get("page");
    const [users, setUsers] = useState([]);
    const [changes, setChanges] = useState();
    const [log, setLog] = useState({
        name: "",
        action: "",
        fromDate: "",
        toDate: "",
        logsItems: "",
        count: ""
    })
    const [loglist, setLogList] = useState([]);
    const { name, action, fromDate, toDate, logsItems, count } = log;
    // Fetching log list
    useEffect(() => {
        ( async () => {
            try {
                const details = await fetchlogs( name, action, fromDate, toDate, page );
                const userNames = await getUserNames();
                await setLogList(details?.data?.data);
                await setLog({...log, count: details.data.count})
                setUsers(userNames?.data?.data)
            } catch(error) {
                console.log(error);
            }
        })()
    }, [changes])

    // List Pagination
    let active = page;
    let items = [];
    for (let number = 1; number <= Math.ceil(count/5); number++) {
    items.push(
        <Pagination.Item onClick={()=> window.location.href='/logs?page=' + number} key={number} active={number === active}>
        {number}
        </Pagination.Item>,
    );
    }
    const paginationBasic = (
    <div>
        <Pagination size="sm">{items}</Pagination>
    </div>
    );
    
    // User Actions
    const actions = (
        <DropdownButton id="dropdown-basic-button" title="Actions" onSelect={(e) => {setLog({...log, action: e})}}>
            <Dropdown.Item eventKey='POST' >POST</Dropdown.Item>
            <Dropdown.Item eventKey='UPDATE' >UPDATE</Dropdown.Item>
            <Dropdown.Item eventKey='DELETE' >DELETE</Dropdown.Item>
        </DropdownButton>
    )
    
    // User Names
    const names = (
        <DropdownButton id="dropdown-basic-button" title="Name" onSelect={(e) => {setLog({...log, name: e})}}>
            {users.map((item, index) => (
                <Dropdown.Item eventKey={item.name} key={index} >{item.name}</Dropdown.Item>
            ))}
        </DropdownButton>
    )
    

    return(
        <Base>
            {
                <div className="container">
                    <div className="filters d-flex justify-content-around mb-5 mt-5 bg-light p-4 borderround">
                        {actions}
                        {names}
                        <label className="ml-3">From Date: <input className="ml-3" type="date" onChange={(e) => {setLog({...log, fromDate: e.target.value})}} /></label>
                        <label className="ml-3">To Date: <input className="ml-3" type="date" onChange={(e) => {setLog({...log, toDate: e.target.value})}} /></label>
                        <button className="btn btn-success ml-3" onClick={() => {setChanges(Math.random())}} >Submit</button>
                    </div>
                    {console.log(loglist.length)}
                    {loglist.length ? 
                           loglist?.map((items, index) => (
                            <div className="cards text-capitalize ">
                                <p className="bg-white p-3 " key={index} >{items.sentence}</p>
                            </div>
                        )) : 
                    <h3>No datas found</h3>
                    }
                    {paginationBasic}
                </div> 
            }
        </Base>
    )
}

export default Logs;