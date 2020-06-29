import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import EmployeeList from './Components/EmployeeList';
import { RouteComponentProps, Route, withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import EmployeeForm from './Components/EmployeeForm';

const App : React.FC<RouteComponentProps> = ({location}) => {
  return (
    <div className="App">
      <NavBar />
      <Container >
         <Route exact path={'/employeeList'} component={EmployeeList} />
         <Route key={location.key} path={['/createEmployee','/edit/:id']} component={EmployeeForm} />
      </Container>
    </div>
  );
}

export default withRouter(App);
