//components
import { Card, Badge, Tooltip, Button, Typography } from 'antd';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

//icons
import {
  EditOutlined,
  RightCircleOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

const InstructorSingleCourse = ({ course }) => {
  return (
    <Badge.Ribbon
      color={course.lessons.length > 4 ? 'green' : '#f5222d'}
      placement="start"
      text={course.lessons.length > 4 ? 'Ready to Publish' : 'Pending'}
    >
      <Card
        bordered={false}
        className="m-2 mr-8 ml-0 mb-0"
        hoverable
        // style={{ width: 240 }}
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
              type=""
              key="edit"
              icon={<EditOutlined />}
            />
          </Tooltip>,
          <Tooltip
            title={
              course.lessons.length > 4
                ? 'Publish'
                : 'Course should have atleast 5 lessons to publish'
            }
            color={course.lessons.length > 4 ? 'green' : '#f5222d'}
          >
            <Button
              key="publish"
              type="link"
              disabled={course.lessons.length < 5}
              icon={<CheckCircleOutlined />}
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
          style={{ width: 300 }}
          ellipsis={true}
        >
          {course.title}
        </Text>
        <div>
          <Text
            className="mt-2 block"
            style={{
              width: 300,
            }}
            ellipsis={true}
          >
            <ReactMarkdown>{course.description}</ReactMarkdown>
          </Text>
        </div>
        <p className="mt-2 font-medium">{course.lessons.length} Lessons</p>
      </Card>
    </Badge.Ribbon>
  );
};

export default InstructorSingleCourse;
