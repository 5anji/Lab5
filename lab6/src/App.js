import './App.css';
import EmployeeList from './components/EmployeeList';
import EmployeeContextProvider from './contexts/EmployeeContext';
import Login from "./components/Login";
import {jwtDecode} from "jwt-decode";
import {useEffect, useState} from "react";

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [theme, changeTheme] = useState(localStorage.getItem('theme'));
    const toggleTheme = () => {
        if(theme === "true") {
            changeTheme("false");
            localStorage.setItem('theme', theme);
        } else  {
            changeTheme("true");
            localStorage.setItem('theme', theme);
        }
        console.log(theme);
    }

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            console.log(decodedToken.role);

            if (decodedToken.exp < currentTime) {
                localStorage.removeItem('token');
                setToken(null);
            }
        }
    }, [token]);
  return (
      <div className={`container-xl newContainer ${theme === "true" ? 'bodyDark' : ''}`} >
        <div className="table-responsive">
          <div className="table-wrapper">
              {!token && (
                  <Login/>
              )}
              {token && (
            <EmployeeContextProvider>
              <EmployeeList toggleTheme={toggleTheme} theme={theme}/>
            </EmployeeContextProvider>
              )}
          </div>
        </div>
      </div>
  );
}

export default App;
