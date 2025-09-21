import { Card, CardContent } from '@/components/ui/card';
import { Code, Smartphone, Users, Zap } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable code following best practices'
    },
    {
      icon: Smartphone,
      title: 'Cross-Platform',
      description: 'Building apps that work seamlessly on iOS and Android'
    },
    {
      icon: Users,
      title: 'User-Centric',
      description: 'Focusing on exceptional user experience and intuitive design'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing apps for speed and efficiency'
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A dedicated Flutter developer passionate about creating innovative mobile solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">My Journey</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Currently pursuing BS Computer Science at University of Sahiwal (2023-2027), 
                I discovered my passion for mobile development during my internship at Jeux Developers.
              </p>
              <p>
                With hands-on experience in building e-commerce, booking, and service-based applications, 
                I've developed a strong foundation in Flutter, Firebase, and modern development practices.
              </p>
              <p>
                I believe in continuous learning and staying updated with the latest technologies 
                to deliver cutting-edge solutions that make a real impact.
              </p>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold">Education</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">BS Computer Science</div>
                    <div className="text-sm text-muted-foreground">University of Sahiwal</div>
                  </div>
                  <div className="text-sm text-muted-foreground">2023 - 2027</div>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <Card key={index} className="group hover:border-primary/50 transition-colors">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:animate-pulse-glow">
                    <item.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;