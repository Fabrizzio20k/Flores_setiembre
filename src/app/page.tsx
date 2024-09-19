"use client";

import Flowers from "@/components/Flowers/Flowers";
import Bubbles from "@/components/Bubbles/Bubbles";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { FaCopy, FaWhatsapp, FaGithub } from "react-icons/fa";
import Link from "next/link";

const encodeBase64 = (text: string) => {
  return btoa(unescape(encodeURIComponent(text)));
};

const decodeBase64 = (encoded: string) => {
  try {
    return decodeURIComponent(escape(atob(encoded)));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return "...";
  }
};

function NameComponent() {
  const [name, setName] = useState("For you ❤️ My friend...");
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const encodedName = searchParams.get("name");
    if (encodedName) {
      const decodedName = decodeBase64(encodedName);
      setName(decodedName);
    }
  }, [searchParams]);

  const handleGenerateLink = () => {
    const encodedName = encodeBase64(name);
    return `${window.location.origin}${pathname}?name=${encodeURIComponent(
      encodedName
    )}`;
  };

  const handleCopyToClipboard = () => {
    const link = handleGenerateLink();
    navigator.clipboard.writeText(link).then(() => {
      alert("Enlace copiado al portapapeles!");
    });
  };

  const handleSendWhatsApp = () => {
    const link = handleGenerateLink();
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(link)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleUpdateUrl = () => {
    const encodedName = encodeBase64(name);
    const newUrl = `${pathname}?name=${encodeURIComponent(encodedName)}`;
    window.history.pushState(null, "", newUrl);
  };

  return (
    <div>
      <div className="absolute top-0 left-0 w-full h-full text-white z-50 font-josephsophia text-3xl sm:text-4xl md:text-5xl">
        <h1 className="h-full p-8">{name}</h1>
      </div>

      {/* Mostrar el cuadro de edición solo si no hay un query parameter */}
      {!searchParams.get("name") && (
        <div className="fixed bottom-1/4 right-4 z-50">
          <div className="bg-gray-900 bg-opacity-80 text-white rounded-lg p-4 shadow-lg flex flex-col items-center space-y-2">
            {/* Input para el nombre */}
            <input
              type="text"
              placeholder="Escribe un nombre"
              className="p-2 w-48 rounded-lg bg-transparent border-2 border-gray-400 focus:border-neon outline-none text-center placeholder-gray-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* Botón para copiar al portapapeles */}
            <button
              className="px-4 py-2 rounded-lg bg-neon w-full hover:bg-opacity-80 transition duration-300 flex justify-center items-center"
              onClick={handleCopyToClipboard}
            >
              <FaCopy className="mr-2" />
              Copiar
            </button>
            {/* Botón para mandar por WhatsApp */}
            <button
              className="px-4 py-2 rounded-lg bg-neon w-full hover:bg-opacity-80 transition duration-300 flex justify-center items-center"
              onClick={handleSendWhatsApp}
            >
              <FaWhatsapp className="mr-2" />
              WhatsApp
            </button>
            {/* Botón para actualizar la URL sin recargar */}
            <button
              className="px-4 py-2 rounded-lg bg-neon w-full hover:bg-opacity-80 transition duration-300 flex justify-center items-center"
              onClick={handleUpdateUrl}
            >
              Actualizar URL
            </button>
            <div className="flex flex-row">
              <Link href="https://github.com/Fabrizzio20k" className="flex flex-row space-x-1">
                <h2 className="text-xs text-gray-400">Made with ❤️ by Fabrizzio20k </h2>
                <FaGithub className="mr-2" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .bg-neon {
          background-color: #015952;
          border: 1px solid #00ffab;
        }
        .focus\:border-neon:focus {
          border-color: #00ffab;
        }
      `}</style>
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <div className="night"></div>
      <Flowers />
      <Bubbles />
      {/* Wrap the NameComponent with Suspense */}
      <Suspense fallback={<div>Loading...</div>}>
        <NameComponent />
      </Suspense>
    </div>
  );
}
