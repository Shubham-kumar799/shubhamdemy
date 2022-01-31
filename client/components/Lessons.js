//components
import { List } from 'antd';
import ListLessonItem from './ListLessonItem';

const Lessons = ({ setCourse, slug, course }) => {
  return (
    <div>
      <List
        onDragOver={e => e.preventDefault()}
        itemLayout="horizontal"
        dataSource={course.lessons}
        renderItem={(item, index) => (
          <ListLessonItem
            key={item._id}
            setCourse={setCourse}
            slug={slug}
            index={index}
            item={item}
            course={course}
          />
        )}
      />
    </div>
  );
};

export default Lessons;
