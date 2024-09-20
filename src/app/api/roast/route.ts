import { NextResponse } from 'next/server';
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY, // Pastikan API key sudah diatur di .env
});

export async function POST(req: Request) {
  try {
    const { name, age, description } = await req.json();

    // Bangun prompt untuk roasting
    const prompt = `Buat roasting yang tajam dan singkat untuk karakter OC berikut:
      - Nama: ${name}
      - Umur: ${age}
      - Deskripsi: ${description}

      Di awal kalimat kamu ngomong "oke kali ini OC yang bla bla bla"
      Roasting dari nama berdasarkan filosofinya, jika usia OC tersebut di bawah 16 tahun maka tuduh sang artist adalah seorang pedo, Berdasarkan deskripsinya Buat roasting ini lucu, kejam, dan sarkastik dalam bahasa Indonesia yang gaul dan kekinian, dan kaitkan sama karakter yang mirip dengan deskripsi sang OC, utamakan roasting deskripsi OC tersebut, lalu Sertakan kecurigaan jangan-jangan artistnya jarang menggambar!
      Roasting dengan Realistis dan Panjang. Jika usianya ratusan tahun, ejek dengan manhwa kultivasi dunia persilatan.
      Remehkan sang artist seperti menambahkan kata "dek!" kepada sang artist.
      Hanya roasting, tidak usah klarifikasi.`;

    console.log("Mengirim request ke Cohere dengan prompt:", prompt);

    // Kirim permintaan ke API Cohere
    const response = await cohere.chat({
      model: 'command-r-plus-08-2024', // Pastikan model ini valid
      message: prompt,
    });

    console.log("Respons dari Cohere API:", response);

    // Ambil teks dari respons API
    const roast = response?.text?.replace(/"/g, '') || "Gagal menghasilkan roasting";
    return NextResponse.json({ roast });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Terjadi kesalahan saat memanggil API Cohere:', error.message);
      return NextResponse.json({ error: 'Gagal menghasilkan roasting' }, { status: 500 });
    }
    console.error('Kesalahan tidak terduga', error);
    return NextResponse.json({ error: 'Gagal menghasilkan roasting' }, { status: 500 });
  }
}
