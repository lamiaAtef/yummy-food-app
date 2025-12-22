import React, { useState, useEffect, createContext } from 'react';
import axiosClient from "../api/axiosClient"
export const UsersContext = createContext();

export default function UsersContextProvider({ children }) {
  const [usersList, setUsersList] = useState([]);
  const [organicUsersList, setOrganicUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const getUsers = async () => {  
    setLoading(true);
    try {
      let response = await axiosClient.get(`/api/v1/Users/`);
      setUsersList(response.data.data);
      setOrganicUsersList(response.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getUsersById = async (id) => {  
    try {
      let response = await axiosClient.get(`/api/v1/Users/${id}`);
      return response.data;
    } catch (err) {
      setError(err);
    }
  };

  const deleteUser = async (id) => {
    try {
      console.log(id,"delete user")
      await axiosClient.delete(`/api/v1/Users/${id}`);
      setUsersList(prev => prev.filter(user => user.id !== id));
      console.log("User deleted");
    } catch (err) {
      setError(err);
    }
  };

  const searchUsers = (query) => {
    const filter = organicUsersList.filter(user =>
      user.userName.toLowerCase().includes(query.toLowerCase())
    );
    setUsersList(filter);
  };


  

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <UsersContext.Provider value={{
      usersList,
      loading,
      error,
      getUsers,
      getUsersById,
      deleteUser,
      searchUsers
    }}>
      {children}
    </UsersContext.Provider>
  );
}
