import React from 'react';
import { NavLink } from 'react-router-dom';
import { css } from 'linaria';

const navbarCss = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid var(--brand-grey-light);
  background-color: #fff;
  z-index: 1;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--header-height);
  }

  .logo {
    font-size: 18rem;
    font-weight: bold;
    color: var(--brand-primary);
    margin: 0;
  }

  .link {
    font-size: 13rem;
    text-decoration: none;
    height: var(--header-height);
    line-height: var(--header-height);
    display: inline-block;
    transition: all 0.3s ease-in-out;

    &.active {
      border-bottom: 4px solid var(--link-color);
    }

    & + .link {
      margin-left: 12px;
    }
  }
`;

const LINKS = [
  { label: 'Today', to: '/', exact: true },
  { label: 'Calendar', to: '/calendar', exact: false },
  { label: 'Favorites', to: '/favorites', exact: false }
];

const Navbar = function() {
  return (
    <div className={navbarCss}>
      <div className="container">
        <h1 className="logo">Flavur</h1>
        <nav className="nav">
          {
            LINKS.map(({ to, label, exact }) => (
              <NavLink
                key={to}
                to={to}
                isActive={(match, { pathname }) => {
                  return exact ? pathname === to : pathname.includes(to);
                }}
                className="link"
              >
                { label }
              </NavLink>
            ))
          }
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
