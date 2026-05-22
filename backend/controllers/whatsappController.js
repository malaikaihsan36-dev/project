// controllers/whatsappController.js
const axios = require('axios');

// Environment variables load kar rahe hain
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

/**
 * 1. Customer ko Order Notification bhejne ka function
 */
exports.sendCustomerNotification = async (customerNumber, orderId) => {
    try {
        const url = `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`;
        
        // WhatsApp API hamesha 923xxxxxxxxx format accept karta hai (bina + ya spaces ke)
        const formattedNumber = customerNumber.replace(/[^0-9]/g, '');

        const payload = {
            messaging_product: "whatsapp",
            to: formattedNumber,
            type: "template",
            template: {
                name: "hello_world", // Abhi testing ke liye default, baad mein aapka custom template hoga
                language: { code: "en_US" }
            }
        };

        const response = await axios.post(url, payload, {
            headers: {
                'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        console.log(`Notification sent to ${formattedNumber}:`, response.data);
        return true;
    } catch (error) {
        console.error("WhatsApp Send Error:", error.response ? error.response.data : error.message);
        return false;
    }
};

/**
 * 2. Auto-Responder function (Tarika 1: No-Reply Message)
 */
exports.handleIncomingWebhook = async (req, res) => {
    try {
        // Meta Webhook verification challenge (sirf pehli baar setup ke liye zaroori hota hai)
        if (req.method === 'GET') {
            const mode = req.query['hub.mode'];
            const token = req.query['hub.verify_token'];
            const challenge = req.query['hub.challenge'];

            // Aap Meta dashboard par koi bhi verify token rakh sakte hain, e.g., 'colourpix_secret'
            if (mode && token === 'colourpix_secret') {
                return res.status(200).send(challenge);
            }
            return res.sendStatus(403);
        }

        // Agar customer ka real message aaye (POST Request)
        const entry = req.body.entry?.[0];
        const changes = entry?.changes?.[0];
        const message = changes?.value?.messages?.[0];

        if (message) {
            const customerNumber = message.from; // Customer ka number jisne reply kiya

            // Auto-reply text payload
            const url = `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`;
            const replyPayload = {
                messaging_product: "whatsapp",
                to: customerNumber,
                type: "text",
                text: {
                    body: "🚫 This is an automated no-reply notification channel. For any queries, pricing changes, or to chat live with our team, please visit your ColourPix Web Dashboard."
                }
            };

            await axios.post(url, replyPayload, {
                headers: { 'Authorization': `Bearer ${WHATSAPP_TOKEN}` }
            });

            console.log(`Auto-reply sent to ${customerNumber}`);
        }

        // Meta ko 200 OK dena zaroori hai warna wo baar baar bhejta rahega
        res.status(200).send('EVENT_RECEIVED');
    } catch (error) {
        console.error("Webhook Error:", error.message);
        res.status(200).send('EVENT_RECEIVED'); // Error par bhi 200 dein taake Meta loop na kare
    }
};