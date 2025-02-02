import { useAuth } from "../context/AuthContext";
import "../styles/App.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav>
      <div className="nav-container">
        <h1 className="eventease-title">EventEase</h1> {/* ✅ Added EventEase Title */}
        <div className="nav-links">
          <a href="/">Home</a>
          {user ? (
            <>
              <a href="/create-event">Create Event</a>
              <a href="/my-events">My Events</a>
              <button className="logout-btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
