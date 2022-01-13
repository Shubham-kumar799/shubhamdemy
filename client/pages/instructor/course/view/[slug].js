//components
import CheckInstructor from '../../../../components/wrappers/CheckInstructor';
import SideNav from '../../../../components/SideNav';
import Image from 'next/image';
import { Spin, Modal, Typography, Button, Tooltip, Divider } from 'antd';
import AddLessonForm from '../../../../components/AddLessonForm';
import Lessons from '../../../../components/Lessons';

//utils
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Context } from '../../../../context';
import ReactMarkdown from 'react-markdown';

//icons
import {
  DeleteOutlined,
  EditOutlined,
  CloudUploadOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

const LessonUploadModal = ({
  setCourse,
  slug,
  visible,
  setVisible,
  course,
}) => {
  return (
    <Modal
      title="+ Add Lesson"
      centered
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      footer={null}
      style={{
        paddingBottom: 0,
      }}
    >
      <AddLessonForm
        setCourse={setCourse}
        setVisible={setVisible}
        slug={slug}
        course={course}
      />
    </Modal>
  );
};

const CourseView = () => {
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const { error } = useContext(Context);
  const { slug } = router.query;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/course/${slug}`);
        setCourse(data);
      } catch (err) {
        error({ msg: err.response.data.message });
        console.log('error in fetching course', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug]);

  return (
    <CheckInstructor>
      <SideNav>
        {loading || !course ? (
          <div className="flex items-center justify-center h-screen">
            <Spin />
          </div>
        ) : (
          <>
            <div className="flex flex-row-reverse justify-between">
              <div className="p-8  items-center justify-center">
                <Image src={course?.image?.Location} height={250} width={360} />
              </div>
              <div className="pt-4">
                <Text className="font-bold text-3xl block">{course.title}</Text>

                <Text className="text-lg block">
                  <ReactMarkdown>{course.description}</ReactMarkdown>
                </Text>
                <div className="flex flex-1 mt-4">
                  <Button
                    color="green"
                    type="primary"
                    icon={<EditOutlined />}
                    className="mr-4"
                    onClick={() =>
                      router.push(`/instructor/course/edit/${slug}`)
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    type="primary"
                    icon={<DeleteOutlined />}
                    danger
                    className="mr-4"
                  >
                    Delete
                  </Button>
                  <Tooltip
                    title={
                      course?.lessons?.length > 4
                        ? 'Publish'
                        : 'Course should have atleast 5 lessons before publish'
                    }
                    color={course?.lessons?.length > 4 ? 'green' : '#f5222d'}
                  >
                    <Button
                      icon={<CheckCircleOutlined />}
                      disabled={course?.lessons?.length < 4}
                      className="mr-4"
                      shape="round"
                    >
                      Publish
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="flex flex-row justify-between items-center">
                <p className="font-medium text-2xl">
                  {`Lessons (${course?.lessons?.length})`}
                </p>
                <Button
                  onClick={() => setVisible(true)}
                  type="text"
                  icon={<CloudUploadOutlined />}
                >
                  Upload Lessons
                </Button>
              </div>
              <Divider />
              {course?.lessons?.length == 0 ? (
                <div className="flex flex-1 items-center justify-center m-4">
                  <p className="italic text-lg text-rose-500">
                    No lessons added yet!
                  </p>
                </div>
              ) : (
                <Lessons setCourse={setCourse} slug={slug} course={course} />
              )}
            </div>
            <LessonUploadModal
              visible={visible}
              setVisible={setVisible}
              course={course}
              slug={slug}
              setCourse={setCourse}
            />
          </>
        )}
      </SideNav>
    </CheckInstructor>
  );
};

export default CourseView;
