//components
import Loader from '../../../components/ui/Loader';
import StudentNav from '../../../components/StudentNav';
import CheckUser from '../../../components/wrappers/CheckUser';
import BaseLayout from '../../../components/ui/BaseLayout';

//utils
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Course = () => {
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/user/course/${slug}`);
        setCourse(data);
      } catch (err) {
        console.log('error fetching course', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  return (
    <CheckUser>
      {loading ? (
        <Loader />
      ) : (
        <BaseLayout nostyles>
          <StudentNav courseId={course?._id} lessons={course?.lessons} />
        </BaseLayout>
      )}
    </CheckUser>
  );
};

export default Course;
