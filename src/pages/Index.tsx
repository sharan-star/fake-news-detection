
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle, FileText, Newspaper } from "lucide-react";
import ArticleAnalyzer from "@/components/ArticleAnalyzer";
import SampleArticles from "@/components/SampleArticles";
import ResultsDisplay from "@/components/ResultsDisplay";
import { AnalysisResult } from "@/types/analysis";

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Newspaper className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">FakeNews Detector</h1>
              <p className="text-gray-600">AI-powered news authenticity analysis</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input and Analysis */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>Article Analysis</span>
                </CardTitle>
                <CardDescription>
                  Paste a news article or select from samples to analyze its authenticity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="input" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="input">Input Article</TabsTrigger>
                    <TabsTrigger value="samples">Sample Articles</TabsTrigger>
                  </TabsList>
                  <TabsContent value="input" className="mt-4">
                    <ArticleAnalyzer
                      onAnalysisComplete={handleAnalysisComplete}
                      onAnalysisStart={handleAnalysisStart}
                      isAnalyzing={isAnalyzing}
                    />
                  </TabsContent>
                  <TabsContent value="samples" className="mt-4">
                    <SampleArticles
                      onAnalysisComplete={handleAnalysisComplete}
                      onAnalysisStart={handleAnalysisStart}
                      isAnalyzing={isAnalyzing}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Results and Info */}
          <div className="space-y-6">
            {/* Results */}
            <ResultsDisplay result={analysisResult} isAnalyzing={isAnalyzing} />

            {/* Info Cards */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-1 bg-green-100 rounded">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">AI Analysis</p>
                    <p className="text-xs text-gray-600">
                      Uses advanced language models to detect patterns in fake news
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-1 bg-yellow-100 rounded">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Confidence Score</p>
                    <p className="text-xs text-gray-600">
                      Provides probability-based assessment of article authenticity
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-1 bg-blue-100 rounded">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Detailed Analysis</p>
                    <p className="text-xs text-gray-600">
                      Breaks down the reasoning behind the prediction
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="text-lg text-amber-800">Disclaimer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-amber-700">
                  This tool provides AI-based predictions and should not be the sole source for 
                  determining news authenticity. Always verify information through multiple 
                  reliable sources.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
