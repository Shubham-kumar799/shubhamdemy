//components
import { Card, Button, Typography } from 'antd';
import Image from 'next/image';

//icons
import { HourglassOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const { Text } = Typography;

const UserSingleCourseCard = ({ course }) => {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(`/user/course/${course.slug}`)}
      bordered={false}
      className="m-2 max-w-xs"
      hoverable
      cover={
        <Image
          height={225}
          width={324}
          alt="example"
          src={course.image.Location}
        />
      }
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
  );
};

export default UserSingleCourseCard;
