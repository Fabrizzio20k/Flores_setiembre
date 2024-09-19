"use client";

import Flowers from "@/components/Flowers/Flowers";
import Bubbles from "@/components/Bubbles/Bubbles";
import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

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

export default function Page() {
  const [name, setName] = useState("N...");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const encodedName = searchParams.get("name");
    if (encodedName) {
      const decodedName = decodeBase64(encodedName);
      setName(decodedName);
    }
  }, [searchParams]);

  const handleGenerateLink = () => {
    const encodedName = encodeBase64(name);
    const newUrl = `${pathname}?name=${encodeURIComponent(encodedName)}`;
    router.push(newUrl);
  };

  return (
    <div>
      <div className="night"></div>
      <Flowers />
      <Bubbles />
      <div className="absolute top-0 left-0 w-full h-full text-white z-50 font-josephsophia text-5xl">
        {/* Utiliza la variable `name` aquí */}
        <h1 className="h-full p-8">For u ❤️ {name}</h1>
      </div>

      {/* Mostrar el cuadro de edición solo si no hay un query parameter */}
      {!searchParams.get("name") && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-gray-900 bg-opacity-80 text-white rounded-lg p-4 shadow-lg flex flex-col items-center space-y-2">
            {/* Input para el nombre */}
            <input
              type="text"
              placeholder="Escribe un nombre"
              className="p-2 w-48 rounded-lg bg-transparent border-2 border-gray-400 focus:border-neon outline-none text-center placeholder-gray-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* Botón para generar el link */}
            <button
              className="px-4 py-2 rounded-lg bg-neon text-black hover:bg-opacity-80 transition duration-300"
              onClick={handleGenerateLink}
            >
              Generar Link
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .bg-neon {
          background-color: #00ffab; /* Color neón */
        }
        .focus\:border-neon:focus {
          border-color: #00ffab;
        }
      `}</style>
    </div>
  );
}
