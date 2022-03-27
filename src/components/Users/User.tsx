import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import useRefreshToken from "../../api/useRefreshToken";

const Users = () => {
  const [users, setUsers] = useState([]);
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getusers = async () => {
      try {
        const response = await axios.get("/", {
          signal: controller.signal,
        });

        console.log(response.data.data.data);
        isMounted && setUsers(response.data.data.data);
      } catch (error) {
        console.error(error);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getusers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user: any, i: number) => (
            <li key={i}>{user?.name}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
      <button onClick={() => refresh()}>Refresh</button>
    </article>
  );
};

export default Users;

// import { useState, useEffect } from "react";
// import useAxiosPrivate from "../../api/Hooks/useAxiosPrivate";
// import { useNavigate, useLocation } from "react-router-dom";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const axiosPrivate = useAxiosPrivate();
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     let isMounted = true;
//     const controller = new AbortController();

//     const getusers = async () => {
//       try {
//         const response = await axiosPrivate.get("/api/v1/users", {
//           signal: controller.signal,
//         });

//         console.log(response.data.data.data);
//         isMounted && setUsers(response.data.data.data);
//       } catch (error) {
//         console.error(error);
//         navigate("/login", { state: { from: location }, replace: true });
//       }
//     };

//     getusers();

//     return () => {
//       isMounted = false;
//       controller.abort();
//     };
//   }, []);

//   return (
//     <article>
//       <h2>Users List</h2>
//       {users?.length ? (
//         <ul>
//           {users.map((user: any, i: number) => (
//             <li key={i}>{user?.name}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No users to display</p>
//       )}
//     </article>
//   );
// };

// export default Users;
