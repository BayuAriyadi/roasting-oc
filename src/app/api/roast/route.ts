import { NextResponse } from 'next/server';
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY, // Ambil API key dari environment variables
});

export async function POST(req: Request) {
  try {
    const { name, age, description } = await req.json();

    // Membangun prompt untuk roasting
    const prompt = `Buat roasting yang tajam dan singkat untuk karakter OC berikut:
      - Nama: ${name}
      - Umur: ${age}
      - Deskripsi: ${description}
      
      Roasting dari nama berdasarkan filosofinya, jika usia oc tersebut dibawah 16 tahun maka tuduh sang artist adalah seorang pedo, Berdasarkan deskripsinya Buat roasting ini lucu, kejam, dan sarkastik dalam bahasa Indonesia yang gaul dan kekinian, dan kaitkan sama karakter yang mirip dengan deskripsi sang OC, utamakan roasting deskripsi OC tersebut, lalu Sertakan kecurigaan jangan-jangan artistnya jarang menggambar!
      Roasting dengan Realistis dan Panjang. Jika usianya ratusan tahun, ejek dengan manhwa kultivasi dunia persilatan
      remehkan sang artist seperti menambahkan kata "dek!" kepada sang artist

      hanya roasting tidak usah klarifikasi`;

    console.log("Mengirim permintaan ke Cohere dengan prompt:", prompt);

    // Mengirim permintaan ke Cohere
    const response = await cohere.chat({
        model: 'command-r-plus-08-2024',
      message: prompt,
    });

    console.log("Respons dari API Cohere:", response);

    // Pastikan untuk mengambil teks dari respons
    const roast = response.text.replace(/"/g, ''); // Menghapus tanda petik ganda
    return NextResponse.json({ roast });

  } catch (error: any) {
    console.error('Kesalahan saat memanggil API Cohere:', error.message);
    return NextResponse.json({ error: 'Gagal menghasilkan roasting' }, { status: 500 });
  }
}
