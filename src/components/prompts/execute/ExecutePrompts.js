import { Link, useNavigate, useParams} from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useState,useEffect } from "react";
import axios from "../../../axiosConfig";

const ExecutePrompts = () => {
    const navigate =useNavigate();
    const id = useParams().id;
    const { data, loading, error } = useFetch(
      `http://localhost:3300/api/prompts/?id=${id}`
    );
    const [prompt, setPrompt] = useState(data);
    useEffect(() => {
        setPrompt(data);
      }, [data]);    
      console.log(prompt);
      const handleCancel = () => {
        navigate("/");
    };
    const handleExecute = async (id) => {        
        try {
          await axios.post(`http://localhost:3300/api/prompts/execute`);
          
        } catch (err) { }
      };
      
      return(
       <div>
           <h1>{prompt.name}</h1>
            <h2>{prompt.type}</h2>
            <h2>Input</h2>
            <h2>{prompt.instruction}</h2>
            <h2>instructions</h2>
            <h2>{prompt.context}</h2>
            <button>Run</button>
            <h2>Response</h2>
            <input name="response" type="text" />
            <button type="button" onClick={handleCancel}>Back</button>
       </div>
    );
}

export default ExecutePrompts;