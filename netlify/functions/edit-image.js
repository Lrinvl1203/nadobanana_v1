// Netlify Function for Gemini Image Editing
const { GoogleGenAI, Modality } = require('@google/genai');

exports.handler = async (event, context) => {
    // CORS Headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // Get API key from environment variables
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'API key not configured' })
            };
        }

        // Parse request body
        const { imageData, prompt } = JSON.parse(event.body);
        if (!imageData || !prompt) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Image data and prompt are required' })
            };
        }

        // Extract base64 data from data URI
        const parts = imageData.split(',');
        if (parts.length !== 2) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: '유효하지 않은 이미지 데이터입니다.' })
            };
        }

        const mimeType = parts[0].match(/:(.*?);/)?.[1] || 'image/png';
        const base64Data = parts[1];

        // Initialize Gemini AI
        const ai = new GoogleGenAI({ apiKey });

        // Edit image
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Data,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

        if (imagePart && imagePart.inlineData) {
            const base64ImageBytes = imagePart.inlineData.data;
            const imageUrl = `data:${imagePart.inlineData.mimeType};base64,${base64ImageBytes}`;
            
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ 
                    imageUrl,
                    prompt 
                })
            };
        } else {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: '이미지 수정에 실패했습니다.' })
            };
        }

    } catch (error) {
        console.error('Image edit error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: '이미지 수정 중 오류가 발생했습니다.',
                details: error.message 
            })
        };
    }
};