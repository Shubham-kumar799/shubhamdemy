//components
import { Card, Badge, Tooltip, Button, Typography } from 'antd';
import Image from 'next/image';

//icons
import {
  EditOutlined,
  RightCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

const InstructorSingleCourseCard = ({ course }) => {
  return (
    <Badge.Ribbon
      color={
        course.lessons.length > 4
          ? course.published
            ? 'green'
            : 'blue'
          : '#f5222d'
      }
      placement="start"
      text={
        course.lessons.length > 4
          ? course.published
            ? 'Published'
            : 'Ready to Publish'
          : 'Pending'
      }
    >
      <Card
        bordered={false}
        className="m-2 mr-8 ml-0 mb-0"
        hoverable
        cover={
          <Image
            height={225}
            width={324}
            alt="example"
            src={course.image.Location}
          />
        }
        actions={[
          <Tooltip title="Delete">
            <Button key="delete" type="link" danger icon={<DeleteOutlined />} />
          </Tooltip>,
          <Tooltip title="Edit">
            <Button
              onClick={() => console.log('edit course')}
              key="edit"
              icon={<EditOutlined />}
            />
          </Tooltip>,
          <Tooltip title={'Go to course'}>
            <Button
              key="course"
              type="link"
              icon={<RightCircleOutlined />}
              href={`/instructor/course/view/${course.slug}`}
            />
          </Tooltip>,
        ]}
      >
        <Text
          className="font-medium text-xl block"
          style={{ width: 250 }}
          ellipsis={true}
        >
          {course.title}
        </Text>
        <p className="mt-2 font-medium">{course.lessons.length} Lessons</p>
      </Card>
    </Badge.Ribbon>
  );
};

export default InstructorSingleCourseCard;
