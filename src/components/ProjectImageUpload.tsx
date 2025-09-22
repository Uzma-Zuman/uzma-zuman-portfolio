import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface ProjectImageUploadProps {
  projectTitle: string;
  currentImageUrl?: string;
  onImageUpdated: (imageUrl: string) => void;
  onClose: () => void;
}

const ProjectImageUpload = ({ projectTitle, currentImageUrl, onImageUpdated, onClose }: ProjectImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const { user, isPortfolioOwner } = useAuth();

  // Check if user is authenticated and is portfolio owner
  if (!user || !isPortfolioOwner) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-lg text-center">Access Restricted</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            You need to be signed in as the portfolio owner to upload images.
          </p>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </CardContent>
      </Card>
    );
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      // Create unique filename
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${projectTitle.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}-${Date.now()}.${fileExt}`;

      // Upload file to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(fileName);

      // Save to database
      const { error: dbError } = await supabase
        .from('project_images')
        .upsert({
          project_title: projectTitle,
          image_url: publicUrl
        });

      if (dbError) throw dbError;

      onImageUpdated(publicUrl);
      toast({
        title: "Image uploaded successfully",
        description: "Your project image has been updated",
      });
      onClose();
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Upload Project Image</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Project: <span className="font-medium">{projectTitle}</span>
        </div>
        
        {currentImageUrl && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Current Image:</p>
            <img
              src={currentImageUrl}
              alt={projectTitle}
              className="w-full h-32 object-cover rounded-md border"
            />
          </div>
        )}

        <div className="space-y-2">
          <p className="text-sm font-medium">Select New Image:</p>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="cursor-pointer"
          />
          <p className="text-xs text-muted-foreground">
            Supports JPG, PNG, WebP. Max 5MB.
          </p>
        </div>

        {selectedFile && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Preview:</p>
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Preview"
              className="w-full h-32 object-cover rounded-md border"
            />
          </div>
        )}

        <div className="flex gap-2">
          <Button
            onClick={uploadImage}
            disabled={!selectedFile || uploading}
            className="flex-1"
          >
            <Upload className="mr-2 h-4 w-4" />
            {uploading ? 'Uploading...' : 'Upload Image'}
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectImageUpload;