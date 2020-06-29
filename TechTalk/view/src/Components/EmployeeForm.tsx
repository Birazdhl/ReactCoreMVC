import React, { FormEvent, useState, useEffect } from 'react'
import { Segment, Grid, GridColumn, Button, Form, Container } from 'semantic-ui-react'
import { IEmployee } from '../Model/activity'
import { RouteComponentProps } from 'react-router-dom'
import axios from 'axios';
import {v4 as uuid} from 'uuid';
import { Console } from 'console';
import EmployeeAPI from '../api/EmployeeAPI';

interface DetailParams {
    id: string;
}

const EmployeeForm : React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {

    const [employee, setEmployee] = useState<IEmployee>({
        id: '',
        firstName: '',
        lastName: '',
        address: '',
        organization: ''
    })

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const { name, value } = event.currentTarget;
        setEmployee({ ...employee, [name]: value })
    }


    const handleSubmit = () => {

        console.log(employee);

        if (employee.id.length === 0) {
            let newActivity = {
                ...employee,
                id: uuid()
            }
            console.log(newActivity);
             axios.post('https://localhost:44353/Employee/CreateEmployee',newActivity)
            .then((response) => {
                history.push(`/employeeList`)
            })

        } else {
            axios.post('https://localhost:44353/Employee/EditEmployee',employee)
            .then((response) => {
                history.push(`/employeeList`)
            })
        }
    }

    useEffect(() => {
        if(match.params.id && employee.id.length ===0 )
        {
            axios.get(`https://localhost:44353/Employee/GetEmployee/${match.params.id}`)
            .then((response) => {
                setEmployee(response.data)
            })
        }
    }, [match.params.id])

    return (
        <Container style={{ marginTop: '7em' }}>
        <Grid>
            <GridColumn width={10}>
                <Segment clearing>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input name='firstName' onChange={handleInputChange} placeholder='First Name' value={employee.firstName} />
                        <Form.Input name='lastName' onChange={handleInputChange} placeholder='Last Name' value={employee.lastName} />
                        <Form.Input name='address' onChange={handleInputChange} placeholder='Address' value={employee.address} />
                        <Form.Input name='organization' onChange={handleInputChange}  placeholder='Organization' value={employee.organization} />
                       

                        <Button floated='right' positive type='submit' content='Submit' />
                        <Button onClick={() => history.push('/employeeList')} floated='right' type='button' content='Cancel' />

                    </Form>
                </Segment>
            </GridColumn>
        </Grid>
        </Container>
    )
}

export default EmployeeForm
