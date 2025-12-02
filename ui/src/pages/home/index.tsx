import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/custom/password-input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import React, { useState } from 'react';
import { 
    LogIn, 
    Download, 
    Star, 
    Zap, 
    Plug, 
    Library, 
    Heart, 
    ArrowRight, 
    CheckCircle2, 
    AlertTriangle,
    ChevronRight,
    Search,
    Box,
    Camera,
    PenTool,
    Boxes,
    Check,
    MessageCircle
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://brezelbits.xyz');

const PROFESSIONS = [
    'Architect',
    'Assistant Architect',
    'Architectural Technician',
    'Architectural Drafter',
    'Interior Designer',
    'Structural Engineer',
    'Structural Technician',
    'Structural Drafter',
    'MEP Engineer',
    'Mechanical Engineer',
    'Electrical Engineer',
    'Plumbing Engineer',
    'MEP Technician',
    'MEP Drafter',
    'Civil Engineer',
    'Civil/CAD Technician',
    'BIM Manager',
    'BIM Coordinator',
    'BIM Modeler',
    'BIM Analyst',
    'Construction Project Manager',
    'Site/Construction Engineer',
    'Estimator',
    'Construction Coordinator',
    'Quantity Surveyor',
    'Cost Engineer',
    "Owner's Representative",
    'Facilities Manager',
    'Lecturer / Instructor',
    'Student',
    'Design Consultant',
    'Visualization Specialist',
    'Others'
];

const HomePage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [profession, setProfession] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [professionOpen, setProfessionOpen] = useState(false);
    const [professionSearch, setProfessionSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showInstallModal, setShowInstallModal] = useState(false);

    const handleDownloadClick = () => {
        setShowSignupModal(true);
    };

    const handleSignup = async () => {
        // Validation
        if (!email || !email.includes('@')) {
            setMessage('Please enter a valid email address');
            return;
        }
        if (!phone || phone.trim() === '') {
            setMessage('Please enter your phone number');
            return;
        }
        if (!profession || profession.trim() === '') {
            setMessage('Please select your profession');
            return;
        }
        if (!password || password.length < 7) {
            setMessage('Password must be at least 7 characters long');
            return;
        }
        if (password !== confirmPassword) {
            setMessage("Passwords don't match");
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            // Generate username from email (part before @)
            const username = email.split('@')[0];

            // Create user account using users collection (same as sign-up page)
            const new_user: any = {
                "username": username,
                "email": email,
                "emailVisibility": true,
                "password": password,
                "passwordConfirm": confirmPassword,
                "name": username,
                "subcription": "freemium",
                "phone": phone,
                "profession": profession,
                "role": "user"
            };

            // Add company name only if provided
            if (companyName && companyName.trim() !== '') {
                new_user.companyName = companyName.trim();
            }

            // Create user account
            const record = await pb.collection('users').create(new_user);

            if (!record.created) {
                console.error('User creation failed.');
                setMessage('Failed to create account. Please try again.');
                return;
            }

            // Automatically authenticate the user
            const authData = await pb.collection('users').authWithPassword(email, password);
            localStorage.setItem('token', authData.token);

            setShowSignupModal(false);
            setShowSuccessModal(true);
            
            // Trigger download
            handleDownloadPlugin();
            
            // Reset form
            setEmail('');
            setPhone('');
            setProfession('');
            setCompanyName('');
            setPassword('');
            setConfirmPassword('');
            
            setTimeout(() => {
                setShowSuccessModal(false);
                setShowInstallModal(true);
            }, 2000);
        } catch (error: any) {
            console.error('Error signing up:', error);
            // Handle specific error messages
            if (error?.response?.data) {
                const errorData = error.response.data;
                if (errorData.email) {
                    setMessage(`Email: ${errorData.email.message || 'Email already exists'}`);
                } else if (errorData.username) {
                    setMessage(`Username: ${errorData.username.message || 'Username already exists'}`);
                } else {
                    setMessage(errorData.message || 'Something went wrong. Please try again.');
                }
            } else {
            setMessage('Something went wrong. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleJoinSupportChannel = () => {
        window.open('https://chat.whatsapp.com/EL1ik8vC8po4ZvTkwGdy9v', '_blank');
    };

    const handleDownloadPlugin = () => {
        const downloadUrl = 'https://brezelbits.xyz/api/files/4vgijwqgtjn1n1y/i0783hisy7h10jl/revit_addin_prorvt_1_0_utrrkyztc1.4.zip';
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'revit_addin_prorvt_1_0_utrrkyztc1.4.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Announcement Bar */}
            {/* <div className="border-b bg-muted/50">
                <div className="container mx-auto px-6 py-3">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        <span>New: Premium Malaysian-compliant families now available</span>
                        <ChevronRight className="h-4 w-4" />
                    </div>
                </div>
            </div> */}

            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                    <img 
                        src="/images/logo.png" 
                        alt="ProRVT Logo" 
                            className="h-8 w-auto"
                        />
                    </div>
                    <nav className="flex items-center gap-6">
                        <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Features
                        </a>
                        <a href="#install" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Install
                        </a>
                <Button
                            variant="ghost"
                            size="sm"
                    onClick={() => window.location.href = '/sign-in'}
                >
                            <LogIn className="w-4 h-4 mr-2" />
                        Sign In
                </Button>
                    </nav>
            </div>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-6 py-24 md:py-32">
                    <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        One Platform. Every Revit Family. Instantly Accessible.
                        </h1>
                    <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                        Centralized family access with seamless Revit integration, enabling teams to search 
                        and utilize families instantly for faster, consistent BIM workflows.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Button 
                            size="lg"
                            className="h-11 px-8"
                            onClick={handleDownloadClick}
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download Plugin
                        </Button>
                                <Button 
                            variant="ghost" 
                            size="lg"
                            className="h-11 px-8"
                            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Browse Features
                            <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                            </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="container mx-auto px-6 py-24 bg-muted/50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                            Powerful Features for Your Revit Workflow
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Everything you need to streamline your BIM workflow and access premium Revit families instantly.
                            </p>
                        </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <Card>
                            <CardHeader>
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                                    <Plug className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <CardTitle>Native Revit Plugin</CardTitle>
                                <CardDescription>
                                    Seamlessly integrated plugin for instant access to thousands of Revit families directly within your Revit environment.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        {/* Feature 2 */}
                        <Card>
                            <CardHeader>
                                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
                                    <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                                </div>
                                <CardTitle>One-Click Import</CardTitle>
                                <CardDescription>
                                    Import families directly into your Revit model with a single click. No more manual downloads or file management.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        {/* Feature 3 */}
                        <Card>
                            <CardHeader>
                                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4">
                                    <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                                <CardTitle>Premium Family Library</CardTitle>
                                <CardDescription>
                                    Access to premium, Malaysian-compliant families exclusive to ProRVT subscribers. Quality families for professional BIM projects.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        {/* Feature 4 */}
                        <Card>
                            <CardHeader>
                                <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-4">
                                    <Search className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                </div>
                                <CardTitle>Smart Collection Search</CardTitle>
                                <CardDescription>
                                    Intelligent search functionality that helps you find the exact family you need quickly. Filter by category, type, and specifications.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        {/* Feature 5 */}
                        <Card>
                            <CardHeader>
                                <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center mb-4">
                                    <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                            </div>
                                <CardTitle>Personal Favorites</CardTitle>
                                <CardDescription>
                                    Save your frequently used families to a personal favorites list for instant access and faster project workflows.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        {/* Feature 6 */}
                        <Card>
                            <CardHeader>
                                <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center mb-4">
                                    <Library className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <CardTitle>Organized Collections</CardTitle>
                                <CardDescription>
                                    Families organized into logical collections making it easy to browse and discover new components for your projects.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                            </div>
                        </div>
            </section>

            {/* Customization Showcase Section */}
            <section className="container mx-auto px-6 py-24 bg-muted/30">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Side - Text Content */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                                Powerful customization, still easy to use.
                            </h2>
                            <h3 className="text-xl font-bold mb-4">
                                Family Collections
                                    </h3>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                Add and organize Revit families in seconds. Multiple collection types that allow you to 
                                showcase and manage your families professionally and with ease.
                                    </p>
                            
                            {/* Icons */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg border-2 border-border flex items-center justify-center hover:bg-muted transition-colors">
                                    <Box className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                <div className="w-12 h-12 rounded-lg border-2 border-border flex items-center justify-center hover:bg-muted transition-colors">
                                    <Camera className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div className="w-12 h-12 rounded-lg border-2 border-border flex items-center justify-center hover:bg-muted transition-colors">
                                    <PenTool className="w-5 h-5 text-muted-foreground" />
                            </div>
                                <div className="w-12 h-12 rounded-lg border-2 border-border flex items-center justify-center hover:bg-muted transition-colors">
                                    <Boxes className="w-5 h-5 text-muted-foreground" />
                        </div>
                                <div className="w-12 h-12 rounded-lg border-2 border-border flex items-center justify-center hover:bg-muted transition-colors">
                                    <Download className="w-5 h-5 text-muted-foreground" />
                    </div>
                </div>
            </div>

                        {/* Right Side - Visual Mockup */}
                        <div className="relative">
                            <div className="bg-gradient-to-br from-blue-500 via-purple-500 via-pink-500 to-orange-500 rounded-2xl p-4 shadow-2xl">
                                <div className="bg-card rounded-lg overflow-hidden shadow-xl max-w-sm mx-auto">
                                    <img 
                                        src="/images/plugin-interface.png" 
                                        alt="ProRVT Plugin Interface - Family Library with sidebar navigation and item grid"
                                        className="w-auto"
                                    />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>

            {/* How to Install Section */}
            <section id="install" className="container mx-auto px-6 py-24">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                            How to Install
                            </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Get started with ProRVT in just a few simple steps
                        </p>
                    </div>

                    <div className="space-y-4">
                        {/* Step 1 */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-4">
                                    <Badge variant="default" className="w-8 h-8 rounded-full flex items-center justify-center p-0 text-sm font-bold">
                                        1
                                    </Badge>
                                    <div className="flex-1">
                                        <h3 className="font-semibold mb-2">Download the Plugin</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Click the download button above and complete the signup process. The plugin installer 
                                            will automatically download to your computer.
                                    </p>
                                </div>
                                                </div>
                            </CardContent>
                        </Card>

                        {/* Step 2 */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-4">
                                    <Badge variant="default" className="w-8 h-8 rounded-full flex items-center justify-center p-0 text-sm font-bold">
                                        2
                                    </Badge>
                                    <div className="flex-1">
                                        <h3 className="font-semibold mb-2">Run the Installer</h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Locate the downloaded installer file and double-click to run it.
                                        </p>
                                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                                            <div className="flex items-start gap-3">
                                                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-sm font-semibold mb-1">
                                                        Self-Signed Certificate Notice
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        The plugin uses a self-signed certificate. Windows may show a security warning. 
                                                        Click <strong>"Run anyway"</strong> or <strong>"More info"</strong> then 
                                                        <strong>"Run anyway"</strong> to proceed with the installation.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </CardContent>
                        </Card>

                        {/* Step 3 */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-4">
                                    <Badge variant="default" className="w-8 h-8 rounded-full flex items-center justify-center p-0 text-sm font-bold">
                                        3
                                    </Badge>
                                    <div className="flex-1">
                                        <h3 className="font-semibold mb-2">Follow Installation Wizard</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Follow the on-screen instructions to complete the installation. The installer will 
                                            automatically detect your Revit installation and configure the plugin.
                                    </p>
                                </div>
                                            </div>
                            </CardContent>
                        </Card>

                        {/* Step 4 */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-4">
                                    <Badge variant="default" className="w-8 h-8 rounded-full flex items-center justify-center p-0 text-sm font-bold">
                                        4
                                    </Badge>
                                    <div className="flex-1">
                                        <h3 className="font-semibold mb-2">Launch Revit</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Open Revit and look for the ProRVT tab in the ribbon. Sign in with your account 
                                            to start accessing the family library.
                                        </p>
                                        </div>
                            </div>
                            </CardContent>
                        </Card>
                                </div>
                            </div>
            </section>

            {/* Footer */}
            <footer className="border-t bg-muted/50 py-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                ProRVT is a ProjectRVT project, created by the team
                                    </p>
                                </div>
                        <div className="flex items-center gap-4">
                            <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={handleJoinSupportChannel}
                                className="text-sm"
                            >
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Join Support Channel
                            </Button>
                            <p className="text-sm text-muted-foreground">
                                2025 ProRVT © All Right Reserved
                            </p>
                                        </div>
                                    </div>
                                </div>
            </footer>

            {/* Signup Modal */}
            <Dialog open={showSignupModal} onOpenChange={setShowSignupModal}>
                <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Sign Up to Download</DialogTitle>
                        <DialogDescription>
                            Create your account to download the ProRVT plugin and join our support community.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                        {/* Two Column Layout */}
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Left Column */}
                            <div className="space-y-4">
                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                            </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number *</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                                </div>
                                                
                                {/* Profession */}
                                <div className="space-y-2">
                                    <Label htmlFor="profession">Profession *</Label>
                                    <Popover open={professionOpen} onOpenChange={setProfessionOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={professionOpen}
                                                className="w-full justify-between"
                                                id="profession"
                                            >
                                                {profession || "Select your profession"}
                                                <ChevronRight className="ml-2 h-4 w-4 shrink-0 rotate-90 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[400px] p-0" align="start">
                                            <Command>
                                                <CommandInput 
                                                    placeholder="Search profession..." 
                                                    value={professionSearch}
                                                    onValueChange={setProfessionSearch}
                                                />
                                                <CommandList>
                                                    <CommandEmpty>
                                                        <div className="py-2">
                                                            <CommandItem
                                                                onSelect={() => {
                                                                    setProfession('Others');
                                                                    setProfessionOpen(false);
                                                                    setProfessionSearch('');
                                                                }}
                                                            >
                                                                <Check
                                                                    className={`mr-2 h-4 w-4 ${
                                                                        profession === 'Others' ? "opacity-100" : "opacity-0"
                                                                    }`}
                                                                />
                                                                Others
                                                            </CommandItem>
                                                        </div>
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {PROFESSIONS.filter((prof) =>
                                                            prof.toLowerCase().includes(professionSearch.toLowerCase())
                                                        ).map((prof) => (
                                                            <CommandItem
                                                                key={prof}
                                                                value={prof}
                                                                onSelect={() => {
                                                                    setProfession(prof);
                                                                    setProfessionOpen(false);
                                                                    setProfessionSearch('');
                                                                }}
                                                            >
                                                                <Check
                                                                    className={`mr-2 h-4 w-4 ${
                                                                        profession === prof ? "opacity-100" : "opacity-0"
                                                                    }`}
                                                                />
                                                                {prof}
                                                            </CommandItem>
                                                        ))}
                                                        {professionSearch && 
                                                         !PROFESSIONS.some((prof) =>
                                                            prof.toLowerCase().includes(professionSearch.toLowerCase())
                                                        ) && (
                                                            <CommandItem
                                                                onSelect={() => {
                                                                    setProfession('Others');
                                                                    setProfessionOpen(false);
                                                                    setProfessionSearch('');
                                                                }}
                                                            >
                                                                <Check
                                                                    className={`mr-2 h-4 w-4 ${
                                                                        profession === 'Others' ? "opacity-100" : "opacity-0"
                                                                    }`}
                                                                />
                                                                Others
                                                            </CommandItem>
                                                        )}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                                </div>
                                                
                                {/* Company Name (Optional) */}
                                <div className="space-y-2">
                                    <Label htmlFor="company">Company Name (Optional)</Label>
                                    <Input
                                        id="company"
                                        type="text"
                                        placeholder="Enter your company name"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                    />
                                                </div>
                                            </div>
                                            
                            {/* Right Column */}
                            <div className="space-y-4">
                                {/* Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password *</Label>
                                    <PasswordInput
                                        id="password"
                                        placeholder="Enter your password (min 7 characters)"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                        </div>
                                        
                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                                    <PasswordInput
                                        id="confirmPassword"
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                        </div>

                                {/* Info Box */}
                                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                                    <p className="text-sm font-semibold">Account Benefits:</p>
                                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                                        <li>Instant plugin download</li>
                                        <li>Access to premium families</li>
                                        <li>Join support community</li>
                                        <li>Free forever subscription</li>
                                    </ul>
                    </div>
                </div>
            </div>

                        {/* Error Message */}
                        {message && (
                            <div className={`text-sm p-3 rounded-lg ${
                                message.includes('valid') || message.includes('phone') || message.includes('profession') || message.includes('Password') || message.includes("don't match") 
                                    ? 'text-destructive bg-destructive/10' 
                                    : 'text-green-600 bg-green-50'
                            }`}>
                                {message}
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="space-y-3">
                            <Button 
                                className="w-full"
                                onClick={handleSignup}
                                disabled={isLoading}
                                size="lg"
                            >
                                {isLoading ? 'Signing up...' : 'Sign Up & Download'}
                            </Button>
                            <p className="text-xs text-muted-foreground text-center">
                                By signing up, you agree to our terms and will be added to our support channel.
                                            </p>
                                        </div>
                                            </div>
                </DialogContent>
            </Dialog>

            {/* Success Modal */}
            <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-center">🎉 Welcome to ProRVT!</DialogTitle>
                    </DialogHeader>
                    <div className="text-center py-6">
                        <div className="text-6xl mb-4">🎊</div>
                        <h3 className="text-lg font-semibold mb-3">
                            Account Created Successfully!
                                            </h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            Your account has been created and you're now logged in. Your download will start automatically. 
                            You'll also receive an email with installation instructions and access to our support channel.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-green-600">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="text-sm">Download started</span>
                                            </div>
                                        </div>
                </DialogContent>
            </Dialog>

            {/* Install Instructions Modal */}
            <Dialog open={showInstallModal} onOpenChange={setShowInstallModal}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Installation Instructions</DialogTitle>
                        <DialogDescription>
                            Follow these steps to complete your ProRVT installation
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold mb-1">
                                        Important: Self-Signed Certificate
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        When Windows shows a security warning, click <strong>"Run anyway"</strong> to proceed. 
                                        This is normal for self-signed certificates.
                                            </p>
                                        </div>
                                            </div>
                                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                <span>1. Run the downloaded installer</span>
                                    </div>
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                <span>2. Click "Run anyway" when prompted</span>
                                    </div>
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                <span>3. Follow the installation wizard</span>
                                </div>
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                <span>4. Launch Revit and sign in</span>
                            </div>
                        </div>
                        <div className="pt-4 border-t">
                            <Button 
                                className="w-full"
                                onClick={() => {
                                    handleJoinSupportChannel();
                                    setShowInstallModal(false);
                                }}
                            >
                                Join Support Channel
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default HomePage;
