import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './NavBar';
import LoadingComponent from './LoadingComponent';
import './styles.css';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {
  const {activityStore} = useStore();

  // Axios is promise based, so we'll have to do something after recieving the response
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]) 

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <>
      <NavBar />
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);
