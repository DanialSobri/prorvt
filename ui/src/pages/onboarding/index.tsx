import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/custom/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Check, Download, UserPlus, Info, Star, CreditCard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PocketBase from 'pocketbase';
import { toast } from '@/components/ui/use-toast';

// SignUpForm component
const SignUpForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Initialize PocketBase
    const backendUrl = 'https://brezelbits.xyz';
    const pb = new PocketBase(backendUrl);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        try {
            // Create a new user with PocketBase
            const userData = {
                "username": name,
                "email": email,
                "emailVisibility": true,
                "password": password,
                "passwordConfirm": confirmPassword,
                "name": name,
                "subcription": "freemium"
            };
            
            const record = await pb.collection('users').create(userData);
            
            if (!record.created) {
                throw new Error('User creation failed');
            }
            
            // Display success toast
            toast({
                title: 'Account created successfully!🎉',
                description: 'You have been signed up successfully.',
                duration: 5000,
            });
            
            // Authenticate the user
            const authData = await pb.collection('users').authWithPassword(email, password);
            
            // Store auth token
            localStorage.setItem('token', authData.token);
            
            // Call the onSuccess callback to notify parent component
            onSuccess();
        } catch (err) {
            console.error('Error creating user:', err);
            setError(err instanceof Error ? err.message : 'An error occurred during signup');
            
            // Display error toast
            toast({
                title: 'Account creation failed!',
                description: 'An error occurred while signing up. Please try again later.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <div>
                <Label htmlFor="name">Full Name</Label>
                <Input 
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                />
            </div>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                />
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input 
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                />
            </div>
            <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                />
            </div>
            <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white"
                disabled={isLoading}
            >
                {isLoading ? 'Signing up...' : 'Create Account'}
            </Button>
        </form>
    );
};

// Download Plugin Details component
const DownloadPluginDetails: React.FC<{ onDownload: () => void }> = ({ onDownload }) => {
    return (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-lg font-semibold mb-2 text-blue-700">System Requirements</h4>
            <ul className="list-disc pl-5 mb-4 space-y-1 text-gray-700">
                <li>Autodesk Revit 2020 or later</li>
                <li>Windows OS</li>
                <li>Internet Connection Required to View Families</li>
            </ul>
            
            <Alert className="mb-4 bg-yellow-50 border-yellow-200">
                <Info className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-700">
                    Note: This app uses a custom installer (and not the standard App Store installer).
                </AlertDescription>
            </Alert>
            
            <Button 
                onClick={onDownload} 
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white"
            >
                <Download className="mr-2 h-4 w-4" />
                Download ProRVT Plugin
            </Button>
        </div>
    );
};

// Installation Guide Component
const InstallationGuide: React.FC<{ onComplete: () => void; planType: 'free' | 'premium' | null }> = ({ onComplete, planType }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
        {
            title: "1. Install the Plugin",
            imgSrc: "/images/install-plugin.gif",
            imgAlt: "Installation process",
            description: "Run the downloaded installer and follow the on-screen instructions. Accept the license agreement and choose your Revit installation folder."
        },
        {
            title: "2. Start Revit and Activate",
            imgSrc: "/images/activate-plugin.png",
            imgAlt: "Plugin activation",
            description: "Open Revit and find the ProRVT tab in the ribbon. Click on \"Activate\" and enter your account credentials."
        },
        {
            title: "3. Browse Families",
            imgSrc: "/images/browse-families.gif",
            imgAlt: "Browsing families",
            description: "Click on \"Browse Families\" to open the library. Search, filter, and insert Revit families directly into your project."
        }
    ];
    
    const goToNextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };
    
    const goToPrevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };
    
    const isLastSlide = currentSlide === slides.length - 1;
    const isFirstSlide = currentSlide === 0;
    
    return (
        <div className="mt-6 space-y-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">
                Installation Guide {planType && `(${planType.charAt(0).toUpperCase() + planType.slice(1)} Plan)`}
            </h3>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-semibold text-lg mb-2">{slides[currentSlide].title}</h4>
                <div className="mb-4 rounded-md overflow-hidden border border-gray-200">
                    <img 
                        src={slides[currentSlide].imgSrc}
                        alt={slides[currentSlide].imgAlt}
                        className="w-full h-auto"
                    />
                </div>
                <p className="text-gray-700">
                    {slides[currentSlide].description}
                </p>
            </div>
            
            <div className="flex justify-between items-center pt-2">
                <Button
                    variant="outline"
                    onClick={goToPrevSlide}
                    disabled={isFirstSlide}
                    className={isFirstSlide ? "opacity-50 cursor-not-allowed" : ""}
                >
                    Previous
                </Button>
                
                <div className="flex space-x-1">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 w-2 rounded-full ${
                                index === currentSlide ? "bg-blue-500" : "bg-gray-300"
                            }`}
                            onClick={() => setCurrentSlide(index)}
                        ></div>
                    ))}
                </div>
                
                {isLastSlide ? (
                    <Button
                        onClick={onComplete}
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white"
                    >
                        Proceed to Dashboard
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                ) : (
                    <Button
                        onClick={goToNextSlide}
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white"
                    >
                        Next
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                )}
            </div>
            
            <Alert className="bg-blue-50 border-blue-200 mt-8">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700">
                    {planType === 'premium' ? 
                        "You've selected the Premium plan. Enjoy full access to all features and prioritized support!" :
                        "Need more help? Check out our detailed documentation or contact support."}
                    {' '}<a href="/documentation" className="underline font-medium">detailed documentation</a> or <a href="/support" className="underline font-medium">contact support</a>.
                </AlertDescription>
            </Alert>
        </div>
    );
};

// Subscription Options Component
const SubscriptionOptions: React.FC<{ onSelectPlan: (isPremium: boolean) => void }> = ({ onSelectPlan }) => {
    return (
        <div className="mt-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                {/* Premium Plan */}
                <div className="border-2 border-blue-500 rounded-lg p-6 relative bg-gradient-to-b from-blue-50 to-white">
                    <div className="absolute -top-3 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        RECOMMENDED
                    </div>
                    <div className="flex justify-center mb-4">
                        <Star className="h-12 w-12 text-blue-500 fill-blue-100" />
                    </div>
                    <h4 className="text-xl font-bold text-center mb-2">Premium Plan</h4>
                    <div className="text-center mb-4">
                        <span className="text-3xl font-bold">RM29.99</span>
                        <span className="text-gray-500">/month</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                        <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            <span>Full access to all Revit families</span>
                        </li>
                        <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            <span>Custom family requests</span>
                        </li>
                        <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            <span>Priority support</span>
                        </li>
                        <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            <span>Offline access to favorites</span>
                        </li>
                    </ul>
                    <Button 
                        onClick={() => onSelectPlan(true)}
                        className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white"
                    >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Subscribe Now
                    </Button>
                </div>

                {/* Free Plan */}
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                    <div className="flex justify-center mb-4">
                        <Download className="h-12 w-12 text-gray-500" />
                    </div>
                    <h4 className="text-xl font-bold text-center mb-2">Free Plan</h4>
                    <div className="text-center mb-4">
                        <span className="text-3xl font-bold">RM0</span>
                        <span className="text-gray-500">/month</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                        <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            <span>Access to basic Revit families</span>
                        </li>
                        <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            <span>Standard support</span>
                        </li>
                        <li className="flex items-center text-gray-400">
                            <span className="ml-6">No custom family requests</span>
                        </li>
                        <li className="flex items-center text-gray-400">
                            <span className="ml-6">No offline access</span>
                        </li>
                    </ul>
                    <Button 
                        onClick={() => onSelectPlan(false)}
                        variant="outline"
                        className="w-full"
                    >
                        Continue with Free
                    </Button>
                </div>
            </div>

            <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700">
                    You can upgrade or downgrade your plan anytime from your account dashboard.
                </AlertDescription>
            </Alert>
        </div>
    );
};

// Payment Modal Component
const PaymentModal: React.FC<{ 
    isOpen: boolean; 
    onClose: () => void;
    onPaymentSuccess: () => void;
}> = ({ isOpen, onClose, onPaymentSuccess }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    if (!isOpen) return null;
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Placeholder for actual payment processing
            // In a real app, you would call your payment API here
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            onPaymentSuccess();
        } catch (error) {
            console.error('Payment failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Complete Your Payment</h2>
                <p className="mb-6 text-gray-600">Premium Plan - RM19.99/month</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input 
                            id="cardNumber"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="1234 5678 9012 3456"
                            required
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input 
                                id="expiryDate"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                placeholder="MM/YY"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input 
                                id="cvv"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                placeholder="123"
                                required
                            />
                        </div>
                    </div>
                    
                    <Alert className="bg-blue-50 border-blue-200">
                        <Info className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-700">
                            Your payment is secure. We use SSL encryption.
                        </AlertDescription>
                    </Alert>
                    
                    <div className="flex gap-4 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-white"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Processing...' : 'Pay Now'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const OnboardingPage: React.FC = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [showSignUpForm, setShowSignUpForm] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [showDownloadDetails, setShowDownloadDetails] = useState(false);
    const [showInstallationGuide, setShowInstallationGuide] = useState(false);
    const [showSubscriptionOptions, setShowSubscriptionOptions] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium' | null>(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const totalSteps = 4;

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
            title: "Choose Your Plan",
            description: "Select between free and premium options",
            icon: <Star className="w-6 h-6" />,
            action: () => setShowSubscriptionOptions(true)
        },
        {
            id: 4,
            title: "Complete Setup",
            description: "Follow the installation guide to get started",
            icon: <Check className="w-6 h-6" />,
            action: () => window.location.href = '/installation-guide'
        }
    ];

    const handleContinue = (stepAction: () => void, stepId: number) => {
        if (stepId === 1 && !isSignedIn) {
            setShowSignUpForm(true);
            return;
        }
        
        if (stepId === 2) {
            setShowDownloadDetails(!showDownloadDetails);
            return;
        }
        
        if (stepId === 3) {
            setShowSubscriptionOptions(!showSubscriptionOptions);
            return;
        }
        
        if (stepId === 4) {
            // Just show the installation guide if it's not already visible
            if (!showInstallationGuide) {
                setShowInstallationGuide(true);
            }
            return;
        }
        
        stepAction();
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            navigate('/apps'); // Redirect to the dashboard or desired page after onboarding
        }
    };

    const handleDownload = () => {
        // Trigger download
        window.location.href = 'https://brezelbits.xyz/api/files/4vgijwqgtjn1n1y/pblmz5j8jkspwo7/tecware_spectre_75_firmware_update_v1_ZWKZqlZWpL.0.zip';
        
        // Hide download details
        setShowDownloadDetails(false);
        
        // Move to the next step and show subscription options
        setTimeout(() => {
            setCurrentStep(3);
            setShowSubscriptionOptions(true);
        }, 1000);
    };

    const handleSelectPlan = (isPremium: boolean) => {
        if (isPremium) {
            setSelectedPlan('premium');
            setIsPaymentModalOpen(true);
        } else {
            setSelectedPlan('free');
            setShowSubscriptionOptions(false);
            setCurrentStep(4); // Move to installation step
            setShowInstallationGuide(true);
        }
    };

    const handlePaymentSuccess = () => {
        setIsPaymentModalOpen(false);
        setShowSubscriptionOptions(false);
        setCurrentStep(4); // Move to installation step
        setShowInstallationGuide(true);
    };

    const handleSignUpSuccess = () => {
        setIsSignedIn(true);
        setShowSignUpForm(false);
        setCurrentStep(2); // Move to next step
        // Auto-expand download details when reaching step 2
        setShowDownloadDetails(true);
    };

    const handleInstallationComplete = () => {
        navigate('/apps');
    };

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
                                            {step.id === 3 && selectedPlan && (
                                                <span className="ml-2 text-blue-600 font-medium">
                                                    ({selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} plan selected)
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    {step.id === currentStep && 
                                     !(step.id === 1 && showSignUpForm) && 
                                     !(step.id === 3 && showSubscriptionOptions) &&
                                     step.id !== 4 && (
                                        <Button
                                            onClick={() => handleContinue(step.action, step.id)}
                                            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white"
                                        >
                                            {step.id === 2 
                                                ? (showDownloadDetails ? 'Hide Details' : 'Show Details')
                                                : step.id === 3
                                                ? (showSubscriptionOptions ? 'Hide Options' : 'Show Options')
                                                : 'Continue'
                                            }
                                            {step.id !== 2 && step.id !== 3 && <ArrowRight className="ml-2 w-4 h-4" />}
                                        </Button>
                                    )}
                                </div>
                                
                                {step.id === 1 && showSignUpForm && !isSignedIn && (
                                    <SignUpForm onSuccess={handleSignUpSuccess} />
                                )}

                                {step.id === 2 && showDownloadDetails && (
                                    <DownloadPluginDetails onDownload={handleDownload} />
                                )}

                                {step.id === 3 && showSubscriptionOptions && (
                                    <SubscriptionOptions onSelectPlan={handleSelectPlan} />
                                )}

                                {step.id === 4 && showInstallationGuide && (
                                    <InstallationGuide onComplete={handleInstallationComplete} planType={selectedPlan} />
                                )}
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

            {/* Payment Modal */}
            <PaymentModal 
                isOpen={isPaymentModalOpen} 
                onClose={() => setIsPaymentModalOpen(false)}
                onPaymentSuccess={handlePaymentSuccess}
            />
        </div>
    );
};

export default OnboardingPage;
