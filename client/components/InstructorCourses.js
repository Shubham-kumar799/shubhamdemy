//components
import Loader from './ui/Loader';
import InstructorSingleCourseCard from './InstructorSingleCourseCard';
import { SideNav } from './Nav';

//utils
import { useState, useEffect, useContext } from 'react';
import { Context } from '../context';
import { useApi } from '../hooks';

const InstructorCourses = () => {
  const [courses, setCourses] = useState([]);

  const { error } = useContext(Context);
  const [res, API] = useApi({
    url: '/api/instructor-courses',
    method: 'get',
  });

  useEffect(() => {
    API({});
  }, []);

  useEffect(() => {
    if (res.data?.ok) {
      setCourses(res.data?.message);
    }
    if (res.error) {
      error({ msg: 'Error fetching courses. Try again' });
    }
  }, [res.error, res.data]);
  return (
    <SideNav>
      {res.loading ? (
        <Loader />
      ) : (
        <div className="flex flex-row">
          {courses &&
            courses.map(course => (
              <InstructorSingleCourseCard course={course} key={course.title} />
            ))}
        </div>
      )}
    </SideNav>
  );
};

export default InstructorCourses;
