"use client";

import Flowers from "@/components/Flowers/Flowers";
import Bubbles from "@/components/Bubbles/Bubbles";
import { useState } from "react";

export default function Page() {
  const [name, setName] = useState("N...");

  const handleDownload = () => {
    alert(`Descargando imagen para ${name}`);
  };

  return (
    <div>
      <div className="night"></div>
      <Flowers />
      <Bubbles />
      <div className="absolute top-0 left-0 w-full h-full text-white z-50 font-josephsophia text-5xl">
        {/* Utiliza la variable `name` aquí */}
        <h1 className="h-full p-8 test">For u ❤️ {name}</h1>
      </div>
      {/* Interfaz independiente */}
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
          {/* Botón para descargar */}
          <button
            className="px-4 py-2 rounded-lg bg-neon text-black hover:bg-opacity-80 transition duration-300"
            onClick={handleDownload}
          >
            Descargar
          </button>
        </div>
      </div>
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
