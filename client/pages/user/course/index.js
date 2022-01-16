//components
import SideNav from '../../../components/SideNav';
import { Spin } from 'antd';
import UserSingleCourseCard from '../../../components/UserSingleCourseCard';

//utils
import { Context } from '../../../context';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const { data } = await axios.get('/api/user-courses');
        setCourses(data);
        console.log('jlkfd;jsak', data);
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
          <div className="flex flex-1 h-screen items-center justify-center">
            <Spin />
          </div>
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
