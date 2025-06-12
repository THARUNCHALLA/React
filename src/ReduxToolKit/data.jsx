// import React, { useState } from "react";
// import { useGetUsersQuery, useGetUserByIdQuery } from "./reduxtoolkitQuery";

// const Data = () => {
//     const { data, error, isLoading } = useGetUsersQuery();
//     const [selectedId, setSelectedId] = useState(null);

//     const Data = useGetUserByIdQuery(selectedId, { skip: selectedId === null });
//     console.log(Data,"Data")
//     // const {
//     //     data: selectedUser,
//     //     isFetching,
//     //     isSuccess,
//     //     error: selectedError,
//     // } = useGetUserByIdQuery(selectedId, { skip: selectedId === null });

//     const Handle = (ID) => {
//         setSelectedId(ID); // Triggers getUserById API call
//     };

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error.status}</div>;

//     return (
//         <div>
//             <h2>All Users:</h2>
//             {data?.map((user) => (
//                 <div key={user.id}>
//                     <h3 style={{ cursor: "pointer", color: "blue" }} onClick={() => Handle(user.id)}>
//                         {user.name}
//                     </h3>
//                     <p>{user.email}</p>
//                 </div>
//             ))}

//             {/* {selectedId && (
//                 <div style={{ marginTop: "20px" }}>
//                     <h2>Selected User Details:</h2>
//                     {isFetching && <p>Loading user details...</p>}
//                     {selectedError && <p>Error fetching user: {selectedError.status}</p>}
//                     {isSuccess && (
//                         <div>
//                             <h4>{selectedUser.name}</h4>
//                             <p>Email: {selectedUser.email}</p>
//                             <p>Phone: {selectedUser.phone}</p>
//                             <p>Website: {selectedUser.website}</p>
//                         </div>
//                     )}
//                 </div>
//             )} */}
//         </div>
//     );
// };

// // export default Data;
// import { useGetUsersQuery, useLazyGetUserByIdQuery } from "./reduxtoolkitQuery";
// const Data = () => {
//   const { data: users, error, isLoading } = useGetUsersQuery();
//   const [Trigger, result] = useLazyGetUserByIdQuery();
//   console.log(result,"result")

//   const Handle = (id) => {
//     Trigger(id); // Trigger API call manually
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.status}</div>;

//   return (
//     <div>
//       <h2>All Users:</h2>
//       {users?.map((user) => (
//         <div key={user.id}>
//           <h3
//             style={{ cursor: "pointer", color: "blue" }}
//             onClick={() => Handle(user.id)}
//           >
//             {user.name}
//           </h3>
//           <p>{user.email}</p>
//         </div>
//       ))}

//       {result.isFetching && <p>Loading user details...</p>}
//       {result.error && <p>Error: {result.error.status}</p>}
//       {result.isSuccess && (
//         <div style={{ marginTop: "20px" }}>
//           <h2>Selected User Details:</h2>
//           <h4>{result.data.name}</h4>
//           <p>Email: {result.data.email}</p>
//           <p>Phone: {result.data.phone}</p>
//           <p>Website: {result.data.website}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Data;

import { useAddUserMutation, useUpdateUserMutation, useGetUsersQuery, useLazyGetUserByIdQuery, useDeleteUserMutation } from "./reduxtoolkitQuery"



const Data = () => {
  const [addUser, { isLoading: isAdding }] = useAddUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const { data: users, error, isLoading } = useGetUsersQuery();
  const [Trigger, result] = useLazyGetUserByIdQuery();

  const Handle = (id) => {
    Trigger(id); // Trigger API call manually
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.status}</div>;

  // Add user example
  const handleAddUser = async () => {
    try {

      const newUser = {
        "id": 11,
        "name": "tharun challa",
        "username": "Moriah.Stanton",
        "email": "Rey.Padberg@karina.biz",
        "address": {
          "street": "Kattie Turnpike",
          "suite": "Suite 198",
          "city": "Lebsackbury",
          "zipcode": "31428-2261",
          "geo": {
            "lat": "-38.2386",
            "lng": "57.2232"
          }
        },
        "phone": "024-648-3804",
        "website": "ambrose.net",
        "company": {
          "name": "Hoeger LLC",
          "catchPhrase": "Centralized empowering task-force",
          "bs": "target end-to-end models"
        }
      };
      const result = await addUser(newUser).unwrap();
      console.log("User added:", result);
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  // Update user example
  const handleUpdateUser = async () => {
    try {
      const updatedUser = { id: 9, name: "Updated Name", email: "updated@example.com" };
      const result = await updateUser(updatedUser).unwrap();
      console.log("User updated:", result);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  // Delete user example
  const handleDeleteUser = async () => {
    try {
      const result = await deleteUser(1).unwrap();
      console.log("User deleted:", result);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div>
      <div>
        <h2>All Users:</h2>
        {users?.map((user) => (
          <div key={user.id}>
            <h3
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => Handle(user.id)}
            >
              {user.name}
            </h3>
            <p>{user.email}</p>
          </div>
        ))}

        {result.isFetching && <p>Loading user details...</p>}
        {result.error && <p>Error: {result.error.status}</p>}
        {result.isSuccess && (
          <div style={{ marginTop: "20px" }}>
            <h2>Selected User Details:</h2>
            <h4>{result.data.name}</h4>
            <p>Email: {result.data.email}</p>
            <p>Phone: {result.data.phone}</p>
            <p>Website: {result.data.website}</p>
          </div>
        )}
      </div>
      <button onClick={handleAddUser} disabled={isAdding}>Add User</button>
      <button onClick={handleUpdateUser} disabled={isUpdating}>Update User</button>
      <button onClick={handleDeleteUser} disabled={isDeleting}>Delete User</button>
    </div>
  );
};


export default Data

