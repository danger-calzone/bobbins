/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import AboutPage from 'containers/AboutPage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import Header from 'components/Header';
// import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  color: #595959;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/features" component={FeaturePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      {/* <Footer /> */}
      <GlobalStyle />
    </AppWrapper>
  );
}

// const Dashboard = ({ token, logout }) => {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/dashboard', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setMessage(response.data.message);
//       } catch (error) {
//         console.error(error);
//         logout();
//       }
//     };

//     fetchData();
//   }, [token, logout]);

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <p>{message}</p>
//     </div>
//   );
// };

// const App = () => {
//   const [token, setToken] = useState('');

//   const login = token => {
//     setToken(token);
//   };

//   const logout = () => {
//     setToken('');
//   };

//   const isAuthenticated = !!token;

//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             {!isAuthenticated && (
//               <li>
//                 <Link to="/login">Login</Link>
//               </li>
//             )}
//             {isAuthenticated && (
//               <li>
//                 <Link to="/dashboard">Dashboard</Link>
//               </li>
//             )}
//             {isAuthenticated && (
//               <li>
//                 <button onClick={logout}>Logout</button>
//               </li>
//             )}
//           </ul>
//         </nav>

//         <Switch>
//           <Route exact path="/">
//             <h2>Home</h2>
//           </Route>
//           {!isAuthenticated && (
//             <Route path="/login">
//               <Login login={login} />
//             </Route>
//           )}
//           {isAuthenticated && (
//             <Route path="/dashboard">
//               <Dashboard token={token} logout={logout} />
//             </Route>
//           )}
//           <Route>
//             <Redirect to="/" />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// };

// export default App;
