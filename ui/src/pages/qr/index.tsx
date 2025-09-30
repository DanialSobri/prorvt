import React from 'react';
import { Button } from '@/components/custom/button';
import { ArrowLeft } from 'lucide-react';

const QRPage: React.FC = () => {
    const websiteUrl = 'https://plugin.projectrvt.com/';
    
    // Generate QR code using a simple API
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(websiteUrl)}`;

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            {/* Back Button */}
            <div className="absolute top-6 left-6">
                <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Button>
            </div>

            {/* Main Content */}
            <div className="text-center max-w-md mx-auto">
                {/* Logo */}
                <div className="mb-8">
                    <img 
                        src="/images/logo.png" 
                        alt="ProRVT Logo" 
                        className="h-16 w-auto mx-auto filter dark:invert-0"
                    />
                </div>

                {/* QR Code */}
                <div className="mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 inline-block">
                        <img 
                            src={qrCodeUrl} 
                            alt="QR Code for ProRVT Plugin" 
                            className="w-64 h-64 mx-auto"
                        />
                    </div>
                </div>

                {/* Website URL */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">ProRVT Plugin</h1>
                    <p className="text-gray-600 mb-4">Scan QR code to access</p>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <p className="text-sm text-gray-700 font-mono break-all">{websiteUrl}</p>
                    </div>
                </div>

                {/* Instructions */}
                <div className="text-sm text-gray-500">
                    <p>Point your camera at the QR code to open the ProRVT plugin website</p>
                </div>
            </div>
        </div>
    );
};

export default QRPage;
