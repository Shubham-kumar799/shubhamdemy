//components
import SingleCourseHeader from '../../components/SingleCourse.js/SingleCourseHeader';
import SingleCourseDescription from '../../components/SingleCourse.js/SingleCourseDescription';

//utils
import axios from 'axios';

const SingleCourse = ({ course }) => {
  const { title, description, instructor, price, lessons, image, _id } = course;
  return (
    <div>
      <SingleCourseHeader
        title={title}
        instructor={instructor}
        numberOfLessons={lessons.length}
        price={price}
        image={image}
        _id={_id}
        slug={course.slug}
      />
      <SingleCourseDescription lessons={lessons} description={description} />
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(
    `http://localhost:4000/api/course/${query.slug}`
  );

  return {
    props: {
      course: data,
    },
  };
}

export default SingleCourse;
