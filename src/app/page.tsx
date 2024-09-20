// src/app/page.tsx
 "use client"
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Input from "./components/Form/Input";
import TextArea from "./components/Form/TextArea";
import SubmitButton from "./components/Form/SubmitButton";

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
  "/img/spgnbb.jpg",
];

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>(""); // Ubah `age` jadi string
  const [description, setDescription] = useState<string>("");
  const [roast, setRoast] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showRoast, setShowRoast] = useState<boolean>(false);

  const images = randomImages[Math.floor(Math.random() * randomImages.length)];

  const handleRoast = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setShowRoast(false);

    const parsedAge = Number(age); // Konversi umur menjadi number
    if (isNaN(parsedAge)) {
      console.error("Umur harus berupa angka.");
      setRoast("Umur harus berupa angka.");
      setShowRoast(true);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/roast", {
        name,
        age: parsedAge, // Kirim umur sebagai number
        description,
      });
      setRoast(response.data.roast);
      setTimeout(() => setShowRoast(true), 500);
    } 
    /* eslint-disable @typescript-eslint/no-unused-vars */
    catch (error) {
      setRoast("Maaf, terjadi kesalahan dalam menghasilkan roasting.");
      setShowRoast(true);
    }
    setLoading(false);
  };

  return (
    <div className="bg-customPink">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen p-4 fade-in">
        <div className="relative w-full max-w-lg mb-8">
          <h1 className="glow-text text-4xl font-bold text-blue-600 text-center relative z-10">
            Roasting OC Luwh
          </h1>

          <Image
            src="/img/mitsuki.png" // Ganti dengan path gambar yang benar
            alt="Anime Character"
            width={100}
            height={100}
            className="absolute -bottom-8 right-0 w-auto h-auto"
          />
        </div>

        <form onSubmit={handleRoast} className="bg-customForm shadow-md rounded-lg p-6 w-full max-w-lg flex flex-col space-y-4 fade-in">
          <Input
            value={name}
            isDarkMode={isDarkMode}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama OC"
          />
          <Input
            value={age}
            isDarkMode={isDarkMode} // Pastikan `age` adalah string
            onChange={(e) => setAge(e.target.value)} // Simpan sebagai string
            placeholder="Umur OC"
          />
          <TextArea
            value={description}
            isDarkMode={isDarkMode}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Deskripsi OC"
          />
          <SubmitButton loading={loading} />
        </form>

        {showRoast && (
          <div className="mt-6 bg-gray-50 p-4 rounded shadow-lg w-full max-w-lg overflow-hidden break-words fade-in">
            <h2 className="text-2xl font-semibold mb-4 text-red-600">
              Hasil Roasting:
            </h2>
            <div className="text-left text-md break-words max-w-full">
              {roast}
            </div>
            <div className="mt-4">
              <Image
                src={images}
                alt="Roasting Reaction"
                width={500}
                height={300}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
