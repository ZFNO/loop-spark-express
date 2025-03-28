
import BottomNavbar from '@/components/BottomNavbar';
import UploadForm from '@/components/UploadForm';

const UploadPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-10 pb-16">
        <UploadForm />
      </div>
      <BottomNavbar />
    </div>
  );
};

export default UploadPage;
