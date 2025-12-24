import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../SharedComponents/components/Header/Header'
import headerImg from "../../../assets/images/h2.png"
import DeleteConfirmation from '../../../SharedComponents/components/DeleteConfirmation/DeleteConfirmation';
import { UsersContext } from '../../../context/UsersContext';
import NoData from '../../../SharedComponents/components/NoData/NoData';
import { BeatLoader } from 'react-spinners';
import DropDownButton from '../../../SharedComponents/components/DropDownButton/DropDownButton';

export default function UsersList() {
  const {loading,error,usersList,deleteUser} = useContext(UsersContext)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [openId, setOpenId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState(null);


  const openDeleteModal = (id,name) => {
    setSelectedId(id);
    setSelectedName(name)
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setSelectedId(null);
    setShowDeleteModal(false);
  };
  
    const handleToggle = (id) => {
      setOpenId(prev => (prev === id ? null : id));
    };
  if (loading) return <div className='d-flex  align-items-center justify-content-center vh-100'> <BeatLoader size={30} color='#288131' margin={10}  /></div> 

  return (
    <>
       <Header title={"Users List"} description={"You can now add your items that any user can order it from the Application and you can edit"} imgUrl={headerImg}/>
       <div>
          <h2>Users Table Details</h2>
          <p>You can check all details</p>
       </div>
         <table className="table table-wrapper my-5">
                 <thead style={{background: "#E2E5EB"}}>
                   <tr>
                     <th scope="col" className='customTableColor' > User Name</th>
                     <th scope="col" className='customTableColor' >email</th>
                     <th scope="col" className='customTableColor' >country</th>      
                     <th scope='col' className='customTableColor' >phoneNumber</th>
                     <th scope='col' className='customTableColor' >group</th>
                     <th scope='col' className='customTableColor' >action</th>
                   </tr>
                 </thead>
                 <tbody>
         {
           usersList?.length  > 0 
           ? usersList.map(users => (
               <tr key={users.id}>
                <th >{users.userName}</th>
                 <th >{users.email}</th>
                 <td>{users.country}</td>
                 <td>{users.phoneNumber}</td>
                 <td>{users.group?.name}</td>
                  <td className=''>
                   <DropDownButton
                     actions={{
                      //  view: {
                      //    label: "View",
                      //    icon: "fa-solid fa-eye",
                      //    onClick: () => handleView(users.id),
                      //  },
                      
                       delete: {
                         label: "Delete",
                         icon: "fa-solid fa-trash",
                         onClick: () => openDeleteModal(users.id,users.userName),
                         class:"text-danger",

                       },
                     }}
                   />
                 </td>
               </tr>
             ))
           : ( <tr>
             <td colSpan="6" className="text-center">
              <NoData/> 
             </td>
           </tr>)
         }
       </tbody>
       
       </table>
        <DeleteConfirmation
                     show={showDeleteModal}
                     itemName={selectedName}
                     deletedElement="User"
                     onClose={closeDeleteModal}
                     
                     onConfirm={() => {
                    deleteUser(selectedId);
                    closeDeleteModal();
                    
                 }}/>
      
    </>
  )
}
