import { NextResponse } from 'next/server';
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY, // Ensure your API key is set correctly in the environment
});

export async function POST(req: Request) {
  try {
    const { name, age, description } = await req.json();

    // Build the prompt for roasting
    const prompt = `Buat roasting yang tajam dan singkat untuk karakter OC berikut:
      - Nama: ${name}
      - Umur: ${age}
      - Deskripsi: ${description}

      di awal kalimat kamu ngomong "oke kali ini OC yang bla bla bla"
      Roasting dari nama berdasarkan filosofinya, jika usia oc tersebut dibawah 16 tahun maka tuduh sang artist adalah seorang pedo, Berdasarkan deskripsinya Buat roasting ini lucu, kejam, dan sarkastik dalam bahasa Indonesia yang gaul dan kekinian, dan kaitkan sama karakter yang mirip dengan deskripsi sang OC, utamakan roasting deskripsi OC tersebut, lalu Sertakan kecurigaan jangan-jangan artistnya jarang menggambar!
      Roasting dengan Realistis dan Panjang. Jika usianya ratusan tahun, ejek dengan manhwa kultivasi dunia persilatan
      remehkan sang artist seperti menambahkan kata "dek!" kepada sang artist
      hanya roasting tidak usah klarifikasi`;

    console.log("Sending request to Cohere with prompt:", prompt);

    // Send the request to Cohere API
    const response = await cohere.chat({
      model: 'command-r-plus-08-2024', // Ensure this model is valid
      message: prompt,
    });

    console.log("Response from Cohere API:", response);

    // Extract the text from the API response
    const roast = response?.text?.replace(/"/g, '') || "Gagal menghasilkan roasting"; // Fallback message
    return NextResponse.json({ roast });

  } catch (error: unknown) { // Use `unknown` instead of `any`
    if (error instanceof Error) {
      console.error('Error while calling Cohere API:', error.message);
      return NextResponse.json({ error: 'Gagal menghasilkan roasting' }, { status: 500 });
    }
    console.error('Unexpected error', error);
    return NextResponse.json({ error: 'Gagal menghasilkan roasting' }, { status: 500 });
  }
}
