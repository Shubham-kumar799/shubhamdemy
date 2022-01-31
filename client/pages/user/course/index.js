//components
import { SideNav } from '../../../components/Nav';
import Loader from '../../../components/ui/Loader';
import UserSingleCourseCard from '../../../components/UserSingleCourseCard';

//utils

import { useEffect, useState } from 'react';
import axios from 'axios';

const UserCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const { data } = await axios.get('/api/user-courses');
        setCourses(data);
      } catch (err) {
        console.log('error loading courses', err);
      }
    };
    loadCourses();
  }, []);

  return (
    <SideNav>
      <div>
        {!courses ? (
          <Loader />
        ) : (
          courses?.map((course, index) => (
            <UserSingleCourseCard course={course} key={index} />
          ))
        )}
      </div>
    </SideNav>
  );
};

export default UserCourses;
