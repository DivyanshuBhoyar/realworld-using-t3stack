import Link from "next/link";

const Navbar = () => {
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
          <li className="nav-item">
            <a href="" className="nav-link">
              <Link href={"/login"}>Sign in</Link>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link">
              <Link href={"/register"}>Sign up</Link>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
