import React, { useContext, useState } from 'react'
import { ThemeContext } from "./CreateContext"
const UserProfile = () => {
  const { value, setValue } = useContext(ThemeContext);
  const [data, setdata] = useState("")
  console.log(value, "Data")
  const update = () => {
    setValue(data)
  }
  return (
    <div>
      <p>User Profile</p>
      <p>Name: {value}</p>
      <p>Updated User Name</p>
      <input type="text" placeholder='Enter new name' value={data} onChange={(e) => setdata(e.target.value)} />
      <button onClick={update}>Update</button>
    </div>
  )
}

export default UserProfile
