-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);

-- Create policies for project images storage
CREATE POLICY "Project images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'project-images');

CREATE POLICY "Anyone can upload project images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Anyone can update project images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'project-images');

CREATE POLICY "Anyone can delete project images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'project-images');

-- Create table to store project image mappings
CREATE TABLE public.project_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_title TEXT NOT NULL UNIQUE,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on project_images table
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

-- Create policies for project_images table
CREATE POLICY "Project images are viewable by everyone" 
ON public.project_images 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert project images" 
ON public.project_images 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update project images" 
ON public.project_images 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete project images" 
ON public.project_images 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_project_images_updated_at
BEFORE UPDATE ON public.project_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();