import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ExternalLink, Github, Upload } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import mobileDev from '@/assets/mobile-dev.jpg';
import weatherAppImage from '@/assets/weather-app-placeholder.jpg';
import ecommerceAppImage from '@/assets/ecommerce-app-placeholder.jpg';
import ProjectImageUpload from './ProjectImageUpload';

const Projects = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [projectImages, setProjectImages] = useState<Record<string, string>>({});
  const projects = [
    {
      title: 'Global Weather App',
      description: 'Weather application with REST API integration for live weather updates. Features responsive UI and city-based search functionality.',
      image: weatherAppImage,
      technologies: ['Flutter', 'REST API', 'Weather API', 'Responsive Design'],
      type: 'Personal Project',
      category: 'Utility',
      github: 'https://github.com/Uzma-Zuman'
    },
    {
      title: 'SellZone - E-commerce App',
      description: 'Complete e-commerce application with Firebase authentication, product browsing, shopping cart, and secure checkout features.',
      image: ecommerceAppImage,
      technologies: ['Flutter', 'Firebase Auth', 'E-commerce', 'Payment Integration'],
      type: 'Personal Project',
      category: 'E-commerce',
      github: 'https://github.com/Uzma-Zuman'
    }
  ];

  // Load project images from database
  useEffect(() => {
    const loadProjectImages = async () => {
      const { data, error } = await supabase
        .from('project_images')
        .select('project_title, image_url');

      if (!error && data) {
        const imageMap = data.reduce((acc, item) => {
          acc[item.project_title] = item.image_url;
          return acc;
        }, {} as Record<string, string>);
        setProjectImages(imageMap);
      }
    };

    loadProjectImages();
  }, []);

  const handleImageUpload = (projectTitle: string) => {
    setSelectedProject(projectTitle);
    setUploadDialogOpen(true);
  };

  const handleImageUpdated = (imageUrl: string) => {
    if (selectedProject) {
      setProjectImages(prev => ({
        ...prev,
        [selectedProject]: imageUrl
      }));
    }
  };

  const getProjectImage = (project: any) => {
    return projectImages[project.title] || project.image;
  };

  return (
    <section id="projects" className="py-20 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of mobile applications I've built using Flutter and modern technologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group overflow-hidden hover:border-primary/50 transition-all duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={getProjectImage(project)}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="text-xs">
                    {project.type}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge variant="outline" className="text-xs border-white/20 text-white">
                    {project.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Button 
                    variant="secondary" 
                    size="icon"
                    className="h-8 w-8 opacity-75 hover:opacity-100"
                    onClick={() => handleImageUpload(project.title)}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardHeader className="space-y-2">
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2 pt-4">
                  {project.github && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                  <Button variant="default" size="sm" className="bg-gradient-primary">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/Uzma-Zuman" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>

        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogContent className="p-0 bg-transparent border-none shadow-none">
            {selectedProject && (
              <ProjectImageUpload
                projectTitle={selectedProject}
                currentImageUrl={projectImages[selectedProject]}
                onImageUpdated={handleImageUpdated}
                onClose={() => setUploadDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Projects;