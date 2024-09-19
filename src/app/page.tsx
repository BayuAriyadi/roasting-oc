"use client";
import { useState } from "react";
import axios from "axios";
import { FaGithub, FaFacebook } from "react-icons/fa"; // Import icon dari react-icons

// Array gambar acak
const randomImages = [
  "/img/bensin-habis.jpg",
  "/img/biar-apa.jpg",
  "/img/bising-bodo.jpg",
  "/img/dongo.jpg",
  "/img/kecewa-berat.jpg",
  "/img/kurang-jelas.jpg",
  "/img/logikanya-dimana.jpg",
  "/img/malas.jpg",
  "/img/njir.jpg",
  "/img/pfft.jpg",
  "/img/pura-pura-galiat.jpg",
  "/img/reaksi-saya.jpg",
  "/img/reaksi-saya.jpg",
  "/img/spgnbb.jpg"
];

export default function Home() {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number | "">(""); // Initial state bisa kosong atau angka
  const [description, setDescription] = useState<string>("");
  const [roast, setRoast] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showRoast, setShowRoast] = useState<boolean>(false); // Untuk mengontrol kapan roast muncul dengan animasi
  const [randomImage, setRandomImage] = useState<string>(""); // State untuk gambar acak

  const handleRoast = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setShowRoast(false); // Sembunyikan roast saat proses pengambilan data
    try {
      const response = await axios.post("/api/roast", {
        name,
        age,
        description,
      });
      setRoast(response.data.roast);

      // Pilih gambar acak
      const randomImg = randomImages[Math.floor(Math.random() * randomImages.length)];
      setRandomImage(randomImg); // Atur gambar acak
      setTimeout(() => setShowRoast(true), 500); // Tampilkan hasil roasting dengan delay
    } catch (error) {
      console.error("Error generating roast:", error);
      setRoast("Maaf, terjadi kesalahan dalam menghasilkan roasting.");
      setShowRoast(true);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 fade-in">
        <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
          Roasting OC Luwh
        </h1>
        <form
          onSubmit={handleRoast}
          className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg flex flex-col space-y-4 fade-in"
        >
          <input
            type="text"
            placeholder="Nama OC"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            required
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Umur OC"
            value={age}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAge(Number(e.target.value))
            }
            required
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Deskripsi OC"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
            required
            rows={4}
            className="p-3 border border-gray-300 rounded-lg w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Generating Roast... " : "Roast!"}
          </button>
        </form>

        {showRoast && (
          <div className="mt-6 bg-gray-50 p-4 rounded shadow-lg w-full max-w-lg overflow-hidden break-words fade-in">
            <h2 className="text-2xl font-semibold mb-4 text-red-600">
              Hasil Roasting:
            </h2>
            <div className="text-left text-lg break-words max-w-full">
              {roast}
            </div>
            {/* Menampilkan gambar acak di bawah teks roast */}
            <div className="mt-4">
              <img
                src={randomImage}
                alt="Random"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-transparent p-4 text-center">
      <div className="flex items-center justify-center space-x-4">
        {/* GitHub Link */}
        <a
          href="https://github.com/BayuAriyadi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-800 flex items-center"
        >
          <FaGithub className="text-2xl mr-2" />
          <span>Bayu Ariyadi</span>
        </a>

        {/* Facebook Link */}
        <a
          href="https://facebook.com/bayu.ariyadi.fuujin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-800 flex items-center"
        >
          <FaFacebook className="text-2xl mr-2" />
          <span>Bayu Ariyadi</span>
        </a>
      </div>
    </footer>
    </div>
  );
}
