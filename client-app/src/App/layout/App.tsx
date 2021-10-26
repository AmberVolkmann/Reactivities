import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './NavBar';
import './styles.css';
import {v4 as uuid} from 'uuid';


function App() {
  // Below is the state(s) that we're using throughout our application
  // First arg is the name of the variable, is a function that we can use to set the state
  const [activities, setActivities] = useState<Activity[]>([]);
  // Here we're creating a union of Activity and undefined, because the state will be undefined on page load since nothing is selected
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  const [editMode, setEditMode] = useState(false);

  // Axios is promise based, so we'll have to do something after recieving the response
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
    .then(response => {
      setActivities(response.data);
    })
  }, []) 

  function handleSelectActivity(id: string) {
    // This is going to loop of the activities array and search for an activity with a matching ID and return true.
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    // Check for the presence of an activity ID, if we do that means that we're going to be editing the activity with setActvities
    activity.id 
      ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) 
      : setActivities ([...activities, {...activity, id: uuid()}]); // The uuid will be created every time we create a new activity
    setEditMode(false);
    // we're going to set the selected/displayed activity to the one we just created
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id !== id)])
  }

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard 
            activities={activities} 
            selectedActivity={selectedActivity}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            editMode={editMode}
            openForm={handleFormOpen}
            closeForm={handleFormClose}
            createOrEdit={handleCreateOrEditActivity}
            deleteActivity={handleDeleteActivity}  
          />
      </Container>
    </>
  );
}

export default App;
