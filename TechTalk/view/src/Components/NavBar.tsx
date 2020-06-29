import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <Menu fixed='top' inverted>

                <Container>
                    
                    <Menu.Item header as={NavLink} exact to='/employeeList'> 
                        Tech Talks
                    </Menu.Item>
                    <Menu.Item>
                        <Button as={NavLink} to='/createEmployee' positive content='Create Employee'/>
                    </Menu.Item>

                </Container>

                
            </Menu>
    )
}

export default NavBar
