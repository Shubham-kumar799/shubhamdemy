//components
import { Avatar, Layout, Menu } from 'antd';
import StudentLesson from '../StudentLesson';

//utils
import { useState, useContext, useEffect } from 'react';
import { Context } from '../../context';
import axios from 'axios';

//icons

const { Content, Sider } = Layout;

const StudentNav = ({ lessons, courseId }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState(-1);
  const [completed, setCompleted] = useState([]);
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    const fetchCompletedLessons = async () => {
      try {
        console.log('fetching completed');
        const { data } = await axios.post(`/api/list-completed`, {
          courseId,
        });
        setCompleted(data);
      } catch (err) {
        console.log('error fetching completed', err);
      }
    };
    fetchCompletedLessons();
  }, []);

  const onCollapse = c => {
    setCollapsed(c);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        breakpoint="lg"
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <Menu selectedKeys={[current]} theme="dark" mode="inline">
          {lessons?.map((lesson, index) => {
            return (
              <Menu.Item
                key={index}
                onClick={e => setCurrent(e.key)}
                icon={
                  <Avatar
                    className={`${
                      completed && completed?.lessons?.includes(lesson._id)
                        ? 'bg-green-500'
                        : 'bg-gray-500'
                    } `}
                  >
                    {index + 1}
                  </Avatar>
                }
              >
                {lesson.title.substring(0, 30)}
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout
        className="site-layout"
        style={{ marginLeft: collapsed ? 80 : 200 }}
      >
        <Content style={{ margin: '0 16px' }}>
          {current == -1 ? (
            'Lets get STarted'
          ) : (
            <StudentLesson
              setCompleted={setCompleted}
              courseId={courseId}
              lesson={lessons[current]}
              lessonCompleted={completed?.lessons?.includes(
                lessons[current]._id
              )}
            />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default StudentNav;
