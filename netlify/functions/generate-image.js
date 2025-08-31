// Netlify Function for Gemini Image Generation
const { GoogleGenAI } = require('@google/genai');

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
        // Parse request body
        const { prompt, apiKey } = JSON.parse(event.body);
        
        if (!prompt) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Prompt is required' })
            };
        }
        
        if (!apiKey) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'API key is required' })
            };
        }

        // Initialize Gemini AI
        const ai = new GoogleGenAI({ apiKey });

        // Generate image
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
                aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
            
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
                body: JSON.stringify({ error: '이미지 생성에 실패했습니다.' })
            };
        }

    } catch (error) {
        console.error('Image generation error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: '이미지 생성 중 오류가 발생했습니다.',
                details: error.message 
            })
        };
    }
};