//components
import { CreateCourseForm } from '../../../components/Forms';
import CheckInstructor from '../../../components/wrappers/CheckInstructor';

const CreateCourse = () => {
  return (
    <CheckInstructor>
      <div className="flex items-center  flex-col ">
        <h1 className="text-xl font-medium text-customPrimary  m-4 self-center">
          Let's upload a new Course
        </h1>
        <CreateCourseForm />
      </div>
    </CheckInstructor>
  );
};

export default CreateCourse;
