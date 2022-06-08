//components
import Image from 'next/image';
import { Button } from 'antd';

//utils
import { currencyFormatter } from '../../utils/helpers';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context';
import axios from 'axios';
import { handleFreeAndPaidEnrollment } from '../../utils/course';
import { useRouter } from 'next/router';

//icons
import { CheckCircleOutlined } from '@ant-design/icons';

const SingleCourseHeader = ({
  image,
  numberOfLessons,
  title,
  instructor,
  price,
  _id,
  slug,
}) => {
  const {
    state: { user },
    success,
    error,
  } = useContext(Context);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkEnrollment = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/check-enrollment/${_id}`);
      setEnrolled(data.status);
    } catch (err) {
      console.log('error checking enrollment', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && _id) checkEnrollment();
  }, [user, _id]);

  return (
    <div className="flex flex-col md:flex-row justify-evenly  bg-black p-4 m-4 rounded-3xl">
      <div className="flex gap-y-6 flex-col">
        <div>
          <div>
            <h1 className="text-3xl text-white font-bold">{title}</h1>
          </div>
          <div>
            <h1 className="text-lg text-white font-normal">
              {numberOfLessons} Lessons
            </h1>
          </div>
        </div>
        <div className="flex gap-4">
          <p className="text-white text-lg font-medium "> Instructor </p>

          <p className="font-light italic underline text-white text-lg cursor-pointer">
            {instructor.username}
          </p>
        </div>
        <div>
          <p className="text-xl font-medium text-white">
            {price != 0
              ? currencyFormatter({
                  amount: price,
                  currency: 'inr',
                })
              : 'Free'}
          </p>
        </div>

        <div className="">
          {!enrolled ? (
            <Button
              onClick={() => {
                handleFreeAndPaidEnrollment({
                  _id,
                  success,
                  error,
                  price,
                  setEnrolled,
                  router,
                  slug,
                });
              }}
              icon={<CheckCircleOutlined />}
              shape="round"
              type="primary"
              size="large"
              loading={loading}
              disabled={loading}
            >
              {user ? 'Enroll Now' : 'Login To Enroll'}
            </Button>
          ) : (
            <Button
              shape="round"
              type="primary"
              size="large"
              onClick={() => router.push(`/user/course/${slug}`)}
            >
              Go to Course
            </Button>
          )}
        </div>
      </div>
      <div className="flex items-center m-4 md:m-0 justify-center">
        <Image
          src={image?.Location}
          height={250}
          width={360}
          className="rounded-lg
        "
        />
      </div>
    </div>
  );
};

export default SingleCourseHeader;
