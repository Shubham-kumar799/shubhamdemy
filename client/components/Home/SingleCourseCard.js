//components
import { Card, Button, Typography, Divider, Badge, Tag } from 'antd';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

//utils
import { currencyFormatter } from '../../utils/helpers';
import { useRouter } from 'next/router';

const { Text } = Typography;

const SingleCourseCard = ({ course }) => {
  const router = useRouter();
  return (
    <Badge.Ribbon
      className="mr-4 mt-2"
      text={
        course.price != 0
          ? `${currencyFormatter({
              amount: course.price,
              currency: 'inr',
            })}`
          : 'Free'
      }
      color={course.price != 0 ? 'blue' : 'green'}
    >
      <Card
        onClick={() => router.push(`/course/${course.slug}`)}
        bordered={false}
        className="m-4"
        hoverable
        actions={[
          <Button key="course" type="link">
            <p className="text-lg font-medium">Enroll Now</p>
          </Button>,
        ]}
      >
        <div className="flex flex-col w-full">
          <div className="flex flex-row h-48">
            <div className="items-center flex =justify-center">
              <Image
                height={225}
                width={324}
                alt="example"
                src={course.image.Location}
              />
            </div>
            <div className="flex flex-col ml-4">
              <Text className="font-medium text-xl">{course.title}</Text>
              <div className="flex flex-row-reverse">
                <p className=" font-light italic underline hover:text-customPrimary">
                  {course?.instructor?.username}
                </p>
              </div>
              <div className="mt-2 overflow-auto scrollbar-hide">
                <ReactMarkdown>{course.description}</ReactMarkdown>
              </div>
            </div>
          </div>
          <Divider />
          <div className="whitespace-nowrap overflow-auto scrollbar-hide ">
            {course.category.map((c, index) => (
              <Tag color="blue" key={index}>
                {c}
              </Tag>
            ))}
          </div>
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

export default SingleCourseCard;
