import { useLocation, Navigate } from "react-router-dom";

// export const ProtectRoute = ({children}:any) => {
//     const location = useLocation()
//     console.log(location)
//     const isAuthenticated:any = localStorage.getItem('token')
//     !isAuthenticated || isAuthenticated == undefined ? <Navigate to="/login"/> : children state={{from:location} }/>
    
//     return children
// }
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProtectRoute = ({ children }:any) => {
  const location = useLocation();

  const isAuthenticated = localStorage.getItem('token');

  // Use ternary operator to conditionally render
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};


// const userRole = localStorage.getItem('role')
// export const ProtectRoute = ({ children }:any) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   console.log(location);

//   const isAuthenticated = !!localStorage.getItem('signature'); // Convert to boolean
//   const userRole = localStorage.getItem('id');

//   if (!isAuthenticated) {
//     return navigate ("/login") state={{ from: location }};
//   }

//   return <>{children}</>;
// };


// const auth = {
// 	authenticate: () => {
// 		const token = localStorage.getItem("token");
// 		if (token) {
// 			return true;
// 		}
// 		return false;
// 	},
// 	getToken: () => {
// 		const token = localStorage.getItem("token");
// 		return token;
// 	},
// };


// export default auth;
