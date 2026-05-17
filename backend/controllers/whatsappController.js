// controllers/whatsappController.js
const axios = require('axios');

const WHATSAPP_TOKEN = "EAAX8XgMXGm0BRRmtT7sN0CXab9GzAFMErQR0DmNC4VKoPZAGgCZCyoX63ZAJoqy2IB1CgXLZCL152IFTle6eShwIHOqNhBXT6P7teqZCqQbuQY9zp7F50RGdOxCAiylF9WvWVxoX0pevQeGvphrQB5cnzpvPUo5blDYQ0MfcS4t88mQ9zZAzIfWf6r91hZCZArBUbLswPRydF8L684vGwiSE24fXNlOtW6IIBvaKnCAfypmiCnFZAE8G1XptO8LK8BMclHlmGasuG9DdVL6mYVeNc"; // Dashboard se copy kiya hua
const PHONE_NUMBER_ID = "1058056197399205"; // Dashboard se copy kiya hua
const ADMIN_NUMBER = "923238868040"; // Aapka number jahan alert chahiye

exports.sendOrderAlert = async (orderId, totalAmount) => {
    try {
        const url = `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`;
        
        await axios.post(url, {
            messaging_product: "whatsapp",
            to: ADMIN_NUMBER,
            type: "template",
            template: {
                name: "hello_world", // Testing ke liye default template
                language: { code: "en_US" }
            }
        }, {
            headers: { 'Authorization': `Bearer ${WHATSAPP_TOKEN}` }
        });
        console.log("WhatsApp Notification Sent!");
    } catch (error) {
        console.error("WhatsApp API Error", error.response?.data || error.message);
    }
};