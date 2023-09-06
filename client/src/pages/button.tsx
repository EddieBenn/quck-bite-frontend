
import Button from '../components/reusableComponents/button';

const ButtonPage = () => {
  return (
    <div className="flex justify-center items-center h-screen space-x-4">
      <Button variant="primary" size="medium" onClick={() => alert('Primary button clicked')}>
        Primary Button
      </Button>
    </div>
  );
};

export default ButtonPage;
