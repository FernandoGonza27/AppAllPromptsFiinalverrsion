import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';;

const GET_PROMPTS_BY_NAME = gql`
  query ($name: String!) {
    searchPromptsByName(name: $name) {      
      type
      instruction      
    }
  }
`;
const SearchPrompts = ({ setList }) => {
    const [name, setName] = useState('My car');
    const { loading, error, data } = useQuery(GET_PROMPTS_BY_NAME, {
        variables: { name },
    });

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log(error);
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h1>Prompts Search</h1>
            <input
                type="text"
                placeholder="Enter prompt name"
                value={name}
                onChange={(e) => {
                    console.log(data);
                    setName(e.target.value);
                }}
            />

            {data && data.searchPromptsByName.map((prompt) => (
                <div key={prompt.name}>
                    <h2>{prompt.name}</h2>
                    <p>{prompt.instruction}</p>
                </div>
            ))}
        </div>
    );
}


export default SearchPrompts;


