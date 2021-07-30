import { ResponsiveEmbed } from "react-bootstrap";
import { API } from "../../backend";
import axios from "axios";
import { isAutheticated } from "../../auth/helper";
const { token } = isAutheticated();

// Axois Global
axios.defaults.headers.common['Authentication'] = token;

// Get the user list
export const getUsers = (userId, token) => {
    return fetch(`${API}/users`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Authentication: token
      }
    })
      .then(response => {
        return response.json()
      })
      .catch(error => console.log("ssss" + error));
  };

export const getUser = (userId, token, selectedId) => {
  return new Promise((resolve, reject) => {
    fetch(`${API}/user/select/${userId}/${selectedId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(jsonData => resolve(jsonData))
    .catch(err => resolve({error: `something went wrong err : ${err}`}));
  })
}

export const updateUser = (userId, token, selectedId, updates) => {
  return new Promise((resolve, reject) => {
    fetch(`${API}/user/${selectedId}`,{
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Authentication: token,
      },
      body: JSON.stringify(updates)
    })
    .then(response => response.json())
    .then(jsonData => resolve(jsonData))
    .catch(err => resolve({error: err }))
  })
}

export const deleteUser = (selectedId) => {
  return new Promise((resolve, reject) => {
    fetch(`${API}/user/${selectedId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authentication: token,
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(jsonData => resolve(jsonData))
    .catch(err => resolve({error: `something went wrong err : ${err}`}));
  })
}

export const adminlist = (userId, token) => {
  return fetch(`${API}/admin/list/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json()
    })
    .catch(error => console.log(error));
};

export const getDesignation = () => {
  return fetch(`${API}/get-designation`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  })
    .then(response => {
      return response.json()
    })
    .catch(error => console.log(error));
};

export const getReporters = () => {
  return fetch(`${API}/get-reporters`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authentication: token,
    }
  })
    .then(response => {
      return response.json()
    })
    .catch(error => console.log(error));
};

// fetch attendance detail of logedin user
export const getAttendence = (token) => {
  return fetch(`${API}/attendance-action`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authentication: token,
    }
  })
    .then(response => {
      return response.json()
    })
    .catch(error => console.log(error));
};

// Mark attendence according to present state (true/false)
export const getAttendences = (token) => {
  return fetch(`${API}/attendance-action`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authentication: token,
    }
  })
    .then(response => {
      return response.json()
    })
    .catch(error => console.log(error));
};

// Check in user
export const checkIn = () => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }
  return axios.post(`${API}/post-attendance`, {
    "checkIn": true
  }, config)
  .then(res => {return res.json})
  .catch(err => console.log(err))
}

// Check out user
export const checkOut = () => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    }
  }
  return axios.post(`${API}/post-attendance`, {
    "checkOut": true
  }, config)
  .then(res => {return res.json})
  .catch(err => console.log(err))
}

// Mark Leave
export const leave = () => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    }
  }
  return axios.post(`${API}/post-attendance`, {
    "leave": true
  }, config)
  .then(res => {return res.json})
  .catch(err => console.log(err))
}

// Attendance employees listing
export const fetchAttendance = (name) => {
  const config = {
    header: {
      Accept: "application/json",
      "Content-type": "application/json",
    }
  }
  return axios.post(`${API}/view-attendance`, {name}, config)
  .then(response => {return response})
  .catch(err => console.log(err))
}

// fetch attandance details
export const fetchDetails = ( empId, today, firstDay ) => {
  const config = {
    header: {
      Accept: "application/json",
      "Content-type": "application/json"
      }
    }
    return axios.post(`${API}/employee-attendance/${empId}`, { 
      "fromDate": firstDay,
      "toDate": today    
    }, config)
    .then( res => {return res})
    .catch(err => console.log(err))
}

export const fetchSearchResult = (data) => {
  return fetch(`${API}/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const editAttandanceCtrl = ( date, employeeId, status ) => {
  const config = {
    header: {
      Accept: "application/json",
      "Content-type": "application/json"
      }
    }
    return axios.post(`${API}/edit-attendance`, { 
      date: date, 
      employeeId : employeeId, 
      status: status
    }, config)
    .then( res => {return res})
    .catch(err => console.log(err))
}

export const fetchlogs = ( name, action, fromDate, toDate ) => {
  const config = {
    header: {
      Accept: "application/json",
      "Content-type": "application/json"
      }
    }
    return axios.post(`${API}/get-activity`, { 
      name: name || null,
      action: action || null,
      fromDate: fromDate || null,
      toDate: toDate || null
      
    }, config)
    .then( res => {return res})
    .catch(err => console.log(err))
}

