import React from 'react';
import { Button } from '@/components/custom/button';
import { Building, Users, Calendar, MapPin, ArrowRight, ExternalLink } from 'lucide-react';

const PortfolioPage: React.FC = () => {
    const projects = [
        {
            id: 1,
            title: "Malaysian Residential Complex",
            type: "Residential Development",
            location: "Kuala Lumpur, Malaysia",
            year: "2024",
            description: "A comprehensive BIM model for a 500-unit residential complex featuring Malaysian architectural elements and compliance with local building codes.",
            features: ["500+ Custom Families", "Malaysian Building Standards", "Energy Efficiency Analysis", "3D Visualization"],
            image: "/images/demo-1.gif",
            status: "Completed"
        },
        {
            id: 2,
            title: "Commercial Office Tower",
            type: "Commercial Building",
            location: "Petaling Jaya, Malaysia",
            year: "2024",
            description: "Modern office tower with integrated BIM workflow, featuring custom Malaysian architectural families and sustainable design elements.",
            features: ["Custom Facade Systems", "MEP Coordination", "Sustainability Analysis", "Construction Documentation"],
            image: "/images/demo-2.gif",
            status: "In Progress"
        },
        {
            id: 3,
            title: "Healthcare Facility",
            type: "Healthcare",
            location: "Penang, Malaysia",
            year: "2023",
            description: "State-of-the-art healthcare facility designed with BIM precision, incorporating Malaysian healthcare standards and accessibility requirements.",
            features: ["Healthcare Standards Compliance", "Accessibility Design", "MEP Systems", "Phased Construction"],
            image: "/images/snapshot.png",
            status: "Completed"
        },
        {
            id: 4,
            title: "Educational Campus",
            type: "Educational",
            location: "Johor Bahru, Malaysia",
            year: "2023",
            description: "Comprehensive educational campus with multiple buildings, designed using our custom Malaysian educational facility families.",
            features: ["Multi-Building Coordination", "Educational Standards", "Landscape Integration", "Future Expansion Planning"],
            image: "/images/demo.mp4",
            status: "Completed"
        }
    ];

    const services = [
        {
            title: "BIM Modelling",
            description: "Comprehensive 3D building information modeling services tailored for Malaysian construction standards.",
            icon: Building
        },
        {
            title: "Custom Families",
            description: "Specialized Revit families designed specifically for Malaysian architectural and construction requirements.",
            icon: Users
        },
        {
            title: "BIM Consultation",
            description: "Expert guidance on BIM implementation, workflow optimization, and project coordination strategies.",
            icon: Calendar
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center">
                            <div className="text-2xl font-bold text-black mr-2">R</div>
                            <div className="text-sm text-black font-medium">arch.</div>
                        </div>

                        {/* Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <a href="/" className="text-black hover:text-gray-600 transition-colors">works</a>
                            <a href="/portfolio" className="text-black font-medium">portfolio</a>
                            <a href="/plugins" className="text-black hover:text-gray-600 transition-colors">plugin</a>
                            <a href="#" className="text-black hover:text-gray-600 transition-colors">blogs</a>
                        </nav>

                        {/* Contact Button */}
                        <Button
                            variant="outline"
                            className="border-black text-black hover:bg-black hover:text-white transition-all duration-300"
                        >
                            contact
                        </Button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
                            our portfolio
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Explore our successful BIM projects and see how we've transformed architectural 
                            visions into precise digital models across Malaysia.
                        </p>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            {projects.map((project) => (
                                <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                        {project.image.endsWith('.mp4') ? (
                                            <video 
                                                src={project.image}
                                                className="w-full h-full object-cover"
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                            />
                                        ) : (
                                            <img 
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                        <div className="absolute top-4 right-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                project.status === 'Completed' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {project.status}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm text-gray-500 font-medium">{project.type}</span>
                                            <span className="text-sm text-gray-500">{project.year}</span>
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-black mb-3">{project.title}</h3>
                                        
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <MapPin className="w-4 h-4 mr-2" />
                                            <span className="text-sm">{project.location}</span>
                                        </div>
                                        
                                        <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                                        
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.features.map((feature, index) => (
                                                <span 
                                                    key={index}
                                                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                        
                                        <Button 
                                            variant="outline"
                                            className="w-full border-black text-black hover:bg-black hover:text-white transition-all duration-300"
                                        >
                                            View Project Details
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                                our services
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                            {services.map((service, index) => (
                                <div key={index} className="text-center">
                                    <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-6">
                                        <service.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-black mb-4">{service.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Us Section */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                                why us?
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-black mb-3">expertise</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Our team brings years of experience in BIM modeling and Malaysian construction standards, 
                                        ensuring every project meets the highest quality and compliance requirements.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Building className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-black mb-3">seamless collaboration</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        We work closely with architects, engineers, and contractors to ensure smooth project 
                                        coordination and timely delivery of all BIM deliverables.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                                    <ExternalLink className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-black mb-3">precise visualization</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Our detailed 3D models and renderings provide clear visualizations that help stakeholders 
                                        understand the project and make informed decisions throughout the design process.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Calendar className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-black mb-3">workflow optimization</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        We implement efficient BIM workflows that streamline the design process, reduce errors, 
                                        and accelerate project delivery while maintaining the highest quality standards.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                        get in touch
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Have questions about our portfolio or want to discuss your next BIM project? 
                        Reach out today, and let's turn your vision into reality together!
                    </p>
                    <Button 
                        className="bg-black text-white hover:bg-gray-800 px-8 py-3 font-semibold rounded-lg transition-all duration-300"
                    >
                        contact us now
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-yellow-400 py-12">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="text-2xl font-bold text-black mr-2">R</div>
                            <div className="text-sm text-black font-medium">arch.</div>
                        </div>
                        
                        <div className="text-center">
                            <p className="text-black font-medium">©2024 PROJECTRVT. All rights reserved.</p>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <a href="https://www.linkedin.com/company/projectrvt" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               className="text-black hover:text-gray-700 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                            </a>
                            <a href="#" className="text-black hover:text-gray-700 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PortfolioPage;

