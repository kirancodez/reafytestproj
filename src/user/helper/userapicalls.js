import { ResponsiveEmbed } from "react-bootstrap";
import { API } from "../../backend";

// Get the user list
export const getUsers = (userId, token) => {
    return fetch(`${API}/users/${userId}`, {
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
    fetch(`${API}/user/${userId}/${selectedId}`,{
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updates)
    })
    .then(response => response.json())
    .then(jsonData => resolve(jsonData))
    .catch(err => resolve({error: err }))
  })
}

export const deleteUser = (userId, token, selectedId) => {
  return new Promise((resolve, reject) => {
    fetch(`${API}/user/${userId}/${selectedId}`, {
      method: "DELETE",
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

export const makeAdmin = (userId, token, selectedId) => {
  return new Promise((resolve, reject) => {
    fetch(`${API}/make/admin/${userId}/${selectedId}`, {
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



// Dashboard

export const usercount = (userId, token) => {
  return fetch(`${API}/user/count/${userId}`, {
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

