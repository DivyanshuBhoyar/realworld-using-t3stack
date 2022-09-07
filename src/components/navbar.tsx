import Link from "next/link";
import { useContext } from "react";
import { UserContextType } from "../@types/user";
import { userContext } from "../context/userContext";

const Navbar = () => {
  const { isAuth } = useContext(userContext) as UserContextType;

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="index.html">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            {/* <!-- Add "active" className when you're on that page" --> */}
            <a className="nav-link active" href="./">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              <i className="ion-compose"></i>&nbsp;New Article
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              <i className="ion-gear-a"></i>&nbsp;Settings
            </a>
          </li>
          {isAuth ? (
            <>
              <li className="nav-item">
                <span className="nav-link">
                  <Link className="nav-link" href="/login">
                    Sign out
                  </Link>
                </span>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <span className="nav-link">
                  <Link className="nav-link" href="/login">
                    Sign in
                  </Link>
                </span>
              </li>
              <li className="nav-item">
                <span className="nav-link">
                  <Link className="nav-link" href="/register">
                    Sign up
                  </Link>
                </span>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
