'use client';
import { useMe } from "./hooks/useAuth";
import { useRef, useState } from "react";

export default function Home() {
  const { data, error, isError} = useMe()
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Aquí puedes agregar la lógica de carga del archivo
      console.log('Archivo seleccionado:', file);
      setTimeout(() => setIsUploading(false), 1000);
    }
  };

  return (
    <div>
      { isError? <div>
          fallo
        </div> : <div id="home" style={{
          background: 'linear-gradient(135deg, #2d1b4e 0%, #3d2d6b 50%, #1e3c72 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          padding: '1rem',
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            padding: '3rem',
            width: '100%',
            maxWidth: '700px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            gap: '3rem',
            alignItems: 'center',
          }}>
            {/* Contenedor derecho con botón */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}>
              <div>
                <h2 style={{
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  margin: '0 0 0.5rem 0',
                }}>
                  Sube tu contenido
                </h2>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.95rem',
                  margin: 0,
                }}>
                  Haz clic en el botón para seleccionar una imagen
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              <button
                onClick={handleUploadClick}
                disabled={isUploading}
                style={{
                  padding: '0.875rem 1.5rem',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  letterSpacing: '0.05em',
                  background: isUploading ? 'rgba(147, 51, 234, 0.5)' : 'linear-gradient(135deg, #6b3dd6 0%, #3b82f6 100%)',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  cursor: isUploading ? 'not-allowed' : 'pointer',
                  opacity: isUploading ? 0.6 : 1,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: '0 4px 15px rgba(107, 61, 214, 0.4)',
                  textAlign: 'center',
                }}
                onMouseEnter={(e) => {
                  if (!isUploading) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(107, 61, 214, 0.6)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isUploading) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(107, 61, 214, 0.4)';
                  }
                }}
              >
                {isUploading ? 'CARGANDO...' : 'SUBIR IMAGEN'}
              </button>
            </div>
          </div>
        </div> }
    </div>
  );
}
