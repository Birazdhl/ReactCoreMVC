import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Segment, Item, Container, Card, Icon, Button } from 'semantic-ui-react';
import { IEmployee } from '../../src/Model/activity'
import { Link, RouteComponentProps } from 'react-router-dom';


interface DetailParams {
    id: string;
}


const EmployeeList : React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {

    const [employees, setEmployees] = useState<IEmployee[]>([])

    useEffect(() => {
        axios.get('https://localhost:44353/Employee/GetEmployeeList')
            .then((response) => {
                setEmployees(response.data)
            })

    }, [employees])

    const deleteEmployee =(id: string) => {
        axios.get(`https://localhost:44353/Employee/DeleteEmployee/${id}`)
        .then((response) => {
            history.push('/employeeList')
        })
    }

    return (
        <Container style={{ marginTop: '7em' }}>
            <Segment>
                {
                    employees.map(employee => (
                            <Card key={employee.id}>
                                {/* <Image src='/images/avatar/large/daniel.jpg' wrapped ui={false} /> */}
                                <Card.Content>
                                    <Card.Header>{employee.firstName}</Card.Header>
                                    <Card.Meta>{employee.address}</Card.Meta>
                                        <Card.Description>
                                     {employee.organization}
                                </Card.Description>
                                </Card.Content>

                             <Card.Content>
                             
                             
                             <Button
                               
                                onClick={() => deleteEmployee(employee.id)}
                                floated="right"
                                content="Delete"
                                color="red" />

                             <Button
                                as={Link} to={`/edit/${employee.id}`}
                                floated="right"
                                content="View"
                                color="blue" />

                             </Card.Content>

                            </Card>
                    ))
                }
            </Segment>
        </Container>
    )
}

export default EmployeeList