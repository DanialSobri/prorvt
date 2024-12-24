import { Button } from '@/components/custom/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { Download, Lock, Unlock, Star } from 'lucide-react';

const SubscriptionPage: React.FC = () => {
    return (
        <div className="container relative min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Revit Family Libraries</h1>
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
                            Upgrade to Premium
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
    );
};

export default SubscriptionPage;