import { useEffect, useState } from 'react';

const useStudentInfoFetch = (email) => {
  const [info, setInfo] = useState({});
  console.log(email);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/studentDetails?email=${email}`)
        .then((res) => res.json())
        .then((data) => setInfo(data));
    }
  }, [email]);

  console.log(info);
  return [info];
};

export default useStudentInfoFetch;
