import React, {useState} from 'react';
import { Link} from 'react-router-dom';
import { Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import styles from './styles.module.scss';

const Header = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <Container fluid={true} className={styles.headerWrap}>
      <Container fluid="xl">
        <Navbar color="faded" dark className={styles.menu}>
          <NavbarBrand href="/" className={`${styles.menuItem} mr-auto`}>Bitbucket</NavbarBrand>
          <Nav>
            <NavItem>
              <Link className={`${styles.menuItem} ${styles.menuItemFirst}`} to="/">Bengaluru</Link>
            </NavItem>
            <NavItem>
              <Link className={styles.menuItem} to="/cities-weather">Cities weather </Link>
            </NavItem>
          </Nav>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className={styles.menuItem} href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/git/">GitHub</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    </Container>
  );
};

export default Header;
