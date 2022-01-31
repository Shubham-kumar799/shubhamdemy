//components
import { SingleCourseCard } from '../components/Home';
import Loader from '../components/ui/Loader';

//utils
import { Spin } from 'antd';
import axios from 'axios';

const Index = ({ courses }) => {
  return (
    <>
      {!courses ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {courses?.map((course, index) => (
            <SingleCourseCard course={course} key={index} />
          ))}
        </div>
      )}
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`http://localhost:4000/api/courses`);
  return {
    props: {
      courses: data,
    },
  };
}

export default Index;
