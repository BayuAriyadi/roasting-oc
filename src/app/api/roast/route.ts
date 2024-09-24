import { NextResponse } from 'next/server';

const apiKey = process.env.API_KEY

export async function POST(req: Request) {
  try {
    const { name, age, description } = await req.json();
    const prompt = `Buat roasting yang tajam dan singkat untuk karakter OC berikut:
      - Nama: ${name}
      - Umur: ${age}
      - Deskripsi: ${description}
      
      Di awal kalimat kamu ngomong "oke kali ini OC yang bla bla bla"
      Roasting dari nama berdasarkan filosofinya, jika usia OC tersebut di bawah 16 tahun maka tuduh sang artist adalah seorang pedo, Berdasarkan deskripsinya Buat roasting ini lucu, kejam, dan sarkastik dalam bahasa Indonesia yang gaul dan kekinian, dan kaitkan sama karakter yang mirip dengan deskripsi sang OC, utamakan roasting deskripsi OC tersebut, lalu Sertakan kecurigaan jangan-jangan artistnya jarang menggambar!
      Roasting dengan Realistis dan Panjang. Jika usianya ratusan tahun, ejek dengan manhwa kultivasi dunia persilatan.
      Remehkan sang artist seperti menambahkan kata "dek!" kepada sang artist.
      Hanya roasting, tidak usah klarifikasi.`;

    const payload = {
      providers: "openai/gpt-4o-mini",
      text: prompt,
      chatbot_global_action: "Act as an commentator",
      previous_history: [],
      temperature: 0.5,
      max_tokens: 1000,
    };

    const headers = {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    };

    const response = await fetch("https://api.edenai.run/v2/text/chat", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Respons dari API:", data); // Cek isi data

    const roast = data['openai/gpt-4o-mini']?.generated_text || "Gagal menghasilkan roasting"; // Cek apakah generated_text ada
    return NextResponse.json({ roast });

  } catch (error) {
    console.error('Terjadi kesalahan saat memanggil API:', error);
    return NextResponse.json({ error: 'Gagal menghasilkan roasting' }, { status: 500 });
  }
}


