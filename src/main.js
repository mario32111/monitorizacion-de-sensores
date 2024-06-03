const axios = require('axios');

// Reemplaza 'YOUR_CHANNEL_ID' con el ID de tu canal de ThingSpeak
const channelId = '2563010';
// Reemplaza 'YOUR_READ_API_KEY' con tu clave de API de lectura de ThingSpeak
const readApiKey = 'PPRG4PI8KZSKV8T9';

// URL de la API de ThingSpeak para obtener los últimos datos
const url = `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${readApiKey}&results=1`;

axios.get(url)
  .then(response => {
    // Aquí se obtiene la respuesta con los datos
    const feeds = response.data.feeds;
    
    if (feeds.length > 0) {
      const latestData = feeds[0];
      console.log('Últimos datos recibidos:');
      console.log(`Aceleración en X: ${latestData.field1}`);
      console.log(`Aceleración en Y: ${latestData.field2}`);
      console.log(`Aceleración en Z: ${latestData.field3}`);
      console.log(`Velocidad angular en X: ${latestData.field4}`);
      console.log(`Velocidad angular en Y: ${latestData.field5}`);
      console.log(`Velocidad angular en Z: ${latestData.field6}`);
    } else {
      console.log('No hay datos disponibles.');
    }
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });
