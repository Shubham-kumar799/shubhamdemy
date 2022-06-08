//components
import { SingleCourseCard } from '../components/Home';
import BaseLayout from '../components/ui/BaseLayout';

//utils
import { Spin } from 'antd';
import axios from 'axios';

const Index = ({ courses }) => {
  return (
    <BaseLayout>
      <div className="flex flex-col xl:grid xl:grid-cols-2 xl:gap-4">
        {courses?.map((course, index) => (
          <SingleCourseCard course={course} key={index} />
        ))}
      </div>
    </BaseLayout>
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
