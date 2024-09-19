import { NextResponse } from 'next/server';
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { name, age, description } = await req.json();

    const prompt = `Buat roasting yang tajam dan lucu untuk karakter OC ini:
      - Nama: ${name}
      - Umur: ${age}
      - Deskripsi: ${description}

Contoh gaya roasting: "Nama ini lebih cocok untuk karakter dalam sinetron yang gagal tayang. Usianya 20, tapi dengan semua deskripsi ini, dia sepertinya sudah melalui krisis identitas sebelum waktunya. Saran: mendingan jangan terjun ke dunia nyata, atau semua orang bakal minta refund!" 

Buat roasting ini singkat, gunakan bahasa indonesia yang gaul dan kekinian, dengan kalimat yang mengena dan sarkastik.`;

    console.log("Mengirim permintaan ke Cohere dengan prompt:", prompt);

    const generate = await cohere.generate({
      prompt: prompt,
      maxTokens: 150, // Batasi jumlah token untuk hasil yang lebih pendek
      temperature: 1.2, // Tingkat kreativitas yang lebih tinggi
    });

    console.log("Respons dari API Cohere:", generate);

    const roast = generate.generations[0].text; // Mengambil teks hasil
    return NextResponse.json({ roast });

  } catch (error: any) {
    console.error('Kesalahan saat memanggil API Cohere:', error.message);
    return NextResponse.json({ roast: 'Gagal menghasilkan roasting. Silakan coba lagi nanti.' }, { status: 500 });
  }
}
