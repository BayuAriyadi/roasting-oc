import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  const { name, age, description } = await req.json();

  const prompt = `Roast an OC with the following details:
    - Name: ${name}
    - Age: ${age}
    - Description: ${description}
    
    Make the roast funny but not offensive.`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are an AI who loves to roast fictional characters.' },
          { role: 'user', content: prompt },
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const roast = response.data.choices[0].message.content;
    return NextResponse.json({ roast });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return NextResponse.json({ roast: 'Failed to generate roast. Please try again later.' }, { status: 500 });
  }
}
