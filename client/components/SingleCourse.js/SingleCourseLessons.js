//components
import SingleLessonListItem from './SingleLessonListItem';
import { List } from 'antd';

const SingleCourseLessons = ({ lessons }) => {
  return (
    <div className="flex flex-col m-10">
      <p className="text-xl font-medium">Course Content</p>
      <List
        dataSource={lessons}
        renderItem={(item, index) => (
          <SingleLessonListItem lesson={item} key={index} />
        )}
      />
    </div>
  );
};

export default SingleCourseLessons;
