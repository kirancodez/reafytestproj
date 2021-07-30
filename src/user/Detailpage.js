import { useState, useEffect } from "react";
import { isAutheticated } from "../auth/helper";
import {fetchDetails, editAttandanceCtrl } from "./helper/userapicalls";
import Calendar from 'react-calendar'
import { useHistory, useParams } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { Doughnut, defaults } from 'react-chartjs-2'
import 'react-calendar/dist/Calendar.css';
import toast, { Toaster } from 'react-hot-toast';


const { user } = isAutheticated()

const Detailpage = () => {
    const { userid } = useParams();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    const firstDay = "1" + '/' + mm + '/' + yyyy;

    const [attendance, setAttendance]= useState([]);
    const [Loading, setLoading]= useState(true);
    const [edit, setEdit] = useState(false);
    const [toFrom, setToFrom] = useState(new Date());
    
    const [value, setValue] = useState({
        name: "",
        fromDate: firstDay,
        toDate: today,
        checkIn: "",
        checkOut: "",
        status: "",
        totalDays: "",
        present: "",
        absent: ""
    })
    const { name, fromDate, toDate, checkIn, checkOut, status, totalDays, present, absent } = value;
    
    useEffect(() => {
        ( async () => {
            try {
                const details = await fetchDetails(userid, toDate, fromDate);
                setValue({
                    ...value, 
                    name: details?.data?.data?.[0].name,
                    fromDate: fromDate,
                    toDate: toDate,
                    checkIn: details?.data?.data?.[0].checkIn,
                    checkOut: details?.data?.data?.[0].checkOut,
                    status: details?.data?.data?.[0].status,
                    totalDays: details?.data?.data?.[0].NumberOfDays,
                    present: details?.data?.data?.[0].present,
                    absent: details?.data?.data?.[0].absent,
                })
                setAbsents(details)
                setLoading(false);
            } catch(error) {
                console.log(error);
            }
        })()
    }, [value.fromDate, value.toDate, edit])

    const [ editAttendance, setEditAttandance ] = useState({
        date: today,
        employeeId: userid,
        empstatus: status
    })
    const { date, employeeId, empstatus } = editAttendance;;
    
    useEffect(() => {
        (async () => {
            try {
                const result = await editAttandanceCtrl(date, employeeId, empstatus);
                setEditAttandance({...editAttendance, date: result.data.data.date, employeeId: result.data.data.employee_id, empstatus: result.data.data.status })
            } catch(error){
                console.log(error);
            }
        })()
    },[])

    let history = useHistory();
    const redirect = () => {
       return history.push('/attendance/listing')
      }
      const onFromDateChange = event => {
        let date = new Date(event.target.value);
        let dateString = [
            date.getDate(),
            date.getMonth() + 1,
            date.getFullYear(),
        ].join('/')
        setValue({...value, fromDate: dateString })
      }
      const onToDateChange = event => {
        let date = new Date(event.target.value);
        let dateString = [
            date.getDate(),
            date.getMonth() + 1,
            date.getFullYear(),
        ].join('/')
        setValue({...value, toDate: dateString })
    }
    
    const [ absents, setAbsents ] = useState([]);
    
    const onLeave = []
    const onHalfLeave = []
    const leaveDtateChecker = absents?.data?.data?.map(obj => {
        if(obj.status == "leave"){
            onLeave.push(obj.date)
        }
    })
    const leaveDtateChecker2 = absents?.data?.data?.map(obj => {
        if(obj.status == "half leave"){
            onHalfLeave.push(obj.date)
        }
    })
   const chkChange = (date) => {
    const convertedDate = date.toLocaleDateString('en-GB', {month: '2-digit',day: '2-digit',year: 'numeric'})
    setEditAttandance({...editAttendance, date: convertedDate})
   }

   const changeAttendance = (event) => {
       setEditAttandance({...editAttendance, empstatus: event.target.value })
       setEdit(true);
   }

   const editCompleate = (event) => {
    if(edit){
        try {
            const result =  editAttandanceCtrl(date, employeeId, empstatus);
            setEditAttandance({...editAttendance, date: result.data.data.date, employeeId: result.data.data.employee_id, empstatus: result.data.data.status })   
            toast.error('Successfully edited user', {
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
        } catch(error){
            console.log(error);
        }
    }
    else{
        toast.error('Please select Date and Attendance type before edit', {
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
   }

    return(
        <div>
             <Toaster 
            position="bottom-center"
            reverseOrder={false}/>
            <a onClick={redirect} className="topleft"><HiArrowLeft/></a>
            <div className="container mt-5 pt-5">
                <div className="row">
                    <div className="col-md-12 row">
                            {
                                Loading ? <h1 className="text-center">Loading ... </h1> :
                                <div className="container">
                                    <h1 className="text-capitalize brand-colour text-center" style={{fontSize: "80px"}}>{ name+ "'s Attendance" }</h1>
                                    <h4 className="text-capitalize text-center text-secondary">Check In : <span style={{color: "#1a4280e3"}}>{ checkIn || "-"}</span>  |  Check Out : <span style={{color: "#1a4280e3"}} >{checkOut || "-" }</span>  |  Status : <span style={{color: "#1a4280e3"}}>{ status + " Present" }</span></h4>
                                    <hr></hr>
                                    <div className="container bg-white p-4 details-wraper">
                                        <div className="row">
                                        <div className="col-md-3">
                                            <Doughnut className="contsiner text-center col-md-6"
                                                data={{
                                                labels: ['Present', 'Absent'],
                                                datasets: [
                                                    {
                                                    label: '# of votes',
                                                    data: [present, absent,],
                                                    backgroundColor: [
                                                        'rgba(255, 99, 132, 0.2)',
                                                        'rgba(54, 162, 235, 0.2)',
                                                    ],
                                                    borderColor: [
                                                        'rgba(255, 99, 132, 1)',
                                                        'rgba(54, 162, 235, 1)',
                                                    ],
                                                    borderWidth: 1,
                                                    },
                                                ],
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: true,
                                                }}
                                                />
                                            </div>
                                            {/* {display : "flex", justifyContent: "center",  alignItems: "center"} */}
                                            <div className="col-md-4 countDiv" >
                                                <h3 className="brand-colour">Total Days: </h3>
                                                <h1>{totalDays}</h1>
                                                <h3 className="brand-colour">Present: </h3>
                                                <h1>{present}</h1>
                                                <h3 className="brand-colour"> Absent: </h3>
                                                <h1>{absent}</h1>
                                            </div>
                                            <div className="col-md-4 datepick">
                                                <div>
                                                    <h2 className="brand-colour" >From Date</h2>
                                                    {/* value={fromDate.split("/").reverse().join("-")} */}
                                                    <input onChange={onFromDateChange} type="date"  max={toDate.split("/").reverse().join("-")} />
                                                </div>
                                                <div>
                                                    <h2 className="brand-colour">To Date</h2>
                                                    <input onChange={onToDateChange} type="date"  />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                    </div>
                </div>
            </div>
            {
            Loading ? <h1> </h1> :
            <div className="container bg-white  edit-wraper mb-5">
                <div className="row">
                    <div className="col-md-6 mt-5 mb-5" >
                        <Calendar
                            onChange={chkChange}
                            tileClassName={({ date}) => {
                            if(onLeave.find(x=>x===(date).toLocaleDateString('en-GB', {month: '2-digit',day: '2-digit',year: 'numeric'}))){
                                return 'highlight'; }
                            }}/>
                             <div className="btn-group ml-4" role="group" aria-label="Basic example" style={{marginLeft: "50px",marginTop: "30px"}}>
                                <button style={{backgroundColor: "#1b4079", color: "white"}} type="button" className="btn " onClick={changeAttendance} value="full day" >Full Day</button>
                                <button style={{backgroundColor: "#1b4079", color: "white"}} type="button" className="btn " onClick={changeAttendance}  value="half day">Half Day</button>
                                <button style={{backgroundColor: "#1b4079", color: "white"}}  type="button" className="btn" onClick={changeAttendance} value="leave" >Absent</button>
                                <button type="button" className="btn btn-success" onClick={editCompleate}>Edit</button>
                            </div> 
                    </div >
                    <div className="col-md-6" style={{display : "flex", justifyContent: "center",  alignItems: "center"}}>
                        <h1  className="brand-colour">
                            Edit users attendence from here 
                        </h1>
                    </div>
                </div>
            </div> 
}</div>
    )
}

export default Detailpage;
