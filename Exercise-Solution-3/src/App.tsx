// import React, { useEffect, useState } from 'react';
// import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';
// import './App.css';


// const App = () => {
//   const [time, setTime] = useState('');
//   useEffect(() => {
//     const interval = setInterval(() => {
//       var date = new Date;
//       var hours = date.getHours();
//       var minutes = date.getMinutes().toString().replace(/^(\d)$/, '0$1');
//       var seconds = date.getSeconds().toString().replace(/^(\d)$/, '0$1');
//       var ampm = hours >= 12 ? 'pm' : 'am';
//       hours = hours % 12;
//       hours = hours ? hours : 12; // the hour '0' should be '12'
//       var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
//       setTime(strTime);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className='main'>

//       <div className='sub-menu'>
//         {/* <button>Enter Country Code</button> */}
//         <input type="text" name="countryCode" placeholder='Enter Country Code'/>
//         <p className='text'>Name:India</p>
//         <p className='text'>Code:In</p>
//         <p className='text'>Currency:INR</p>
//         <p className='text'>Flag:Flag EMOJI</p>  
//         <p className='text'>Language:English,Marathi</p>
//       </div>
//       <div className='sub-menu'>
//       {/* <button>Enter Continent Code</button> */}
//       <input type="text" name="continentCode" placeholder='Enter Continent Code'/>
//         <p className='text'>Countries</p> 
//         <p className='text'>Country Name</p>
//       </div>
//     </div>
//   )
// }

// export default App;

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import './App.css';

// initialize a GraphQL client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://countries.trevorblades.com'
});

// write a GraphQL query that asks for names and codes for all countries
const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
    }
  }
`;

// create a component that renders a select input for coutries
function App() {
  const [country, setCountry] = useState('US');
  const [continent, setContinent] = useState('AS');

  const { data, loading, error, refetch} = useQuery(gql`
                                      {
                                        continent(code: "${continent}") {
                                          name
                                          countries {
                                            name
                                            emoji
                                            code
                                          }
                                        }
                                      }
                                    `, { client });
  const { data: dataR, error: errorR, loading: landingR, refetch: refetchR } = useQuery( gql`
                                                                                  {
                                                                                    country(code: "${country}") {
                                                                                      name
                                                                                      native
                                                                                      emoji
                                                                                      currency
                                                                                      languages {
                                                                                        code
                                                                                        name
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                `, { client });
  useEffect(() => { 
    refetch(); 
    refetchR(); 
    console.log('dataR===>'+JSON.stringify(dataR)); 
  }, [])

  return (
    <div className='main'>
      <div className='sub-menu'>
        <input type="text" name="countryCode" value={country} onChange={(e) => {setCountry(()=>e.target.value);refetch();}} placeholder='Enter Country Code' />
        {dataR != undefined ? 
          <div>
            <p className='text'>Name:{dataR?.country?.name}</p>
            <p className='text'>Code:{dataR? country: ''}</p>
            <p className='text'>Currency:{dataR?.country?.currency}</p>
            <p className='text'>Flag:{dataR?.country?.emoji}</p>
            <p className='text'>Languages:{dataR?.country?.languages.map((ele)=>{return <span key={ele.code}>{ele.name}, </span>})}</p>
            </div> 
          : null}
      </div>
      <div className='sub-menu'>
        <input type="text" name="continentCode" value={continent} onChange={(e) => {setContinent(()=>e.target.value);refetchR();}} placeholder='Enter Continent Code' />
        <div className="continentList">
          <>
            {data !=undefined && data?.continent?.countries.map(country => (
              <p className='text' key={country.code}><span>{country.emoji} </span> {country.name}</p>
            ))}
          </>
        </div>
      </div>
    </div>
  );
}

export default App;
