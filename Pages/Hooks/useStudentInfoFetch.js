import axios from 'axios';
import { useEffect, useState } from 'react';

const useStudentInfoFetch = (email) => {
  const [info, setInfo] = useState({});
  // console.log(email);

  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:5000/studentDetails?email=${email}`)
        .then((res) => setInfo(res.data));
    }
  }, [email]);

  // console.log(info);
  return [info, setInfo];
};

export default useStudentInfoFetch;
