import React, { useState, useEffect } from 'react';
import POST1 from './images/POST1.png';
import POST2 from './images/POST2.png';


const ServicesCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const services = [
        {
            title: "Manipulación de Alimentos",
            description: "Certifícate como profesional en manipulación segura de alimentos, este certificado te permitirá trabajar en restaurantes, hoteles y toda la industria alimentaria cumpliendo con los más altos estándares de calidad e higiene.",
            image: POST1
        },
      {
    title: "Aseo Hospitalario",
    description: "Programas especializados para garantizar la limpieza y desinfección efectiva en entornos hospitalarios",
    image: POST2  // Aquí puedes usar una imagen relevante al aseo hospitalario
}
    ];


    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % services.length);
        }, 5000); // Cambia cada 5 segundos

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
                    <p className="text-xl text-gray-600">
                        Soluciones integrales para tu desarrollo profesional
                    </p>
                </div>

                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    {/* Carrusel */}
                    <div className="relative h-[500px]">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className={`absolute w-full h-full transition-all duration-700 ease-in-out transform
                  ${index === currentSlide ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
                            >
                                <div className="relative w-full h-full">
                                    {/* Overlay gradiente */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />

                                    {/* Imagen */}
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Contenido */}
                                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
                                        <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
                                        <p className="text-lg max-w-2xl">{service.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Indicadores */}
                    <div className="absolute bottom-6 right-6 flex space-x-2 z-30">
                        {services.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 
                  ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
                                aria-label={`Ir a slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Grid de servicios resumidos */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105
                ${index === currentSlide ? 'border-2 border-green-500' : ''}`}
                        >
                            <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
                            <p className="text-sm text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesCarousel;