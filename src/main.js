document.addEventListener('DOMContentLoaded', function() {
  // Reemplaza 'YOUR_CHANNEL_ID' con el ID de tu canal de ThingSpeak
  const channelId = '2563010';
  // Reemplaza 'YOUR_READ_API_KEY' con tu clave de API de lectura de ThingSpeak
  const readApiKey = 'PPRG4PI8KZSKV8T9';

  const getData = () => {
    // URL de la API de ThingSpeak para obtener los últimos datos
    const url = `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${readApiKey}&results=1`;

    axios.get(url)
      .then(response => {
        // Aquí se obtiene la respuesta con los datos
        const feeds = response.data.feeds;

        if (feeds.length > 0) {
          const latestData = feeds[0];
          const dataDiv = document.getElementById('data');

          const dataHtml = `
            <p><strong>Últimos datos recibidos:</strong></p>
            <p>Aceleración en X: ${latestData.field1}</p>
            <p>Aceleración en Y: ${latestData.field2}</p>
            <p>Aceleración en Z: ${latestData.field3}</p>
            <p>Velocidad angular en X: ${latestData.field4}</p>
            <p>Velocidad angular en Y: ${latestData.field5}</p>
            <p>Velocidad angular en Z: ${latestData.field6}</p>
          `;

          dataDiv.innerHTML = dataHtml;
        } else {
          dataDiv.innerHTML = '<p>No hay datos disponibles.</p>';
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
        document.getElementById('data').innerHTML = '<p>Error al obtener los datos.</p>';
      });
  };

  // Ejecutar la función getData() cada dos segundos
  getData();
  setInterval(getData, 1000);
});
