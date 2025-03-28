
import { useState, useRef } from 'react';
import { useVideo } from '../contexts/VideoContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Camera, X } from 'lucide-react';

const UploadForm: React.FC = () => {
  const { uploadVideo } = useVideo();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [audioTitle, setAudioTitle] = useState('Original Sound');
  const [isUploading, setIsUploading] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if the file is a video
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Error",
        description: "Please select a video file",
        variant: "destructive"
      });
      return;
    }

    // Create a preview URL
    const previewUrl = URL.createObjectURL(file);
    setVideoPreview(previewUrl);
  };

  const clearVideo = () => {
    setVideoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoPreview) {
      toast({
        title: "Error",
        description: "Please select a video to upload",
        variant: "destructive"
      });
      return;
    }

    if (!description.trim()) {
      toast({
        title: "Error",
        description: "Please add a description for your video",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      // Upload video
      uploadVideo({
        username: 'current_user',
        userAvatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=48&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODI1MTg4NQ&ixlib=rb-4.0.3&q=80&w=48',
        description,
        audioTitle,
        videoUrl: videoPreview
      });

      toast({
        title: "Success",
        description: "Your video has been uploaded",
      });

      setIsUploading(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="p-6 pb-20">
      <h1 className="text-2xl font-bold mb-6 text-white">Upload a video</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Video
          </label>
          
          {!videoPreview ? (
            <div 
              className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              <p className="text-gray-400">Tap to select a video</p>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="relative rounded-lg overflow-hidden bg-black">
              <video 
                src={videoPreview}
                className="w-full h-64 object-contain"
                controls
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-black/60 rounded-full p-1"
                onClick={clearVideo}
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Description
          </label>
          <Textarea
            placeholder="What's your video about?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Sound
          </label>
          <Input
            placeholder="Original Sound"
            value={audioTitle}
            onChange={(e) => setAudioTitle(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-tiktok-teal to-tiktok-red hover:opacity-90 transition-opacity"
          disabled={isUploading || !videoPreview}
        >
          {isUploading ? 'Uploading...' : 'Post Now'}
        </Button>
      </form>
    </div>
  );
};

export default UploadForm;
