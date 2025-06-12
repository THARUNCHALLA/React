import { Link, Outlet } from "react-router-dom"

const Project = () => {
  return (
    <div>
      <h1>Project</h1>
      <Link to="/project/FeaturedProject">FeaturedProject</Link>
       <Link to="/project/NewProject">NewProject</Link>
       <Outlet/>
    </div>
  )
}

export default Project
