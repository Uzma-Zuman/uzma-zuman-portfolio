import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import flutterIcon from '@/assets/flutter-icon.jpg';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: ['Flutter', 'Dart', 'UI/UX Design', 'Responsive Layouts', 'Material Design']
    },
    {
      title: 'Backend & Database',
      skills: ['Firebase Auth', 'Firestore', 'Firebase Storage', 'RESTful APIs', 'JSON']
    },
    {
      title: 'State Management',
      skills: ['Provider', 'GetX', 'Bloc Pattern', 'setState']
    },
    {
      title: 'Tools & Technologies',
      skills: ['Git', 'Version Control', 'Android Studio', 'VS Code', 'Figma']
    },
    {
      title: 'Soft Skills',
      skills: ['Problem Solving', 'Team Collaboration', 'Communication', 'Agile Development']
    }
  ];

  const certifications = [
    {
      title: 'Apps with Flutter',
      provider: 'Cursa',
      id: '3e80db791ceec3ef8b4f5f5951a169e8'
    },
    {
      title: 'Flutter Complete Course',
      provider: 'Cursa',
      id: 'b977802c09e8d19418f20f5e5f49216d'
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Featured Skill - Flutter */}
        <div className="mb-16">
          <Card className="border-primary/20 bg-gradient-dark">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 rounded-2xl overflow-hidden">
                  <img 
                    src={flutterIcon} 
                    alt="Flutter Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-bold gradient-text mb-4">Flutter Expert</h3>
                  <p className="text-muted-foreground mb-4">
                    Specialized in building beautiful, fast, and cross-platform mobile applications 
                    using Flutter framework with 1+ years of hands-on experience.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge variant="secondary">Cross-Platform</Badge>
                    <Badge variant="secondary">Material Design</Badge>
                    <Badge variant="secondary">Hot Reload</Badge>
                    <Badge variant="secondary">Native Performance</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <Card key={index} className="group hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex} 
                      variant="outline"
                      className="hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <Card key={index} className="border-accent/20">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-lg">{cert.title}</h4>
                    <p className="text-muted-foreground">{cert.provider}</p>
                    <div className="code-block">
                      <span className="text-xs">ID: {cert.id}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;