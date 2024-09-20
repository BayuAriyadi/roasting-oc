"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

// Definisikan tipe untuk kontributor dari API GitHub
interface Contributor {
  id: number;
  login: string;
  html_url: string;
  avatar_url: string;
  bio?: string; // Bio bisa jadi tidak ada
}

export default function About() {
  const [contributors, setContributors] = useState<Contributor[]>([]);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/BayuAriyadi/roasting-oc/contributors"
        );
        const data: Contributor[] = await response.json();

        // Mengambil bio untuk setiap kontributor
        const contributorsWithBio = await Promise.all(
          data.map(async (contributor) => {
            const userResponse = await fetch(
              `https://api.github.com/users/${contributor.login}`
            );
            const userData = await userResponse.json(); // Mendapatkan data pengguna

            // Kembalikan objek kontributor dengan bio
            return {
              ...contributor,
              bio: userData.bio || "No bio available", // Ambil bio dari data pengguna
            };
          })
        );

        setContributors(contributorsWithBio);
      } catch (error) {
        console.error("Error fetching contributors:", error);
      }
    };

    fetchContributors();
  }, []);

  return (
    <div className="">
      <Navbar />
      <div className="bg-white shadow-lg p-5 md:p-8 text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          About This Website
        </h1>
        <p className="text-sm md:text-base leading-relaxed text-gray-700 mb-6">
          Website ini dibuat khusus untuk seru-seruan dan lucu-lucuan! Di sini,
          kamu bisa menemukan roasting untuk karakter OC (Original Character)
          yang kamu buat. Ingat, semua ini hanya untuk hiburan, jadi jangan
          baper ya! Kita hanya ingin bikin kamu ketawa dan menikmati prosesnya.
          Selamat bersenang-senang!
        </p>

        <h2 className="text-xl md:text-2xl font-bold mb-4">Top Contributors</h2>
        <div className="flex justify-center flex-wrap gap-4">
          {contributors.length > 0 ? (
            contributors.map((contributor) => (
              <div key={contributor.id} className="card w-60 shadow-xl">
                <figure className="px-6 pt-6">
                  <Image
                    src={contributor.avatar_url}
                    alt={`${contributor.login}'s avatar`}
                    width={150}
                    height={150}
                    className="rounded-xl"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-lg">{contributor.login}</h2>
                  <p className="text-sm">{contributor.bio}</p>{" "}
                  {/* Menampilkan bio */}
                  <div className="card-actions">
                    <button className="btn bg-customButton hover:bg-customButtonHover">
                      <a
                        href={contributor.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Profile
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <li className="text-gray-500">Loading contributors...</li>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
