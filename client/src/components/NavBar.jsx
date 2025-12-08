import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
Button,
Collapse,
Nav,
NavLink,
NavItem,
Navbar,
NavbarBrand,
NavbarToggler,
Input,
} from "reactstrap";
import { logout } from "../managers/authManager";
import '/images/stripes.png'


export default function NavBar({ loggedInUser, setLoggedInUser }) {
const [open, setOpen] = useState(false);

const toggleNavbar = () => setOpen(!open);

return (
    <div>
    <Navbar id="navbar" color="light" light fixed="true" expand="lg">
        
        {loggedInUser ? (
        <>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
            <Nav navbar>
                <NavItem onClick={() => setOpen(false)}>
                  <NavLink id="navTapes" tag={RRNavLink} to="/home">
                   Home
                  </NavLink>
                </NavItem>
                 <NavItem onClick={() => setOpen(false)}>
                  <NavLink id="navTapes" tag={RRNavLink} to="/tapes">
                   Tapes
                  </NavLink>
                </NavItem>
                <NavItem onClick={() => setOpen(false)}>
                  <NavLink id="navTapes" tag={RRNavLink} to="/myTapes">
                   My Collection
                  </NavLink>
                </NavItem>
            </Nav>
            </Collapse>
            {/* <img id="stripedNav" src='/images/stripes.png' /> */}
            <Input id="navSearch" placeholder="search tapes"></Input>
            
            <Button
            color="primary"
            onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                logout().then(() => {
                setLoggedInUser(null);
                setOpen(false);
                });
            }}
            >
            Logout
            </Button>
        </>
        ) : (
        <Nav navbar>
            <NavItem>
           
            </NavItem>
           
        </Nav>
        )}
    </Navbar>
    </div>
);
}
