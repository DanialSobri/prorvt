import { Button } from '@/components/custom/button';
import React, { useState } from 'react';
import { Zap, Building, Star, LogIn } from 'lucide-react';
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

            {/* Navigation */}
            <div className="fixed top-6 right-6 z-50 flex items-center space-x-4">
                {/* <a 
                    href="/portfolio" 
                    className="text-white hover:text-gray-300 transition-colors px-4 py-2"
                >
                    Portfolio
                </a> */}
                <Button
                    variant="outline"
                    className="group relative overflow-hidden backdrop-blur-md bg-white/80 border-gray-300 text-gray-900 px-6 py-2 hover:bg-gray-50 hover:border-gray-400 transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md"
                    onClick={() => window.location.href = '/sign-in'}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        Sign In
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 group-hover:opacity-100 opacity-0 transition-opacity" />
                    <div className="absolute inset-0 rounded-lg ring-1 ring-gray-200 group-hover:ring-gray-300 transition-all" />
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

            {/* Features Bento Grid */}
            <div id="features" className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12 md:mb-16">
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900 px-4">
                                What's Coming in ProRVT?
                            </h2>
                            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                                Get a preview of the revolutionary features that will transform your Revit workflow. 
                                These are the capabilities you'll have access to when ProRVT launches.
                        </p>
                    </div>

                        {/* Bento Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-auto md:grid-rows-2 gap-4 md:gap-6 max-w-6xl mx-auto mb-12 md:mb-16 max-h-[90vh]">
                            {/* Smart Search Card - spans 2 columns */}
                            <div className="col-span-1 md:col-span-2 row-span-1 bg-white rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden min-h-[300px] md:min-h-[35vh] flex flex-col transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl border border-gray-100">
                                <div className="relative z-10">
                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3 tracking-tight">
                                        Find families.<br />
                                        <span className="text-green-500">Instantly.</span>
                                    </h3>
                                    <p className="text-sm md:text-base lg:text-lg text-gray-500 leading-relaxed mb-6 max-w-lg">
                                        AI-powered search that works at the speed of thought.
                                    </p>
                                </div>
                                <div className="flex-1 flex items-center justify-center relative mt-6 z-0">
                                    <div className="relative w-40 h-40 md:w-48 md:h-48">
                                        {/* Background glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
                                        
                                        {/* Main lightning bolt */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="relative">
                                                <div className="text-6xl md:text-7xl text-green-500 animate-pulse filter drop-shadow-2xl">
                                                    ⚡
                                                </div>
                                                {/* Lightning glow effect */}
                                                <div className="absolute inset-0 text-6xl md:text-7xl text-green-400 animate-pulse blur-sm opacity-50">
                                                    ⚡
                                                </div>
                                            </div>
                            </div>

                                        {/* Enhanced particles */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="absolute w-2 h-2 bg-green-500 rounded-full animate-bounce shadow-xl" style={{top: '12%', left: '8%', animationDelay: '0s'}}></div>
                                            <div className="absolute w-2 h-2 bg-green-400 rounded-full animate-bounce shadow-xl" style={{top: '8%', right: '12%', animationDelay: '0.5s'}}></div>
                                            <div className="absolute w-2 h-2 bg-emerald-500 rounded-full animate-bounce shadow-xl" style={{bottom: '12%', left: '4%', animationDelay: '1s'}}></div>
                                            <div className="absolute w-2 h-2 bg-emerald-400 rounded-full animate-bounce shadow-xl" style={{bottom: '8%', right: '8%', animationDelay: '1.5s'}}></div>
                                            
                                            {/* Additional sparkle effects */}
                                            <div className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{top: '20%', left: '20%', animationDelay: '0.3s'}}></div>
                                            <div className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-ping" style={{bottom: '20%', right: '20%', animationDelay: '0.8s'}}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-6">
                                    <div className="w-3 h-3 bg-gray-300 rounded-full transition-all duration-300 hover:bg-green-500 hover:scale-125"></div>
                                    <div className="w-3 h-3 bg-gray-300 rounded-full transition-all duration-300 hover:bg-green-500 hover:scale-125"></div>
                                    <div className="w-3 h-3 bg-gray-300 rounded-full transition-all duration-300 hover:bg-green-500 hover:scale-125"></div>
                                </div>
                            </div>

                            {/* Library Card - tall, spans 2 rows */}
                            <div className="col-span-1 md:col-span-1 md:row-span-2 bg-white rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden min-h-[300px] md:min-h-[35vh] flex flex-col transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl border border-gray-100">
                                <div className="relative z-10">
                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3 tracking-tight">
                                        Built for<br />
                                        <span className="text-blue-500">Malaysia.</span>
                                    </h3>
                                    <p className="text-sm md:text-base lg:text-lg text-gray-500 leading-relaxed mb-6">
                                        500+ families designed for local standards.
                                    </p>
                                </div>
                                <div className="flex-1 flex items-center justify-center relative mt-6 z-0">
                                    <div className="flex gap-4 items-end">
                                        {/* Building 1 - Tallest */}
                                        <div className="w-16 h-24 md:w-20 md:h-28 bg-gradient-to-t from-blue-700 via-blue-600 to-blue-500 rounded-2xl relative shadow-2xl animate-pulse">
                                            {/* Building number */}
                                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-3xl md:text-4xl font-bold text-blue-500 drop-shadow-lg z-5">
                                                500+
                                            </div>
                                            
                                            {/* Windows grid */}
                                            <div className="grid grid-cols-3 gap-1 p-2">
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                            </div>
                                            
                                            {/* Building top accent */}
                                            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-blue-400 rounded-full"></div>
                                        </div>
                                        
                                        {/* Building 2 - Medium */}
                                        <div className="w-16 h-28 md:w-20 md:h-32 bg-gradient-to-t from-blue-600 via-blue-500 to-blue-400 rounded-2xl relative shadow-2xl animate-pulse" style={{animationDelay: '0.2s'}}>
                                            {/* Windows grid */}
                                            <div className="grid grid-cols-3 gap-1 p-2">
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                            </div>
                                            
                                            {/* Building top accent */}
                                            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-blue-300 rounded-full"></div>
                                        </div>
                                        
                                        {/* Building 3 - Shortest - Half Visible */}
                                        <div className="w-16 h-26 md:w-20 md:h-30 bg-gradient-to-t from-blue-500 via-blue-400 to-blue-300 rounded-2xl relative shadow-2xl animate-pulse" style={{animationDelay: '0.4s', clipPath: 'inset(0 50% 0 0)'}}>
                                            {/* Windows grid */}
                                            <div className="grid grid-cols-3 gap-1 p-2">
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                                <div className="w-full aspect-square bg-white/50 rounded-lg shadow-sm"></div>
                                            </div>
                                            
                                            {/* Building top accent */}
                                            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-blue-200 rounded-full"></div>
                                        </div>
                            </div>

                                    {/* Background cityscape effect */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-100/30 to-transparent rounded-2xl pointer-events-none"></div>
                                </div>
                                <div className="flex gap-2 mt-6">
                                    <div className="w-3 h-3 bg-gray-300 rounded-full transition-all duration-300 hover:bg-green-500 hover:scale-125"></div>
                                    <div className="w-3 h-3 bg-gray-300 rounded-full transition-all duration-300 hover:bg-green-500 hover:scale-125"></div>
                                    <div className="w-3 h-3 bg-gray-300 rounded-full transition-all duration-300 hover:bg-green-500 hover:scale-125"></div>
                                </div>
                            </div>

                            {/* Customize Collection Card */}
                            <div className="col-span-1 md:col-span-1 row-span-1 bg-white rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden min-h-[300px] md:min-h-[35vh] flex flex-col transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl border border-gray-100">
                                <div className="relative z-10">
                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3 tracking-tight">
                                        Your library.<br />
                                        <span className="text-orange-500">Your way.</span>
                                    </h3>
                                    <p className="text-sm md:text-base lg:text-lg text-gray-500 leading-relaxed mb-6">
                                        Organize and customize collections that fit your workflow.
                                    </p>
                                </div>
                                <div className="flex-1 flex items-center justify-center relative mt-6 z-0">
                                    <div className="relative w-40 h-40 md:w-48 md:h-48">
                                        {/* Background glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-full blur-3xl animate-pulse"></div>
                                        
                                        {/* Folder stack container */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {/* Folder 1 - Bottom (Back) */}
                                            <div className="absolute w-20 h-16 md:w-24 md:h-18 lg:w-28 lg:h-20 bg-gradient-to-br from-orange-700 via-orange-600 to-orange-500 rounded-xl relative shadow-xl transform -rotate-3 transition-all duration-500 hover:rotate-0 hover:scale-110 hover:z-30" style={{left: '0px', top: '12px', zIndex: 1}}>
                                                {/* Folder tab */}
                                                <div className="absolute -top-2 left-0 w-8 md:w-10 lg:w-12 h-4 bg-gradient-to-br from-orange-700 to-orange-600 rounded-t-lg"></div>
                                                {/* Folder content area */}
                                                <div className="absolute top-1 left-1 right-1 bottom-1 bg-gradient-to-br from-orange-600/30 to-orange-500/30 rounded-lg"></div>
                                                {/* Folder icon */}
                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl md:text-2xl lg:text-3xl opacity-40">
                                                    📁
                                                </div>
                                                {/* Highlight */}
                                                <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full blur-sm"></div>
                                            </div>
                                            
                                            {/* Folder 2 - Middle */}
                                            <div className="absolute w-20 h-16 md:w-24 md:h-18 lg:w-28 lg:h-20 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400 rounded-xl relative shadow-xl transform -rotate-1 transition-all duration-500 hover:rotate-0 hover:scale-110 hover:z-30" style={{left: '0px', top: '4px', zIndex: 2}}>
                                                {/* Folder tab */}
                                                <div className="absolute -top-2 left-0 w-8 md:w-10 lg:w-12 h-4 bg-gradient-to-br from-orange-600 to-orange-500 rounded-t-lg"></div>
                                                {/* Folder content area */}
                                                <div className="absolute top-1 left-1 right-1 bottom-1 bg-gradient-to-br from-orange-500/30 to-orange-400/30 rounded-lg"></div>
                                                {/* Folder icon */}
                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl md:text-2xl lg:text-3xl opacity-40">
                                                    📁
                                                </div>
                                                {/* Highlight */}
                                                <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full blur-sm"></div>
                                            </div>
                                        </div>
                                        
                                        {/* Additional floating elements */}
                                        <div className="absolute inset-0 pointer-events-none">
                                            <div className="absolute top-4 right-4 w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
                                            <div className="absolute bottom-6 left-6 w-0.5 h-0.5 bg-amber-300 rounded-full animate-ping" style={{animationDelay: '0.3s'}}></div>
                                            <div className="absolute top-8 left-4 w-0.5 h-0.5 bg-orange-300 rounded-full animate-ping" style={{animationDelay: '0.6s'}}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-6">
                                    <div className="w-5 h-5 bg-gray-300 rounded-full transition-all duration-300 hover:bg-green-500 hover:scale-125"></div>
                                    <div className="w-5 h-5 bg-gray-300 rounded-full transition-all duration-300 hover:bg-green-500 hover:scale-125"></div>
                                    <div className="w-5 h-5 bg-gray-300 rounded-full transition-all duration-300 hover:bg-green-500 hover:scale-125"></div>
                                </div>
                            </div>

                            {/* Updates Card */}
                            <div className="col-span-1 md:col-span-1 row-span-1 bg-white rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden min-h-[300px] md:min-h-[35vh] flex flex-col transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl border border-gray-100">
                                <div className="relative z-10">
                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3 tracking-tight">
                                        Always<br />
                                        <span className="text-purple-500">evolving.</span>
                                    </h3>
                                    <p className="text-sm md:text-base lg:text-lg text-gray-500 leading-relaxed mb-6">
                                        Monthly updates keep you ahead.
                                    </p>
                                </div>
                                <div className="flex-1 flex items-center justify-center relative mt-6 z-0">
                                    <div className="relative w-40 h-40 md:w-48 md:h-48">
                                        {/* Background glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-violet-400/20 rounded-full blur-3xl animate-pulse"></div>
                                        
                                        {/* Main evolution graphic */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {/* Central hub */}
                                            <div className="relative w-20 h-20 md:w-24 md:h-24">
                                                {/* Central circle */}
                                                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center relative">
                                                    
                                                    {/* Rotating ring */}
                                                    <div className="absolute inset-0 border-2 border-purple-300 rounded-full animate-spin" style={{animationDuration: '4s'}}></div>
                                                    <div className="absolute inset-1 border-1 border-purple-200 rounded-full animate-spin" style={{animationDuration: '3s', animationDirection: 'reverse'}}></div>
                                                </div>
                                                
                                                {/* Orbiting elements */}
                                                <div className="absolute inset-0 animate-spin" style={{animationDuration: '6s'}}>
                                                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-purple-400 rounded-full shadow-lg"></div>
                                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-300 rounded-full shadow-lg"></div>
                                                    <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full shadow-lg"></div>
                                                    <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-2 h-2 bg-purple-300 rounded-full shadow-lg"></div>
                                                </div>
                                                
                                                {/* Counter-rotating elements */}
                                                <div className="absolute inset-0 animate-spin" style={{animationDuration: '8s', animationDirection: 'reverse'}}>
                                                    <div className="absolute top-1 left-1 w-1 h-1 bg-violet-400 rounded-full"></div>
                                                    <div className="absolute bottom-1 right-1 w-1 h-1 bg-violet-400 rounded-full"></div>
                                                    <div className="absolute top-1 right-1 w-0.5 h-0.5 bg-violet-300 rounded-full"></div>
                                                    <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-violet-300 rounded-full"></div>
                                                </div>
                                            </div>
                                            
                                            {/* Outer evolution indicators */}
                                            <div className="absolute inset-0 animate-pulse">
                                                <div className="absolute top-4 left-4 w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
                                                <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                                                <div className="absolute bottom-4 left-6 w-1 h-1 bg-purple-300 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                                                <div className="absolute bottom-6 right-4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
                                            </div>
                                        </div>
                                        
                                        {/* Floating particles */}
                                        <div className="absolute inset-0 pointer-events-none">
                                            <div className="absolute top-2 left-2 w-0.5 h-0.5 bg-purple-300 rounded-full animate-ping"></div>
                                            <div className="absolute top-3 right-3 w-0.5 h-0.5 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '0.3s'}}></div>
                                            <div className="absolute bottom-2 left-3 w-0.5 h-0.5 bg-purple-300 rounded-full animate-ping" style={{animationDelay: '0.6s'}}></div>
                                            <div className="absolute bottom-3 right-2 w-0.5 h-0.5 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '0.9s'}}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-6">
                                    <div className="w-3 h-3 bg-gray-300 rounded-full transition-all duration-300 hover:bg-green-500 hover:scale-125"></div>
                                    <div className="w-3 h-3 bg-gray-300 rounded-full transition-all duration-300 hover:bg-green-500 hover:scale-125"></div>
                                    <div className="w-3 h-3 bg-gray-300 rounded-full transition-all duration-300 hover:bg-green-500 hover:scale-125"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Plugin Screenshots Section */}
            <div className="py-12 md:py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        {/* Features Section */}
                        <div className="features-section">
                            <div className="section-header text-center mb-12 md:mb-16">
                                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900 px-4">
                                See ProRVT in Action
                                </h2>
                                <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                                    Three simple steps to transform your Revit workflow
                                </p>
                            </div>

                            <div className="features-grid space-y-6 md:space-y-8 max-w-4xl mx-auto">
                                {/* Feature 1: Smart Search */}
                                <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden min-h-[300px] md:min-h-[35vh] flex flex-col transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl border border-gray-100">
                                    <div className="flex items-center gap-6 md:gap-8 flex-1">
                                        <div className="feature-content flex-1 relative z-10">
                                            <div className="feature-number w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">1</div>
                                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3 tracking-tight">
                                                Smart Search<br />
                                                <span className="text-green-500">Revit Families.</span>
                                            </h3>
                                            <p className="text-sm md:text-base lg:text-lg text-gray-500 leading-relaxed mb-6 max-w-lg">
                                                Find exactly what you need in seconds with AI-powered search. No more endless scrolling through folders.
                                            </p>
                                        </div>
                                        <div className="feature-image flex-shrink-0 relative z-0">
                                            <div className="w-80 h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-lg">
                                                <img 
                                                    src="/images/demo-1.gif" 
                                                    alt="Smart Search Demo" 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Background decorative elements */}
                                    <div className="absolute inset-0 pointer-events-none">
                                        <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
                                        <div className="absolute bottom-8 left-8 w-24 h-24 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
                                    </div>
                                </div>

                                {/* Feature 2: Drag and Drop */}
                                <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden min-h-[300px] md:min-h-[35vh] flex flex-col transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl border border-gray-100">
                                    <div className="flex items-center gap-6 md:gap-8 flex-1">
                                        <div className="feature-content flex-1 relative z-10">
                                            <div className="feature-number w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">2</div>
                                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3 tracking-tight">
                                                Drag and Drop<br />
                                                <span className="text-blue-500">Ready to Use.</span>
                                            </h3>
                                            <p className="text-sm md:text-base lg:text-lg text-gray-500 leading-relaxed mb-6 max-w-lg">
                                                Simply drag families directly into your Revit project. Fully optimized and ready to use instantly.
                                            </p>
                                        </div>
                                        <div className="feature-image flex-shrink-0 relative z-0">
                                            <div className="w-80 h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-lg">
                                                <img 
                                                    src="/images/demo-2.gif" 
                                                    alt="Drag and Drop Demo" 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Background decorative elements */}
                                    <div className="absolute inset-0 pointer-events-none">
                                        <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
                                        <div className="absolute bottom-8 left-8 w-24 h-24 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
                                    </div>
                                </div>

                                {/* Feature 3: Customize Collections */}
                                <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden min-h-[300px] md:min-h-[35vh] flex flex-col transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl border border-gray-100">
                                    <div className="flex items-center gap-6 md:gap-8 flex-1">
                                        <div className="feature-content flex-1 relative z-10">
                                            <div className="feature-number w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">3</div>
                                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3 tracking-tight">
                                                Customize Revit<br />
                                                <span className="text-orange-500">Families Collection.</span>
                                            </h3>
                                            <p className="text-sm md:text-base lg:text-lg text-gray-500 leading-relaxed mb-6 max-w-lg">
                                                Organize your library your way. Create custom collections that match your workflow and projects.
                                            </p>
                                        </div>
                                        <div className="feature-image flex-shrink-0 relative z-0">
                                            <div className="w-80 h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-lg">
                                                <video 
                                                    src="/images/demo.mp4" 
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                    webkit-playsinline="true"
                                                    className="w-full h-full object-cover"
                                                >
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Background decorative elements */}
                                    <div className="absolute inset-0 pointer-events-none">
                                        <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-r from-orange-400/10 to-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
                                        <div className="absolute bottom-8 left-8 w-24 h-24 bg-gradient-to-r from-orange-400/10 to-amber-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
