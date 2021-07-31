import { useState, useEffect } from "react";
import {  useHistory } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { HiArrowLeft } from "react-icons/hi";
import { getAttendence, checkIn, checkOut, leave } from "./helper/userapicalls";
const { user, token } = isAutheticated();


const Attendence = () => {
    
    const [loading, setLoading] = useState(true);

    // Fetch attendence details of the user
    const [attendance, setAttendance] = useState([]);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        getAttendence(token).then( data => {
            if(data.error){
              console.log(data.error)
            } else{
                setLoading(false);
                setAttendance(data)
            }})
      }, [update])
    
    // Attendance click handler
    const clickHandler = event => {
        let btnType = event.currentTarget.getAttribute('btn-type')
        if( btnType === "Check In"){
            ( async () => {
                try {
                    const result = await checkIn(token, { checkIn: true });
                    setUpdate(!update)
                } catch( error ) {
                    console.log( error.error );
                }
            })();
        } 
        if ( btnType === "Check Out") {
            ( async () => {
                try {
                    const result = await checkOut(token, { checkOut: true });
                    setUpdate(!update)
                } catch( error ) {
                    console.log( error.error );
                }
            })()
        } 
        if( btnType === "leave" ) {
            ( async () => {
                try {
                    const result = await leave(token, { leave: true });
                    setUpdate(!update)
                } catch( error ) {
                    console.log( error.error );
                }
            })()
        }
    }
    
    // Redirecting
    let history = useHistory();
    const redirect = () => {
       return history.push('/')
      }

    return(
        <div className="attendence">
        <a onClick={redirect} className="topleft"><HiArrowLeft/></a>
        {
        loading ? <h1 className="font-weight-light text-white">Loading ..</h1> :
        attendance?.data?.checkIn && attendance?.data?.checkOut ? 
        <h1> It will be rubbish here without you! <span className="brand-colour">{user.name}</span>, Will miss you  Hey {user.name}, you have updated attendence </h1> :
        attendance?.data?.leave ? 
        <h1> Hey {user.name}, you have updated attendence  </h1> :
        <div className="button">
            <button className="btns" onClick={clickHandler} btn-type={attendance?.data?.checkIn ? "Check Out" : "Check In"} >
                { attendance?.data?.checkIn ? "Check Out" : "Check In" }
            </button >
            {
                !attendance?.data?.checkIn &&
                <button className="btns" onClick={clickHandler} btn-type="leave" >
                    Leave
                </button>
            }
        </div>
        }
    </div>
    )
}

export default Attendence;