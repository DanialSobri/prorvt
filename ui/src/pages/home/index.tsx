import { Button } from '@/components/custom/button';
import React, { useState } from 'react';
import { Download, Globe, Zap, Building, Lock, Star, LogIn, CheckCircle, Rocket, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://brezelbits.xyz');

const HomePage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [daysUntilLaunch, setDaysUntilLaunch] = useState(0);

    // Calculate days until November 1st
    React.useEffect(() => {
        const calculateDaysUntilLaunch = () => {
            const today = new Date();
            const currentYear = today.getFullYear();
            const launchDate = new Date(currentYear, 10, 1); // November 1st (month is 0-indexed)
            
            // If November 1st has passed this year, set it for next year
            if (today > launchDate) {
                launchDate.setFullYear(currentYear + 1);
            }
            
            const timeDiff = launchDate.getTime() - today.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            setDaysUntilLaunch(daysDiff);
        };

        calculateDaysUntilLaunch();
        // Update every hour to keep it accurate
        const interval = setInterval(calculateDaysUntilLaunch, 3600000);
        
        return () => clearInterval(interval);
    }, []);

    const handleWaitingListSignup = async (emailValue: string) => {
        if (!emailValue || !emailValue.includes('@')) {
            setMessage('Please enter a valid email address');
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            const data = {
                "email": emailValue
            };

            await pb.collection('waitinglist').create(data);
            setShowSuccessModal(true);
            setEmail('');
        } catch (error) {
            console.error('Error signing up for waiting list:', error);
            setMessage('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
            {/* Logo */}
            <div className="fixed top-6 left-6 z-50">
                <a 
                    href="https://projectrvt.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block hover:opacity-80 transition-opacity duration-300"
                >
                    <img 
                        src="/images/logo.png" 
                        alt="ProRVT Logo" 
                        className="h-12 w-auto filter dark:invert-0"
                    />
                </a>
            </div>

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

            {/* Hero Section - Waiting List */}
            <div className="relative pt-20 pb-12 md:py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Release Date Badge */}
                        <div className="inline-flex items-center px-3 py-2 md:px-4 md:py-2 bg-blue-100 text-blue-800 rounded-full text-xs md:text-sm font-medium mb-6 md:mb-8">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></div>
                            Coming Early November 🎉
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-gray-900 leading-tight px-2">
                            Join the ProRVT Waiting List
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-gray-600 leading-relaxed max-w-3xl mx-auto px-4">
                            Be the first to access our revolutionary Revit plugin with Malaysian-compliant families. 
                            Get early access and exclusive launch pricing.
                        </p>

                        {/* Email Signup Form */}
                        <div className="max-w-md mx-auto mb-6 md:mb-8 px-4">
                            <div className="flex flex-col gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 md:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 text-base"
                                />
                                <Button 
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 md:py-4 font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 text-base"
                                    onClick={() => handleWaitingListSignup(email)}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Joining...' : 'Join Waiting List'}
                            </Button>
                            </div>
                            {message && (
                                <p className={`text-sm mt-3 ${message.includes('Thank you') ? 'text-green-600' : 'text-red-600'}`}>
                                    {message}
                                </p>
                            )}
                            <p className="text-xs md:text-sm text-gray-500 mt-3">
                                No spam, unsubscribe anytime. We'll only email you about the launch.
                            </p>
                        </div>

                        {/* Benefits for Early Adopters */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 px-4">
                            <div className="bg-blue-50 p-4 md:p-6 rounded-xl">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                                    <Star className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Early Access</h3>
                                <p className="text-xs md:text-sm text-gray-600">Get 2 weeks early access before public launch</p>
                            </div>
                            <div className="bg-green-50 p-4 md:p-6 rounded-xl">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                                    <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Launch Discount</h3>
                                <p className="text-xs md:text-sm text-gray-600">50% off for the first 3 months</p>
                            </div>
                            <div className="bg-purple-50 p-4 md:p-6 rounded-xl sm:col-span-2 lg:col-span-1">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                                    <Building className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Priority Support</h3>
                                <p className="text-xs md:text-sm text-gray-600">Direct access to our development team</p>
                            </div>
                        </div>
                        
                        {/* Demo Video Preview */}
                        <div className="max-w-3xl mx-auto px-4">
                            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                                <div className="bg-gray-100 h-6 md:h-8 flex items-center px-3 md:px-4">
                                    <div className="flex space-x-1 md:space-x-2">
                                        <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></div>
                                        <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full"></div>
                                        <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full"></div>
                                    </div>
                                    <div className="ml-2 md:ml-4 text-xs md:text-sm text-gray-600">ProRVT Plugin Preview</div>
                                </div>
                                <video 
                                    src="/images/demo.mp4" 
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    webkit-playsinline="true"
                                className="w-full h-auto"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Waiting List Stats */}
            <div className="py-12 md:py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 px-4">
                            Join to be the first 500 architects for limited waiting list
                        </h2>
                        <p className="text-sm md:text-base text-gray-600 px-4">
                            Be part of the exclusive group of early adopters to experience ProRVT
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">500</div>
                            <div className="text-sm md:text-base text-gray-600">Limited Spots</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">500+</div>
                            <div className="text-sm md:text-base text-gray-600">Families</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-2">{daysUntilLaunch}</div>
                            <div className="text-sm md:text-base text-gray-600">Days Until Launch</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming Features Preview */}
            <div id="features" className="py-12 md:py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12 md:mb-16">
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900 px-4">
                                What's Coming in ProRVT?
                            </h2>
                            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                                Get a preview of the revolutionary features that will transform your Revit workflow. 
                                These are the capabilities you'll have access to when ProRVT launches.
                        </p>
                    </div>

                        {/* Feature Preview Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-6 rounded-xl border border-blue-200">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                                    <Building className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Malaysian Architecture Library</h3>
                                <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">500+ families designed specifically for Malaysian building standards and architectural styles.</p>
                                <div className="text-xs text-blue-600 font-medium">Launch Feature</div>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 md:p-6 rounded-xl border border-green-200">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-600 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                                    <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Smart Search & Filter</h3>
                                <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">AI-powered search to find the perfect families in seconds, not minutes.</p>
                                <div className="text-xs text-green-600 font-medium">Launch Feature</div>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 md:p-6 rounded-xl border border-purple-200">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                                    <Download className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">One-Click Installation</h3>
                                <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">Seamless integration with Revit. No complex setup or configuration required.</p>
                                <div className="text-xs text-purple-600 font-medium">Launch Feature</div>
                            </div>

                            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 md:p-6 rounded-xl border border-yellow-200">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                                    <Star className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Quality Assurance</h3>
                                <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">Every family tested and verified for accuracy, performance, and compliance.</p>
                                <div className="text-xs text-yellow-600 font-medium">Launch Feature</div>
                            </div>

                            <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 md:p-6 rounded-xl border border-red-200">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                                    <Globe className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Regional Compliance</h3>
                                <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">Built to meet Malaysian building codes, standards, and local requirements.</p>
                                <div className="text-xs text-red-600 font-medium">Launch Feature</div>
                            </div>

                            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 md:p-6 rounded-xl border border-indigo-200">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                                    <Lock className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Regular Updates</h3>
                                <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">Monthly updates with new families, features, and improvements.</p>
                                <div className="text-xs text-indigo-600 font-medium">Ongoing</div>
                            </div>
                        </div>

                        {/* Launch Timeline */}
                        <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm">
                            <div className="text-center mb-8">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Launch Timeline</h3>
                                <p className="text-sm md:text-base text-gray-600">Our journey to revolutionize Revit workflows</p>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-600">Progress</span>
                                    <span className="text-sm font-medium text-blue-600">25% Complete</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div className="bg-blue-600 h-3 rounded-full transition-all duration-1000" style={{width: '25%'}}></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Phase 1 - Beta Testing */}
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Beta Testing</h4>
                                    <p className="text-sm text-gray-600 mb-2">Selected members get early access</p>
                                    <div className="text-xs text-blue-600 font-medium">Currently Active</div>
                                </div>

                                {/* Phase 2 - Soft Launch */}
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Rocket className="w-6 h-6 text-gray-500" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Soft Launch</h4>
                                    <p className="text-sm text-gray-600 mb-2">Waiting list members get access</p>
                                    <div className="text-xs text-gray-500 font-medium">End of October</div>
                    </div>

                                {/* Phase 3 - Public Launch */}
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <CheckCircle className="w-6 h-6 text-gray-500" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Public Launch</h4>
                                    <p className="text-sm text-gray-600 mb-2">Available to everyone</p>
                                    <div className="text-xs text-gray-500 font-medium">Early November</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* CTA Section */}
            <div className="py-12 md:py-20 bg-blue-600">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white px-4">
                        Don't Miss Out on Early Access
                    </h2>
                    <p className="text-base md:text-xl mb-6 md:mb-8 text-blue-100 max-w-2xl mx-auto px-4">
                        Join 500+ architects on our waiting list. Get exclusive early access and launch pricing when ProRVT launches at the end of October.
                    </p>
                    <div className="max-w-md mx-auto px-4">
                        <div className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 md:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 text-base"
                            />
                            <Button 
                                className="w-full bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 md:py-4 font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 text-base"
                                onClick={() => handleWaitingListSignup(email)}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Joining...' : 'Join Now'}
                    </Button>
                        </div>
                        {message && (
                            <p className={`text-sm mt-3 ${message.includes('Thank you') ? 'text-green-200' : 'text-red-200'}`}>
                                {message}
                            </p>
                        )}
                        <p className="text-xs md:text-sm text-blue-100 mt-3">
                            Free to join • No spam • Unsubscribe anytime
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="bg-gray-900 text-white py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
                        <div className="md:col-span-2">
                            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">ProRVT</h3>
                            <p className="text-gray-400 mb-4 md:mb-6 max-w-md text-sm md:text-base">
                                Transforming architectural design with regional Revit families. 
                                Create professional BIM models faster with our Malaysian-compliant component library.
                            </p>
                            <div className="flex space-x-4">
                                <a href="https://www.linkedin.com/company/projectrvt" 
                                   target="_blank" 
                                   rel="noopener noreferrer" 
                                   className="text-gray-400 hover:text-blue-400 transition-colors">
                                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Product</h4>
                            <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Download</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                                <li><a href="https://projectrvt.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400 text-sm md:text-base">
                        <p>&copy; 2024 ProRVT. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Success Modal */}
            <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <DialogContent className="sm:max-w-md rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl font-bold text-gray-900 mb-4">
                            🎉 Welcome to ProRVT! 🎉
                        </DialogTitle>
                    </DialogHeader>
                    <div className="text-center py-6">
                        <div className="text-6xl mb-4">🎊</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            Thank You for Joining Our Waiting List!
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            You're now part of an exclusive group of architects who will get early access to ProRVT. 
                            We'll notify you as soon as we launch at the end of October 2025!
                        </p>
                        <div className="space-y-3">
                            <Button 
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl"
                                onClick={() => {
                                    setShowSuccessModal(false);
                                    // Scroll to demo video
                                    document.getElementById('features')?.scrollIntoView({ 
                                        behavior: 'smooth',
                                        block: 'start'
                                    });
                                }}
                            >
                                Discover our features
                            </Button>
                            <Button 
                                variant="outline"
                                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-xl"
                                onClick={() => setShowSuccessModal(false)}
                            >
                                Close
                            </Button>
                        </div>
                        <div className="mt-6 text-sm text-gray-500">
                            <p>✨ You'll receive exclusive updates and early access perks!</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default HomePage;
