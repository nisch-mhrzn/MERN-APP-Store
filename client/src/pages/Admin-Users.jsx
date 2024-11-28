import { useEffect, useState } from "react"
import { useAuth } from "../store/auth";
export const AdminUsers = () => {
    const [users,setUsers] =useState([]);
    const{authorizationToken} =useAuth();
   

    const getAllUsersData = async () => {
       try {
        const response = await fetch("http://localhost:5000/api/admin/users", {
            method: "GET",
            headers: {
                Authorization: authorizationToken,
            },
        })
        const data = await response.json();
        console.log(`data is : ${data}`)
        setUsers(data.users);
       } catch (error) {
        console.log(error)
       }
    }
    useEffect(()=>{
        getAllUsersData();
    },[])
return <>
<section className="admin-users-section">
    <div className="container">
        <h1>Admin Users Data</h1>
    </div>
    <div className="container admin-users">
    <table className="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
        {users.map((curUser,index)=>{
            return <tr key={index}>
                <td>{curUser.name}</td>
                <td>{curUser.email}</td>
                <td>{curUser.phone}</td>
                <td><button>Update</button></td>
                <td><button>Delete</button></td>
            </tr>
        
})}
        </tbody>
    </table>

</div>
</section>
</>
}