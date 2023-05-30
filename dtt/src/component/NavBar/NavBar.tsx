import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
const NavBar = () => {
  return (
    <Navbar bg='primary' variant='dark'>
      <Container>
        <Navbar.Brand href='/home'>DTT</Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link href='/home'>Home</Nav.Link>
          {localStorage.getItem('role')?.toLowerCase() == 'professor' ? (
            <Nav.Link href='/professorUpdate'>Update</Nav.Link>
          ) : (
            <></>
          )}
          <Nav.Link href='/contact'>Contact</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar
