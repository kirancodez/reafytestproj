import { useState, useEffect } from "react";
import { isAutheticated } from "../auth/helper";
import { fetchAttendance, attendanDetail } from "./helper/userapicalls";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import SearchBox from "./Searchbox";
import bulb from "../asset/lightbulb.png";
import chkinpending from "../asset/lightbulb1.png";
import checkedin from "../asset/idea.png";
import halfleave from "../asset/half.png";
import absent from "../asset/light.png";

const Listing = (props) => {
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
                                        {
                                            item?.status === "checkIn pending" ? <span style={{content: "url("+chkinpending+")"}}  className="notify-badge"></span> :
                                            item?.status === "checkOut pending" ? <span style={{content: "url("+checkedin+")"}}  className="notify-badge"></span> :
                                            item?.status === "full day" ? <span style={{content: "url("+bulb+")"}}  className="notify-badge"></span> :
                                            item?.status === "half day" ? <span style={{content: "url("+halfleave+")"}}  className="notify-badge"></span> :
                                            <span style={{content: "url("+absent+")"}}  className="notify-badge"></span>
                                        }
                                        
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