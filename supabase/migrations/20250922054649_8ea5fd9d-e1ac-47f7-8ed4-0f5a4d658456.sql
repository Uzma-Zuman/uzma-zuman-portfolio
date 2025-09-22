-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  is_portfolio_owner BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Profiles are viewable by owner" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, is_portfolio_owner)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    -- First user becomes portfolio owner
    (SELECT COUNT(*) FROM public.profiles) = 0
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update project_images RLS policies to require authentication and portfolio ownership
DROP POLICY IF EXISTS "Anyone can insert project images" ON public.project_images;
DROP POLICY IF EXISTS "Anyone can update project images" ON public.project_images;  
DROP POLICY IF EXISTS "Anyone can delete project images" ON public.project_images;

-- Create secure policies for project images
CREATE POLICY "Only portfolio owner can insert project images" 
ON public.project_images 
FOR INSERT 
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND is_portfolio_owner = true
  )
);

CREATE POLICY "Only portfolio owner can update project images" 
ON public.project_images 
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND is_portfolio_owner = true
  )
);

CREATE POLICY "Only portfolio owner can delete project images" 
ON public.project_images 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND is_portfolio_owner = true
  )
);

-- Update storage policies to require authentication and portfolio ownership
DROP POLICY IF EXISTS "Anyone can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update project images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete project images" ON storage.objects;

-- Create secure storage policies
CREATE POLICY "Only portfolio owner can upload project images" 
ON storage.objects 
FOR INSERT 
TO authenticated
WITH CHECK (
  bucket_id = 'project-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND is_portfolio_owner = true
  )
);

CREATE POLICY "Only portfolio owner can update project images" 
ON storage.objects 
FOR UPDATE 
TO authenticated
USING (
  bucket_id = 'project-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND is_portfolio_owner = true
  )
);

CREATE POLICY "Only portfolio owner can delete project images" 
ON storage.objects 
FOR DELETE 
TO authenticated
USING (
  bucket_id = 'project-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND is_portfolio_owner = true
  )
);

-- Add trigger for profile updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();