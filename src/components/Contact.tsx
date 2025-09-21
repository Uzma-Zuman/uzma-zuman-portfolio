import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'uzmazuman42@gmail.com',
      link: 'mailto:uzmazuman42@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+92 328 6091594',
      link: 'tel:+923286091594'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Sahiwal, Pakistan',
      link: '#'
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Let's discuss your next mobile app project. I'm always open to new opportunities and collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8">
                I'm currently available for new projects and always excited to work on 
                innovative mobile applications. Whether you need a new app from scratch 
                or want to improve an existing one, I'd love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="group hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:animate-pulse-glow">
                        <info.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{info.title}</h4>
                        <a 
                          href={info.link}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Stats */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Why Work With Me?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text">Fast</div>
                    <div className="text-sm text-muted-foreground">Delivery</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text">24/7</div>
                    <div className="text-sm text-muted-foreground">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text">Clean</div>
                    <div className="text-sm text-muted-foreground">Code</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text">Modern</div>
                    <div className="text-sm text-muted-foreground">Design</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      placeholder="Your Name"
                      className="bg-muted/50 border-border focus:border-primary"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className="bg-muted/50 border-border focus:border-primary"
                    />
                  </div>
                </div>
                
                <Input
                  placeholder="Subject"
                  className="bg-muted/50 border-border focus:border-primary"
                />
                
                <Textarea
                  placeholder="Your Message"
                  rows={6}
                  className="bg-muted/50 border-border focus:border-primary resize-none"
                />
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full glow-button bg-gradient-primary hover:opacity-90"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;