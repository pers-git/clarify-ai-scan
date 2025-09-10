import { Card, CardContent } from "@/components/ui/card";
import { Users, FileText, Shield, TrendingUp } from "lucide-react";

const UsageStats = () => {
  // Mock stats - in real app, these would come from your analytics API
  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      value: "50K+",
      label: "Active Users",
      color: "text-blue-600"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      value: "2.3M",
      label: "Files Analyzed",
      color: "text-green-600"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      value: "90.7%",
      label: "Accuracy Rate",
      color: "text-purple-600"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: "99.2%",
      label: "Uptime",
      color: "text-orange-600"
    }
  ];

  return (
    <section className="py-12 px-4 bg-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Trusted by Thousands</h2>
          <p className="text-muted-foreground">
            Join the growing community using Clarify for AI detection
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center shadow-soft">
              <CardContent className="p-6">
                <div className={`${stat.color} mx-auto mb-3`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UsageStats;