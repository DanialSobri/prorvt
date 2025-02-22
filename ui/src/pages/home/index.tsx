import { Button } from '@/components/custom/button';
import React from 'react';
import { Download, Globe, Zap, Building, Users, Clock, Lock, Unlock, Star, LogIn } from 'lucide-react';
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
                            Supercharge Your Revit Workflow with Regional Families
                        </h1>
                        <p className="text-2xl mb-8 text-blue-100/90 leading-relaxed">
                            Access thousands of locally-relevant Revit families and transform your architectural design process
                        </p>
                        <div className="flex gap-6 justify-center">
                            <Button size="lg" 
                                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50">
                                <Download className="mr-2" /> Download Plugin
                            </Button>
                            <Button size="lg" 
                                className="backdrop-blur-md bg-white/10 border-white/20 text-white hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-32 relative overflow-hidden">
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

            {/* Benefits Section */}
            <div className="relative py-32 bg-white overflow-hidden">
                <div className="container mx-auto px-4 relative">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 bg-clip-text">
                            Transform Your Workflow
                        </h2>
                        <div className="space-y-8">
                            <BenefitCard
                                icon={<Clock className="w-8 h-8 text-blue-500" />}
                                title="Save 70% of Your Time"
                                description="Stop creating families from scratch - use our pre-built library"
                            />
                            <BenefitCard
                                icon={<Users className="w-8 h-8 text-cyan-500" />}
                                title="Team Collaboration"
                                description="Share consistent families across your entire organization"
                            />
                        </div>
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
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50">
                        <Download className="mr-2" /> Download Now
                    </Button>
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
                            <a href="/contact" className="text-blue-600 font-semibold ml-1 hover:underline">
                                Contact our sales team
                            </a>
                        </p>
                    </div>
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
                                <a href="#" className="text-gray-400 hover:text-blue-400">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-blue-400">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                </a>
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

const BenefitCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
}> = ({ icon, title, description }) => (
    <div className="flex items-start space-x-6 bg-white p-8 rounded-xl border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
            {icon}
        </div>
        <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>
);

export default HomePage;
