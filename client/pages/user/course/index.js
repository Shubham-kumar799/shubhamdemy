//components
import SideNav from '../../../components/SideNav';
import { Spin } from 'antd';
import UserSingleCourseCard from '../../../components/UserSingleCourseCard';
import Image from 'next/image';

//utils
import { Context } from '../../../context';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import BaseLayout from '../../../components/ui/BaseLayout';

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
    <BaseLayout nostyles>
      <SideNav>
        <div>
          {!courses ? (
            <div className="flex flex-1 h-screen items-center justify-center">
              <Spin />
            </div>
          ) : courses.length ? (
            courses?.map((course, index) => (
              <UserSingleCourseCard course={course} key={index} />
            ))
          ) : (
            <div className="flex flex-col items-center">
              <Image
                src="/images/not_found.png"
                width={400}
                height={400}
                objectFit="contain"
              />
              <p className="text-xl font-medium text-center">
                You have not published any courses
              </p>
            </div>
          )}
        </div>
      </SideNav>
    </BaseLayout>
  );
};

export default UserCourses;
