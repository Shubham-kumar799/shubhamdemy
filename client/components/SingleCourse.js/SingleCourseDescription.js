//components
import ReactMarkdown from 'react-markdown';
import { List, Card } from 'antd';
import SingleCourseLessons from './SingleCourseLessons';

//icons
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import ArticleIcon from '@mui/icons-material/Article';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const listData = [
  {
    icon: <OndemandVideoIcon />,
    title: '15 hours on-demand video',
  },
  {
    icon: <ArticleIcon />,
    title: '22 articles',
  },
  {
    icon: <FileDownloadIcon />,
    title: '156 downloadable resources',
  },
  {
    icon: <AllInclusiveIcon />,
    title: 'Full lifetime access',
  },
  {
    icon: <PhoneAndroidIcon />,
    title: 'Access on mobile and TV',
  },
  {
    icon: <MilitaryTechIcon />,
    title: 'Certificate of completion',
  },
];

const SingleCourseDescription = ({ description, lessons }) => {
  return (
    <div className="m-4 flex  items-start justify-evenly">
      <div className="flex flex-col flex-1">
        <Card
          title={
            <p className="text-xl underline italic  pb-2 font-bold">
              What you will learn
            </p>
          }
          className="flex-1 m-2"
        >
          <div className="overflow-auto max-h-64  scrollbar-hide">
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
        </Card>
        <SingleCourseLessons lessons={lessons} />
      </div>
      <Card className="m-2" hoverable>
        <p className="text-lg underline italic pb-2 font-medium sticky">
          Course Highlights :
        </p>
        <div className="overflow-auto scrollbar-hide">
          <List
            dataSource={listData}
            renderItem={(item, index) => (
              <List.Item key={index}>
                <List.Item.Meta avatar={item.icon} />
                <p className="">{item.title}</p>
              </List.Item>
            )}
          />
        </div>
      </Card>
    </div>
  );
};

export default SingleCourseDescription;
