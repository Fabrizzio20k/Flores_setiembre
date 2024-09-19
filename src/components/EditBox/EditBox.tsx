import { FaCopy, FaWhatsapp, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const extractYouTubeVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : null;
};

const encodeBase64 = (text: string) => {
    return btoa(unescape(encodeURIComponent(text)));
};

export default function EditBox({
    name,
    setName,
    setMusicId,
}: {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setMusicId: React.Dispatch<React.SetStateAction<string | null>>;
}) {
    const pathname = usePathname();
    const [musicUrl, setMusicUrl] = useState("");

    const handleGenerateLink = () => {
        const encodedName = encodeBase64(name);
        const videoId = extractYouTubeVideoId(musicUrl);
        return `${window.location.origin}${pathname}?name=${encodeURIComponent(encodedName)}&music=${encodeURIComponent(
            videoId || ""
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
        const videoId = extractYouTubeVideoId(musicUrl);
        const newUrl = `${pathname}?name=${encodeURIComponent(encodedName)}&music=${encodeURIComponent(videoId || "")}`;
        window.history.pushState(null, "", newUrl);
        setMusicId(videoId);
    };

    return (
        <div className="fixed bottom-20 right-4 z-50">
            <div className="bg-gray-900 bg-opacity-80 text-white rounded-lg p-4 shadow-lg flex flex-col items-center space-y-2">
                {/* Input para el nombre */}
                <label htmlFor="name" className="text-left text-xs w-full text-gray-300">
                    Escribe un mensaje
                </label>
                <input
                    type="text"
                    placeholder="Escribe un nombre"
                    className="p-2 w-48 rounded-lg bg-transparent border-2 border-gray-400 focus:border-neon outline-none text-center placeholder-gray-300"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="musicUrl" className="text-left text-xs w-full text-gray-300">
                    Enlace de YouTube (Opcional)
                </label>
                <input
                    type="text"
                    placeholder="Pega el enlace del video"
                    className="p-2 w-48 rounded-lg bg-transparent border-2 border-gray-400 focus:border-neon outline-none text-center placeholder-gray-300"
                    value={musicUrl}
                    onChange={(e) => setMusicUrl(e.target.value)} // Actualizar el enlace de YouTube ingresado
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
                    Vista previa
                </button>
                <div className="flex flex-row">
                    <Link href="https://github.com/Fabrizzio20k" className="flex flex-row space-x-1">
                        <h2 className="text-xs text-gray-400">
                            Made with ❤️ by <b>Fabrizzio20k</b>
                        </h2>
                        <FaGithub className="mr-2" />
                    </Link>
                </div>
            </div>

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
