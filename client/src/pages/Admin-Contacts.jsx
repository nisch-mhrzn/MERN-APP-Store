import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

export const AdminContacts = () => {
    const [contactData,setContactData]  =useState([]);
    const {authorizationToken} =useAuth();
  const getContactsData = async()=>{
    try {
        const response = await fetch("http://localhost:5000/api/admin/contacts",{
            method: "GET",
            headers: {
                Authorization: authorizationToken,
            },
        });
        const data =await response.json();
console.log("contact data : ",data);
if(response.ok){
    setContactData(data);

}
    } catch (error) {
        console.error("Error fetching contacts data:", error);
      toast.error("Error fetching contacts data. Please try again later.");
    }
  }
    useEffect(() => {
    getContactsData();
  }, []);
  return (
    <section className="admin-users-section">
      <div className="container">
        <h1>Admin Contacts Data</h1>
      </div>
      <div className="container admin-users">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((curUser, index) => (
              <tr key={index}>
                <td>{curUser.username}</td>
                <td>{curUser.email}</td>
                <td>{curUser.message}</td>
                <td>
                  <button onClick={() => deleteContact(curUser._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
  
};
