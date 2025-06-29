import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnalysisResult, SampleArticle } from "@/types/analysis";
import { analyzeFakeNews } from "@/utils/fakeNewsDetector";

interface SampleArticlesProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  onAnalysisStart: () => void;
  isAnalyzing: boolean;
}

const sampleArticles: SampleArticle[] = [
  {
    id: "1",
    title: "Scientists Announce Breakthrough in Renewable Energy Storage",
    content: "Researchers at MIT have developed a new battery technology that could revolutionize renewable energy storage. The lithium-metal battery demonstrates unprecedented energy density and charging speed. The research team, led by Dr. Sarah Johnson, published their findings in Nature Energy journal. The technology uses a novel solid electrolyte that prevents dendrite formation, a major challenge in lithium-metal batteries. Initial tests show the battery can charge to 80% capacity in just 10 minutes while maintaining stability over 10,000 charge cycles. The research was funded by the Department of Energy and several private investors. Commercial applications could begin within 5-7 years pending further testing and regulatory approval.",
    source: "BBC News",
    category: "Technology",
    expectedResult: "REAL"
  },
  {
    id: "2",
    title: "SHOCKING: Aliens Land in Central Park, Government Covers Up Truth",
    content: "BREAKING NEWS: Multiple witnesses report seeing UFO landing in Central Park last night!!! Government agents immediately cordoned off the area and are refusing to comment. Sources close to the White House say President is in emergency meetings with military officials. The aliens allegedly made contact with several joggers before disappearing into thin air. This reporter has exclusive photos that THEY don't want you to see! Wake up people - the truth is finally coming out! Share this before it gets deleted! The mainstream media won't report this because they're all controlled by the deep state. Several Hollywood celebrities have already tweeted their support for disclosure. This is the moment we've all been waiting for!!!",
    source: "Alternative Truth Network",
    category: "Conspiracy",
    expectedResult: "FAKE"
  },
  {
    id: "3",
    title: "Federal Reserve Announces Interest Rate Decision",
    content: "The Federal Reserve announced today that it will maintain the federal funds rate at its current level of 5.25-5.50%. Fed Chair Jerome Powell stated during the press conference that the decision reflects the committee's assessment of current economic conditions and inflation trends. Recent economic data shows inflation has decreased to 3.2% year-over-year, down from the previous month's 3.4%. The unemployment rate remains steady at 3.8%. Powell emphasized the Fed's commitment to bringing inflation back to the 2% target while maintaining employment stability. The next Federal Open Market Committee meeting is scheduled for December 12-13. Financial markets responded positively to the announcement, with major indices closing up 0.8%.",
    source: "Reuters",
    category: "Economics",
    expectedResult: "REAL"
  },
  {
    id: "4",
    title: "Miracle Cure: Doctors Hate This One Simple Trick That Cures Everything",
    content: "Local mom discovers amazing secret that Big Pharma doesn't want you to know! Susan from Ohio used this ONE WEIRD TRICK to cure her diabetes, arthritis, and depression in just 7 days! Doctors are furious because this simple method is putting them out of business. The secret ingredient that you probably have in your kitchen right now can cure over 200 diseases including cancer! Click here to discover what it is before the government bans this information! Limited time offer - this video will be taken down soon. Thousands of people have already been cured using this method. Don't let the medical establishment keep you sick for profit. Act now before it's too late! WARNING: This may shock you!",
    source: "Natural Health Secrets",
    category: "Health",
    expectedResult: "FAKE"
  },
  {
    id: "5",
    title: "Climate Summit Reaches Historic Agreement on Carbon Emissions",
    content: "World leaders at the COP29 climate summit in Dubai have reached a landmark agreement to transition away from fossil fuels. The agreement, signed by 195 countries, establishes binding targets for carbon reduction and renewable energy adoption. UN Secretary-General António Guterres called it 'a turning point in the fight against climate change.' The deal includes $100 billion in funding for developing nations to transition to clean energy. Key provisions include a 43% reduction in global emissions by 2030 and net-zero emissions by 2050. Environmental groups have praised the agreement while acknowledging the challenges ahead. Implementation will be monitored through annual review processes.",
    source: "The Guardian",
    category: "Environment",
    expectedResult: "REAL"
  },
  {
    id: "6",
    title: "New Study Reveals Coffee Prevents All Diseases and Makes You Immortal",
    content: "SCIENTISTS STUNNED! Drinking 10 cups of coffee daily makes you IMMORTAL according to new study! This SHOCKING discovery has medical professionals worldwide in an uproar. The study, conducted by the Institute of Coffee Research (definitely a real place), found that coffee drinkers live FOREVER and never get sick. Big Pharma is trying to suppress this information because it would put them out of business! The secret is in the magical antioxidants that literally repair your DNA and reverse aging. One participant, aged 150, credits his longevity to drinking coffee non-stop since 1850. DOCTORS HATE HIM! The government is planning to ban coffee to keep you sick and dependent on expensive medical treatments. Stock up now before it's too late!",
    source: "Daily Health Hoax",
    category: "Health",
    expectedResult: "FAKE"
  },
  {
    id: "7",
    title: "Tech Giants Report Strong Q3 Earnings Despite Market Volatility",
    content: "Major technology companies reported better-than-expected third-quarter earnings, with Apple, Microsoft, and Google parent Alphabet all beating revenue forecasts. Apple reported revenue of $89.5 billion, up 2% year-over-year, driven by strong iPhone 15 sales. Microsoft's cloud computing division Azure saw 29% growth, contributing to total revenue of $56.5 billion. Alphabet reported $76.7 billion in revenue, with YouTube advertising revenue reaching $7.95 billion. The strong earnings come despite concerns about economic headwinds and increased competition in the AI space. Analysts note that these companies' diversified revenue streams have helped them weather market uncertainty. Stock prices rose in after-hours trading following the announcements.",
    source: "The Wall Street Journal",
    category: "Business",
    expectedResult: "REAL"
  },
  {
    id: "8",
    title: "BREAKING: World's Governments Secretly Controlled by Lizard People, Whistleblower Reveals All",
    content: "EXPLOSIVE EVIDENCE REVEALED! Former government insider exposes the TRUTH about our reptilian overlords! For centuries, shape-shifting lizard people have secretly controlled all world governments from underground bunkers. The whistleblower, who we can't name for obvious reasons, provided UNDENIABLE PROOF including blurry photos and anonymous testimonies. These reptilians feed on human fear and manipulate global events through their puppet politicians. The evidence is overwhelming - just look at how politicians never blink during speeches! They're hiding their reptilian eyes! The mainstream media won't report this because they're all reptilians too! Wake up sheeple! The time for disclosure is NOW! Share this before the lizard people delete it from the internet forever!",
    source: "Truth Patriots Daily",
    category: "Conspiracy",
    expectedResult: "FAKE"
  }
];

