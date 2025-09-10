import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, RefreshCw, Play } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock quiz data - in real app, this would come from your API
const quizQuestions = [
  {
    id: 1,
    image: "@/src/components/images/image_1.png",
    isReal: true,
    explanation: "This image shows natural lighting inconsistencies and organic details typical of real photography."
  },
  {
    id: 2,
    image: "@/src/components/images/image_2.png",
    isReal: false,
    explanation: "Notice the overly perfect symmetry and unnatural skin texture - classic signs of AI generation."
  },
  {
    id: 3,
    image: "@/src/components/images/image_3.png",
    isReal: true,
    explanation: "The background blur and natural imperfections indicate this was captured by a real camera."
  },
  {
    id: 4,
    image: "@/src/components/images/image_4.png",
    isReal: false,
    explanation: "The hands show anatomical inconsistencies common in AI-generated images."
  },
  {
    id: 5,
    image: "@/src/components/images/image_5.jpg",
    isReal: true,
    explanation: "The lighting setup and natural wear patterns suggest genuine photography."
  }
];

const QuizGame = () => {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'finished'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    const isCorrect = answer === quizQuestions[currentQuestion].isReal;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setAnswers(prev => [...prev, isCorrect]);
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setShowFeedback(false);
        setSelectedAnswer(null);
      } else {
        setGameState('finished');
      }
    }, 3000);
  };

  const resetGame = () => {
    setGameState('intro');
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setShowFeedback(false);
    setSelectedAnswer(null);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) return "Excellent! You have a great eye for AI detection.";
    if (percentage >= 60) return "Good job! With practice, you'll get even better.";
    if (percentage >= 40) return "Not bad, but AI detection is trickier than you think!";
    return "AI is getting sophisticated - let Clarify help you detect it!";
  };

  if (gameState === 'intro') {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-medium">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold mb-2">🧠 Real vs AI Challenge</CardTitle>
          <p className="text-muted-foreground">
            Test your ability to distinguish between real and AI-generated images. 
            Can you spot the fakes?
          </p>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="bg-accent/30 p-4 rounded-lg">
            <p className="font-semibold mb-2">How it works:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 5 images to analyze</li>
              <li>• Choose REAL or FAKE for each</li>
              <li>• Get explanations for each answer</li>
              <li>• See how you compare to AI detection</li>
            </ul>
          </div>
          <Button onClick={() => setGameState('playing')} size="lg" className="w-full">
            <Play className="w-4 h-4 mr-2" />
            Start Challenge
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'finished') {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-medium">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold mb-2">🎉 Challenge Complete!</CardTitle>
          <div className="text-4xl font-bold text-primary mb-2">
            {score}/{quizQuestions.length}
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {Math.round((score / quizQuestions.length) * 100)}% Correct
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center bg-accent/30 p-4 rounded-lg">
            <p className="text-sm font-medium">{getScoreMessage()}</p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">Your Answers:</h4>
            <div className="grid grid-cols-5 gap-2">
              {answers.map((correct, index) => (
                <div key={index} className="text-center">
                  {correct ? (
                    <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500 mx-auto" />
                  )}
                  <p className="text-xs mt-1">Q{index + 1}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-subtle p-4 rounded-lg border">
            <p className="text-sm font-medium mb-2">Why use Clarify?</p>
            <p className="text-xs text-muted-foreground">
              Even experts struggle with AI detection. Clarify uses advanced algorithms 
              to analyze patterns humans can't see, giving you high accuracy.
            </p>
          </div>

          <div className="flex gap-3">
            <Button onClick={resetGame} variant="outline" className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button asChild className="flex-1">
              <a href="/analyze">Analyze Your Content</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = quizQuestions[currentQuestion];
  const isCorrect = selectedAnswer === question.isReal;

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-medium">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Question {currentQuestion + 1}/5</CardTitle>
          <Badge variant="outline">Score: {score}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          <img 
            src={question.image} 
            alt={`Quiz question ${currentQuestion + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        {!showFeedback ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">
              Is this image REAL or AI-generated?
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => handleAnswer(true)}
                variant="outline"
                size="lg"
                className="h-16 text-lg"
              >
                📸 REAL
              </Button>
              <Button
                onClick={() => handleAnswer(false)}
                variant="outline"
                size="lg"
                className="h-16 text-lg"
              >
                🤖 AI FAKE
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <div className={cn(
              "p-4 rounded-lg",
              isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
            )}>
              <div className="flex items-center justify-center gap-2 mb-2">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <span className={cn(
                  "font-semibold",
                  isCorrect ? "text-green-700" : "text-red-700"
                )}>
                  {isCorrect ? "Correct!" : "Incorrect"}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                This image is {question.isReal ? "REAL" : "AI-generated"}
              </p>
            </div>
            
            <div className="bg-accent/30 p-4 rounded-lg text-left">
              <p className="text-sm font-medium mb-1">Explanation:</p>
              <p className="text-sm text-muted-foreground">{question.explanation}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizGame;