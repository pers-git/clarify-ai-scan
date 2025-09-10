import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import ImageCarousel from "@/components/ImageCarousel";
import QuizGame from "@/components/QuizGame";
import UsageStats from "@/components/UsageStats";
import { Shield, Zap, Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Detect AI-Generated<br />Content with Precision
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Upload any document and get an instant, accurate assessment of whether it was written by AI or human.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-3" asChild>
            <Link to="/analyze">
              Try It Free <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Usage Stats */}
      <UsageStats />

      {/* Quiz Game Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Test Your AI Detection Skills</h2>
            <p className="text-muted-foreground text-lg">
              Can you tell the difference between real and AI-generated content? Take our challenge!
            </p>
          </div>
          <QuizGame />
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Clarify?</h2>
            <p className="text-muted-foreground text-lg">
              Advanced AI detection technology with industry-leading accuracy
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center shadow-soft">
              <CardContent className="p-8">
                <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-3">Highly Accurate</h3>
                <p className="text-muted-foreground">
                  Our advanced algorithms achieve 95%+ accuracy in detecting AI-generated content
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-soft">
              <CardContent className="p-8">
                <Zap className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Get results in seconds, not minutes. Perfect for busy professionals and educators
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-soft">
              <CardContent className="p-8">
                <Target className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-3">Detailed Analysis</h3>
                <p className="text-muted-foreground">
                  Get comprehensive reports with confidence scores and detected patterns
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Image Carousel Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <ImageCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join thousands of educators, writers, and professionals using Clarify
          </p>
          <Button size="lg" className="text-lg px-8 py-3" asChild>
            <Link to="/analyze">
              Start Detecting Now
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 text-center text-muted-foreground">
        <div className="container mx-auto">
          <p>&copy; 2024 Clarify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