const SampleArticles = ({ onAnalysisComplete, onAnalysisStart, isAnalyzing }: SampleArticlesProps) => {
  const { toast } = useToast();

  const handleAnalyzeSample = async (article: SampleArticle) => {
    onAnalysisStart();

    try {
      const fullText = `${article.title} ${article.content}`;
      const result = await analyzeFakeNews(fullText);
      onAnalysisComplete(result);
      
      toast({
        title: "Sample Analysis Complete",
        description: `Expected: ${article.expectedResult}, Predicted: ${result.prediction}`,
      });
    } catch (error) {
      console.error('Sample analysis failed:', error);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze the sample article. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Test the detector with these sample articles from different news sources:
      </p>
      
      <div className="grid gap-4">
        {sampleArticles.map((article) => (
          <Card key={article.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base leading-tight">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {article.source} • {article.category}
                  </CardDescription>
                </div>
                <Badge 
                  variant={article.expectedResult === 'REAL' ? 'default' : 'destructive'}
                  className="ml-2"
                >
                  {article.expectedResult}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                {article.content.substring(0, 150)}...
              </p>
              <Button
                size="sm"
                onClick={() => handleAnalyzeSample(article)}
                disabled={isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-3 w-3" />
                    Analyze This Sample
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SampleArticles;
