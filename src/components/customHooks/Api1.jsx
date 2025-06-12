import useCommonApi from "./CommonApi"

const Api1 = () => {
  const [data,error] = useCommonApi("https://jsonplaceholder.typicode.com/users")
  if(error){
    return <p>{error}</p>
  }
  return (
    <div>
      <p>Users Data</p>
      <ul>
        {data.length>0 && data.map((each)=>(
            <li key={each.id}>
                <p>{each.name}</p>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default Api1
