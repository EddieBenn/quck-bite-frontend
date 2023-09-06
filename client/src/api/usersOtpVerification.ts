
// import  { useState, useEffect } from 'react';

// const App = () => {
//    const [posts, setPosts] = useState([]);
//    useEffect(() => {
//       fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
//          .then((response) => response.json())
//          .then((data) => {
//             console.log(data);
//             setPosts(data);
//          })
//          .catch((err) => {
//             console.log(err.message);
//          });
//    }, []);

// return (
//    // ... consume here
// );
//};