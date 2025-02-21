import React, { useState, useEffect } from 'react';
import { AlertCircle, Award, BookOpen, Users, X, ChevronRight, Check, Globe, Clock, Shield, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';


import ServicesCarousel from './ServicesCarousel';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cedula, setCedula] = useState('');
  const [error, setError] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [certificateData, setCertificateData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationSuccess, setValidationSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleValidate = async () => {
    if (!cedula.trim()) {
      setError('Por favor ingrese un número de cédula válido');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`https://backendcoalianza.onrender.com/api/v1/clients/${cedula}`);
      if (!response.ok) {
        throw new Error('Certificado no encontrado');
      }
      const data = await response.json();
      setCertificateData(data);
      setValidationSuccess(true);
    } catch (error) {
      setError('No se encontró un certificado válido para este número de documento');
      setCertificateData(null);
      setValidationSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "d 'de' MMMM 'de' yyyy", { locale: es });
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setCedula('');
    setError('');
    setCertificateData(null);
    setValidationSuccess(false);
  };

  const stats = [
    { number: '15K+', text: 'Profesionales Certificados' },
    { number: '98%', text: 'Tasa de Aprobación' },
    { number: '100+', text: 'Empresas Asociadas' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
        }`}>
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between h-20">
            <div className="text-2xl font-bold text-green-700">Coalianza</div>
            <div className="hidden md:flex space-x-8">
              <button className="text-gray-700 hover:text-green-600 transition-colors">Inicio</button>
              <button className="text-gray-700 hover:text-green-600 transition-colors">Programas</button>
              <button className="text-gray-700 hover:text-green-600 transition-colors">Empresas</button>
              <button className="text-gray-700 hover:text-green-600 transition-colors">Contacto</button>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Validar Certificado
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Impulsa tu <span className="text-green-600">Carrera Profesional</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Obtén certificaciones reconocidas nacionalmente que potenciarán tus oportunidades laborales y desarrollo profesional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center group"
                >
                  Verificar Certificado
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white text-green-600 px-8 py-4 rounded-lg border-2 border-green-600 hover:bg-green-50 transition-all">
                  Conocer Más
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-3xl p-8 text-white">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className={`${index === stats.length - 1 ? 'col-span-2' : ''} bg-white/10 backdrop-blur-lg rounded-xl p-6`}>
                      <div className="text-3xl font-bold">{stat.number}</div>
                      <div className="text-sm mt-2">{stat.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <ServicesCarousel />

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Por qué elegir Coalianza?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nos destacamos por ofrecer certificaciones de calidad con reconocimiento nacional
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Reconocimiento nacional",
                description: "Nuestras certificaciones son avaladas por organizaciones globales"
              },
              {
                icon: Clock,
                title: "Flexibilidad Total",
                description: "Estudia a tu propio ritmo y desde cualquier lugar"
              },
              {
                icon: Shield,
                title: "Garantía de Calidad",
                description: "Contenido actualizado y validado por expertos"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                  <feature.icon className="w-8 h-8 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>




      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">¿Listo para Certificarte?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Da el primer paso hacia tu desarrollo profesional y únete a nuestra comunidad de expertos certificados
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg inline-flex items-center"
          >
            Comenzar Ahora
            <ChevronRight className="ml-2" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h4 className="text-2xl font-bold mb-6">Coalianza</h4>
              <p className="text-gray-400">
                Transformando el futuro profesional a través de certificaciones de excelencia.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Programas</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Certificaciones</li>
                <li className="hover:text-white transition-colors cursor-pointer">Capacitaciones</li>
                <li className="hover:text-white transition-colors cursor-pointer">Cursos Online</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Contacto</h4>
              <ul className="space-y-4 text-gray-400">
                <li>info@coalianza.com</li>
                <li>+1 234 567 890</li>
                <li>Ciudad, País</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Síguenos</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Coalianza. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modal de Validación */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 transform transition-all">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Validar Certificado</h2>
              <button
                onClick={resetModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {!validationSuccess ? (
              <>
                <p className="text-gray-600 mb-6">
                  Ingrese su número de cédula para verificar la autenticidad de su certificado
                </p>
                <input
                  type="text"
                  placeholder="Número de Cédula"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
                />
                {error && (
                  <div className="flex items-center text-red-600 text-sm mb-6">
                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    {error}
                  </div>
                )}
                <div className="flex gap-4">
                  <button
                    onClick={resetModal}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleValidate}
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isLoading ? 'Verificando...' : 'Verificar'}
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-center text-green-600 mb-4">
                  <CheckCircle className="w-16 h-16" />
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-green-600 mb-2">¡Certificado Válido!</h3>
                  <p className="text-gray-600">El certificado se encuentra registrado y vigente</p>
                </div>
                <div className="bg-green-50 rounded-lg p-6 space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Nombre Completo</p>
                    <p className="text-lg font-semibold">{`${certificateData.nombre} ${certificateData.apellido}`}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Documento de Identidad</p>
                    <p className="text-lg font-semibold">{certificateData.numeroDeDocumento}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tipo de Certificación</p>
                    <p className="text-lg font-semibold">{certificateData.tipo.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fecha de Expedición</p>
                    <p className="text-lg font-semibold">{formatDate(certificateData.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fecha de Vencimiento</p>
                    <p className="text-lg font-semibold">{formatDate(certificateData.fechaVencimiento)}</p>
                  </div>
                </div>
                <button
                  onClick={resetModal}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all transform hover:scale-105"
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default App;