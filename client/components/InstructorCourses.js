//components
import { Spin } from 'antd';
import InstructorSingleCourseCard from './InstructorSingleCourseCard';
import SideNav from './SideNav';

//utils
import { useState, useEffect, useContext } from 'react';
import { Context } from '../context';
import axios from 'axios';

const InstructorCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { error } = useContext(Context);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/instructor-courses');
        setCourses(data);
      } catch (err) {
        error({ msg: 'Error fetching courses. Try again' });
        console.log('error fetching course', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  return (
    <SideNav>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Spin />
        </div>
      ) : (
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 ">
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
