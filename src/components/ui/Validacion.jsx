// Validacion.jsx
import React, { useState } from 'react';
import { AlertCircle, CheckCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'react-router-dom';

const Validacion = () => {
  const [cedula, setCedula] = useState('');
  const [error, setError] = useState('');
  const [certificateData, setCertificateData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationSuccess, setValidationSuccess] = useState(false);

  const handleValidate = async () => {
    if (!cedula.trim()) {
      setError('Por favor ingrese un número de cédula válido');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`https://backendcoalianza.vercel.app/api/v1/clients/${cedula}`);
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

  const resetForm = () => {
    setCedula('');
    setError('');
    setCertificateData(null);
    setValidationSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-xl shadow-2xl p-8 border-t-4 border-green-600">
          <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver al inicio
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Validación de Certificados</h1>
              <p className="text-gray-600">Sistema oficial de verificación de Coalianza</p>
            </div>
            <div className="flex items-center bg-green-100 px-4 py-2 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-700">Certificación Oficial</span>
            </div>
          </div>
        </div>

        {/* Validation Form/Result */}
        <div className="bg-white rounded-b-xl shadow-2xl p-8">
          {!validationSuccess ? (
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Verifique su certificado</h3>
                <p className="text-gray-600">
                  Ingrese su número de cédula para validar su certificación en Buenas Prácticas de Manipulación de Alimentos
                </p>
              </div>
              <div>
                <label htmlFor="cedula" className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Cédula
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="cedula"
                  placeholder="Ej: 1234567890"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                />
              </div>

              {error && (
                <div className="flex items-center text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleValidate}
                disabled={isLoading}
                className="w-full px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 font-semibold shadow-md"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Verificando...
                  </span>
                ) : (
                  'Validar Certificado'
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center">
                <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-600 mb-2">Certificado Verificado</h2>
                <p className="text-gray-600">Certificación válida y registrada en nuestro sistema</p>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Nombre Completo</p>
                    <p className="text-lg font-semibold text-gray-900">{`${certificateData.nombre} ${certificateData.apellido}`}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Documento de Identidad</p>
                    <p className="text-lg font-semibold text-gray-900">{certificateData.numeroDeDocumento}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Tipo de Certificación</p>
                    <p className="text-lg font-semibold text-gray-900">Buenas Prácticas de Manipulación (BPM)</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Fecha de Expedición</p>
                    <p className="text-lg font-semibold text-gray-900">{formatDate(certificateData.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Fecha de Vencimiento</p>
                    <p className="text-lg font-semibold text-gray-900">{formatDate(certificateData.fechaVencimiento)}</p>
                  </div>
                </div>
              </div>

              {/* Certification Details */}
              <div className="bg-white border-2 border-green-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalles de la Certificación</h3>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    <span className="font-semibold">Certificación:</span> Recibió capacitación en Buenas Prácticas de Manipulación de Alimentos (BPM) de acuerdo con el Decreto 3075 de 1997 y la Resolución 2674 de 2013, actualizados según las normativas vigentes en Colombia para 2025.
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Avalado por:</span> Seccional de Salud de Antioquia CSO-2018
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Certificador:</span> William Alzate - NIT 712.121.85-2
                  </p>
                </div>
              </div>

              <button
                onClick={resetForm}
                className="w-full px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all transform hover:scale-105 font-semibold shadow-md"
              >
                Verificar otro certificado
              </button>
            </div>
          )}
        </div>

        {/* Footer Information */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Alimentos Inocuos</p>
              <p className="font-semibold text-gray-900">NIT 712.121.85-2</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Avalado por</p>
              <p className="font-semibold text-gray-900">Seccional de Salud de Antioquia CSO-2018</p>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Sistema seguro de validación | Todos los derechos reservados © 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Validacion;