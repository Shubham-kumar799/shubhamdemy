//components
import CheckInstructor from '../../components/wrappers/CheckInstructor';
import InstructorCourses from '../../components/InstructorCourses';
import BaseLayout from '../../components/ui/BaseLayout';

const InstructorIndex = () => {
  return (
    <CheckInstructor>
      <BaseLayout nostyles>
        <InstructorCourses />
      </BaseLayout>
    </CheckInstructor>
  );
};

export default InstructorIndex;
