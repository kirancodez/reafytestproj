import { useState, useEffect } from "react";
import { isAutheticated } from "../auth/helper";
import { fetchlogs } from "./helper/userapicalls";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { DropdownButton,Dropdown} from "react-bootstrap";

const Logs = () => {

    // const [logs, setLogs] = useState([]);
    const [log, setLog] = useState({
        name: "",
        action: "",
        fromDate: "",
        toDate: "",
        logsItems: ""
    })
    const [loglist, setLogList] = useState([]);
    const { name, action, fromDate, toDate, logsItems } = log;

    useEffect(() => {
        ( async () => {
            try {
                const details = await fetchlogs( name, action, fromDate, toDate );
                setLogList(details?.data?.data);
            } catch(error) {
                console.log(error);
            }
        })()
    }, [])

    return(
        <Base>
            {

                <div className="container">
                    {loglist?.map(items => (
                        <div class="cards text-capitalize">
                            <p class="bg-white p-3">{items.sentence}</p>
                        </div>
                    ))}
                </div>
              
            }
        </Base>
    )
}

export default Logs;