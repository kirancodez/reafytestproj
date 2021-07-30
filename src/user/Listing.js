import { useState, useEffect } from "react";
import { isAutheticated } from "../auth/helper";
import { fetchAttendance, attendanDetail } from "./helper/userapicalls";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import SearchBox from "./Searchbox";
import bulb from "../asset/lightbulb.png";
import absent from "../asset/lightbulb1.png";
import checkedin from "../asset/idea.png";
import halfleave from "../asset/half.png";

const Listing = (props) => {
    const badge = {
      
    }
    const { user, token } = isAutheticated();
    const [ loading, setLoading ] = useState(false);
    const [ empList, setEmplist] = useState([]);
    const [ name, setName] = useState();


    useEffect(() => {
        ( async () => {
            try {
                const list = await fetchAttendance(name);
                setEmplist(list);
                setLoading(false);
            } catch(error) {
                console.log(error)
            }
        })()
    }, [name])


    return(
        <Base>
            <div className="container">
                <div className="row">
                    <div className="text-center">
                        <h1 className="text-center brand-colour">Todays Attendance Details</h1>
                        <SearchBox name={name} setName={setName} />
                        <div className="col-md-8 inmates mx-auto mt-4 ">
                            {loading ? <h1 className="brand-colour">Loading ... </h1> :
                            <ul>
                                {empList?.data?.data.map((item, index) => (
                                    <Link to={`/employee-attendance/${item.employee_id}`} className="item" style={{textDecoration: "none"}}>
                                        <span style={{content: "url("+bulb+")"}}  className="notify-badge"></span>
                                        {/* <p className="circle">{item.name..join("").toUpperCase()}</p> */}
                                        <p className="circle">{item.name.match(/(\b\S)?/g).join("").toUpperCase()}</p>
                                        <p className="text-capitalize" style={{color: "#1b4079"}} >{item.name} </p>
                                    </Link>
                                ))}
                            </ul>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default Listing;