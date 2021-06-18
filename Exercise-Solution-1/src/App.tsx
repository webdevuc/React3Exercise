import React ,{useEffect,useState} from 'react';
import './App.css';


const App = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
          var date = new Date;
          var hours = date.getHours();
          var minutes = date.getMinutes().toString().replace(/^(\d)$/, '0$1');
          var seconds = date.getSeconds().toString().replace(/^(\d)$/, '0$1');
          var ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          var strTime = hours + ':' + minutes + ':' +seconds+' '+ ampm;
          setTime(strTime);
        }, 1000);
        return () => clearInterval(interval);
      }, []);

    return (
        <div className='main'>
        <p className='time'>
           {time}
        </p>
        </div>
    )
}

export default App;




