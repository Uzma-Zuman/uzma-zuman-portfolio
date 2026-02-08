import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ExternalLink, Github, Upload, Play } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import mobileDev from '@/assets/mobile-dev.jpg';
import globalWeatherMain from '@/assets/global-weather-main.png';
import ecommerceAppImage from '@/assets/ecommerce-app-placeholder.jpg';
import eventManagementDemo from '@/assets/event-management-demo.mp4';
import moneyTargetDemo from '@/assets/money-target-demo.mp4';
import ProjectImageUpload from './ProjectImageUpload';

interface Project {
  title: string;
  description: string;
  image?: string;
  video?: string;
  technologies: string[];
  type: string;
  category: string;
  github: string;
}

const Projects = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [projectImages, setProjectImages] = useState<Record<string, string>>({});
  const { isPortfolioOwner } = useAuth();
  const projects: Project[] = [
    {
      title: 'Global Weather App',
      description: 'Beautiful weather application featuring real-time weather data, multi-day forecasts, city search functionality, and stunning visual backgrounds. Displays current temperature, weather conditions, and location-based forecasts.',
      image: globalWeatherMain,
      technologies: ['Flutter', 'Weather API', 'Location Services', 'Responsive UI', 'Search'],
      type: 'Personal Project',
      category: 'Utility',
      github: 'https://github.com/Uzma-Zuman'
    },
    {
      title: 'Event Management App',
      description: 'Modern Event Management Mobile Application with clean UI, smooth animations, and real-world functionality. Features include add/edit/delete events, interactive calendar view, dashboard with charts and statistics, light & dark theme support, and persistent settings.',
      video: eventManagementDemo,
      technologies: ['Flutter', 'Dart', 'FL Chart', 'Table Calendar', 'SharedPreferences', 'Animations'],
      type: 'Personal Project',
      category: 'Productivity',
      github: 'https://github.com/Uzma-Zuman'
    },
    {
      title: 'MoneyTarget – Finance Tracker',
      description: 'Smart personal finance & income tracking app to manage income and savings goals. Set monthly, weekly, and yearly financial targets, track progress with visual indicators, detailed income history, global currency selection, and fully offline local storage.',
      video: moneyTargetDemo,
      technologies: ['Flutter', 'Dart', 'Material 3', 'SharedPreferences', 'Animations'],
      type: 'Personal Project',
      category: 'Finance',
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
                {project.video ? (
                  <video
                    src={project.video}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                    poster=""
                  />
                ) : (
                  <img
                    src={getProjectImage(project)}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
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
                {isPortfolioOwner && (
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
                )}
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