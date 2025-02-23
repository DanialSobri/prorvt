import React, { useState } from 'react';
import { Button } from '@/components/custom/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Check, Download, UserPlus } from 'lucide-react';

const OnboardingPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    const steps = [
        {
            id: 1,
            title: "Create Your Account",
            description: "Sign up to access our full library of Revit families",
            icon: <UserPlus className="w-6 h-6" />,
            action: () => window.location.href = '/sign-up'
        },
        {
            id: 2,
            title: "Download ProRVT Plugin",
            description: "Get our powerful Revit plugin",
            icon: <Download className="w-6 h-6" />,
            action: () => window.location.href = '/api/download/plugin'
        },
        {
            id: 3,
            title: "Complete Setup",
            description: "Follow the installation guide to get started",
            icon: <Check className="w-6 h-6" />,
            action: () => window.location.href = '/installation-guide'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-100">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Welcome to ProRVT
                        </h1>
                        <p className="text-gray-700">
                            Let's get you set up in just a few steps
                        </p>
                    </div>

                    <Progress 
                        value={(currentStep / totalSteps) * 100} 
                        className="mb-8"
                    />

                    <div className="space-y-6">
                        {steps.map((step) => (
                            <Card 
                                key={step.id}
                                className={`p-6 transition-all duration-300 ${
                                    step.id === currentStep
                                    ? 'bg-white border-blue-500 shadow-lg'
                                    : step.id < currentStep
                                    ? 'bg-gray-100 border-green-500/50'
                                    : 'bg-gray-100 border-gray-300'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-full ${
                                        step.id === currentStep
                                        ? 'bg-blue-500'
                                        : step.id < currentStep
                                        ? 'bg-green-500'
                                        : 'bg-gray-400'
                                    }`}>
                                        {step.id < currentStep ? <Check className="w-6 h-6 text-white" /> : step.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-700">
                                            {step.description}
                                        </p>
                                    </div>
                                    {step.id === currentStep && (
                                        <Button
                                            onClick={() => {
                                                step.action();
                                                setCurrentStep(currentStep + 1);
                                            }}
                                            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white"
                                        >
                                            Continue
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>

                    {currentStep > 1 && (
                        <div className="mt-6 text-center">
                            <Button
                                variant="link"
                                className="text-blue-500 hover:text-blue-400"
                                onClick={() => setCurrentStep(currentStep - 1)}
                            >
                                Go back to previous step
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OnboardingPage;
