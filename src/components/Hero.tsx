import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center animated-bg">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold">
                Hi, I'm{' '}
                <span className="gradient-text">Uzma Zuman</span>
              </h1>
              <h2 className="text-2xl lg:text-3xl text-muted-foreground">
                Flutter Developer
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Passionate Flutter developer with 1+ years of experience building 
                cross-platform mobile applications. I specialize in creating 
                scalable, high-performance apps with beautiful UI/UX and Firebase integration.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">1+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">5+</div>
                <div className="text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">100%</div>
                <div className="text-muted-foreground">Client Satisfaction</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="glow-button bg-gradient-primary hover:opacity-90 transition-opacity"
                asChild
              >
                <a href="#projects">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  View My Work
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                asChild
              >
                <a href="/Uzma_Zuman_CV.docx" download="Uzma_Zuman_CV.docx">
                  <Download className="mr-2 h-5 w-5" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-in-right">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={heroImage}
                alt="Flutter Developer Workspace"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20" />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-primary rounded-full animate-pulse-glow" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-accent rounded-full animate-float" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;