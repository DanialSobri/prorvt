import { Button } from '@/components/custom/button';
import React from 'react';
import { Download, Globe, Zap, Building, Lock, Unlock, Star, LogIn } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
            {/* Floating Sign In Button */}
            <div className="fixed top-6 right-6 z-50">
                <Button
                    variant="outline"
                    className="group relative overflow-hidden backdrop-blur-md bg-white/5 border-white/10 text-white px-6 py-2 hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
                    onClick={() => window.location.href = '/sign-in'}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        Sign In
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 group-hover:opacity-100 opacity-0 transition-opacity" />
                    <div className="absolute inset-0 rounded-lg ring-1 ring-white/10 group-hover:ring-white/20 transition-all" />
                </Button>
            </div>

            {/* Hero Section */}
            <div className="relative py-32">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 via-transparent to-transparent backdrop-blur-sm" />
                <div className="container relative mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                        <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-200 to-blue-400 leading-tight">
                            Supercharge Your Revit Workflow
                        </h1>
                        <p className="text-2xl mb-8 text-blue-100/90 leading-relaxed">
                        Access a vast library of high-quality Revit families tailored for Malaysian architecture. Enhance your BIM workflow with our curated parametric components.
                        </p>
                        <div className="flex gap-6 justify-center">
                            <Button size="lg" 
                                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
                                onClick={() => window.location.href = '/onboarding'}
                            >
                                <Download className="mr-2" /> Download Plugin
                            </Button>
                            <Button size="lg" 
                                className="backdrop-blur-md bg-white/10 border-white/20 text-white hover:bg-white/20 transform hover:scale-105 transition-all duration-300"
                                onClick={() => {
                                    document.getElementById('features')?.scrollIntoView({ 
                                        behavior: 'smooth',
                                        block: 'start'
                                    });
                                }}
                            >
                                Learn More
                            </Button>
                        </div>
                        
                        {/* Plugin Demo GIF */}
                        <div className="mt-12 max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-white/20">
                            <img 
                                src="/images/snapshot.gif" 
                                alt="ProRVT Plugin Demo" 
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div id="features" className="py-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
                <div className="container relative mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 text-white">Why Choose Our Plugin?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Globe className="w-12 h-12 text-blue-600" />}
                            title="Regional Families"
                            description="Access families that match your local standards and specifications"
                        />
                        <FeatureCard
                            icon={<Zap className="w-12 h-12 text-blue-600" />}
                            title="Lightning Fast"
                            description="Instantly find and place the families you need in your projects"
                        />
                        <FeatureCard
                            icon={<Building className="w-12 h-12 text-blue-600" />}
                            title="Vast Library"
                            description="Thousands of high-quality families at your fingertips"
                        />
                    </div>
                </div>
            </div>

            {/* Subscription Section */}
            <div className="py-20 bg-gray-50">
                <div className="container relative flex flex-col items-center justify-center p-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Plan</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Access high-quality Revit families for architects, designers, and construction professionals
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 w-full max-w-5xl">
                        {/* Free Tier */}
                        <Card className="w-full max-w-sm bg-white shadow-lg rounded-xl overflow-hidden transform transition-all hover:scale-105">
                            <CardHeader className="bg-gray-100 pb-0">
                                <CardTitle className="flex items-center justify-between">
                                    <span className="text-2xl font-semibold text-gray-800">Free Tier</span>
                                    <Lock className="text-gray-500" size={24} />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="text-center mb-4">
                                    <span className="text-3xl font-bold text-gray-900">RM0</span>
                                    <span className="text-gray-600 block">/ month</span>
                                </div>
                                <ul className="space-y-3 mb-6 text-gray-700">
                                    <li className="flex items-center">
                                        <Download className="mr-2 text-blue-500" size={18} />
                                        Limited to 5 free Revit family downloads per day
                                    </li>
                                    <li className="flex items-center">
                                        <Lock className="mr-2 text-red-500" size={18} />
                                        Access to limited free Revit family collection
                                    </li>
                                    <li className="flex items-center">
                                        <Star className="mr-2 text-yellow-500" size={18} />
                                        Basic support
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button variant="default" className="w-full" onClick={() => window.location.href = '/sign-up'}>
                                    Start with Free Tier
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Premium Tier */}
                        <Card className="w-full max-w-sm bg-white shadow-lg rounded-xl overflow-hidden transform transition-all hover:scale-105 border-2 border-blue-500">
                            <CardHeader className="bg-blue-50 pb-0">
                                <CardTitle className="flex items-center justify-between">
                                    <span className="text-2xl font-semibold text-blue-800">Premium Tier</span>
                                    <Unlock className="text-blue-600" size={24} />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="text-center mb-4">
                                    <span className="text-3xl font-bold text-blue-900">RM29.99</span>
                                    <span className="text-gray-600 block">/ month</span>
                                </div>
                                <ul className="space-y-3 mb-6 text-gray-700">
                                    <li className="flex items-center">
                                        <Unlock className="mr-2 text-green-500" size={18} />
                                        Unlimited Revit family downloads
                                    </li>
                                    <li className="flex items-center">
                                        <Star className="mr-2 text-yellow-500" size={18} />
                                        Full access to premium Revit family collection
                                    </li>
                                    <li className="flex items-center">
                                        <Download className="mr-2 text-blue-500" size={18} />
                                        Early access to new Revit families
                                    </li>
                                    <li className="flex items-center">
                                        <Star className="mr-2 text-yellow-500" size={18} />
                                        Priority customer support
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button variant="default" className="w-full">
                                    Start with Premium Tier
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    <div className="mt-8 text-center text-gray-600 max-w-2xl mx-auto">
                        <p>
                            Need a custom solution for your business? 
                            <a href="https://www.linkedin.com/company/projectrvt" className="text-blue-600 font-semibold ml-1 hover:underline">
                                Contact our sales team
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 backdrop-blur-md" />
                <div className="container relative mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-6 text-white">Ready to Transform Your Revit Experience?</h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Join thousands of architects who are already using our plugin
                    </p>
                    <Button size="lg" 
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
                        onClick={() => window.location.href = '/onboarding'}
                    >
                        <Download className="mr-2" /> Get Started
                    </Button>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="bg-slate-900 text-white py-16 border-t border-white/10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">ProRVT</h3>
                            <p className="text-gray-400">Transforming architectural design with regional Revit families.</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Connect</h4>
                            <div className="flex space-x-4">
                                <a href="https://www.linkedin.com/company/projectrvt" 
                                   target="_blank" 
                                   rel="noopener noreferrer" 
                                   className="text-gray-400 hover:text-blue-400 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                    </svg>
                                </a>
                                {/* Remove or update other social media icons as needed */}
                            </div>
                        </div>
                    </div>

                </div>
            </footer>
        </div>
    );
};

const FeatureCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
}> = ({ icon, title, description }) => (
    <div className="group backdrop-blur-lg bg-white/10 p-8 rounded-2xl border border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
        <div className="mb-6 flex justify-center">{icon}</div>
        <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-cyan-400 transition-colors">{title}</h3>
        <p className="text-blue-100/75">{description}</p>
    </div>
);


export default HomePage;
