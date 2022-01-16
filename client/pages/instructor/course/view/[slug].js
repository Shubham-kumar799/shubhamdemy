//components
import CheckInstructor from '../../../../components/wrappers/CheckInstructor';
import SideNav from '../../../../components/SideNav';
import Image from 'next/image';
import { Spin, Modal, Typography, Button, Tooltip, Divider } from 'antd';
import AddLessonForm from '../../../../components/AddLessonForm';
import Lessons from '../../../../components/Lessons';
import ReactMarkdown from 'react-markdown';

//utils
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Context } from '../../../../context';
import { handlePublishAndUnpublish } from '../../../../utils/course';

//icons
import {
  DeleteOutlined,
  EditOutlined,
  CloudUploadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

const { Text, Paragraph } = Typography;

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
  const [descriptionEllipsis, setDescriptionEllipsis] = useState(true);
  const router = useRouter();
  const { error, success } = useContext(Context);
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
              <div className="pt-4 flex-1">
                <Text className="font-bold text-3xl block">{course.title}</Text>

                <div className="overflow-scroll scrollbar-hide h-48">
                  <ReactMarkdown>{course.description}</ReactMarkdown>
                </div>

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
                        ? course?.published
                          ? 'Unpublish'
                          : 'publish'
                        : 'Course should have atleast 5 lessons before publish'
                    }
                    color={
                      course?.lessons?.length > 4
                        ? course?.published
                          ? '#f5222d'
                          : 'green'
                        : '#f5222d'
                    }
                  >
                    <Button
                      icon={
                        course?.published ? (
                          <CloseCircleOutlined />
                        ) : (
                          <CheckCircleOutlined />
                        )
                      }
                      disabled={course?.lessons?.length <= 4}
                      className="mr-4"
                      shape="round"
                      danger={course.published}
                      onClick={() =>
                        handlePublishAndUnpublish({
                          course,
                          setCourse,
                          success,
                          error,
                        })
                      }
                    >
                      {course?.published ? 'Take Down' : 'Publish'}
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
