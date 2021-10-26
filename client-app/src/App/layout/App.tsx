import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './NavBar';
import './styles.css';


function App() {
  // First arg is the name of the variable, is a function that we can use to set the state
  const [activities, setActivities] = useState<Activity[]>([]);

  // Axios is promise based, so we'll have to do something after recieving the response
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
    .then(response => {
      setActivities(response.data);
    })
  }, [])

  return (
    <>
      <NavBar />
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard activities={activities}/>
      </Container>
    </>
  );
}

export default App;
