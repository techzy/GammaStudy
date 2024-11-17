import Link from "next/link";
import Head from "next/head";
import { useEffect,useState } from "react";


export default function Sample() {
  const [time,setTime] = useState("");
  const [topic,setTopic] = useState("");

  useEffect(()=>{


  },[])


  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossorigin="anonymous"
        />
      </Head>
      <div className="text-center">
        <h1 class="mb-5">Study</h1>
        <div className="d-flex justify-content-center align-items-center">
          <input
           value={topic} 
           onChange={
             (e)=>{
               setTopic(e.target.value)
               console.log(topic)
             }
           }
          className="form-control w-75 me-2" type="text" placeholder="Enter Topic" />
          <input 
            value={time} 
            onChange={
              (e)=>{
                setTime(e.target.value)
                console.log(time)
              }
            }
            className="form-control me-2 w-25" 
            type="number" placeholder="Duration (min)" />
          <button className="btn btn-primary">
            <Link href={{
                pathname: '/graph',
                query: [time,topic] // the data
              }} className="text-white text-decoration-none">
              Study
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
