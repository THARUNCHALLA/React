import useCommonApi from "./CommonApi"

const Api1 = () => {
  const [data,error] = useCommonApi("https://jsonplaceholder.typicode.com")  
  if(error){
    return <p>{error}</p>
  }
  return (
    <div>
      <p>Posts Data</p>
      <ul>
        {data.map((each)=>(
            <li key={each.id}>
                <p>{each.title}</p>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default Api1
