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
  
            const data = {
              accelerationX: latestData.field1,
              accelerationY: latestData.field2,
              accelerationZ: latestData.field3,
              angularVelocityX: latestData.field4,
              angularVelocityY: latestData.field5,
              angularVelocityZ: latestData.field6
            };
  
            console.log(data); // Imprime los datos en la consola o maneja los datos como prefieras
            
            // Mueve el cubo con los datos obtenidos
            moveCube(data.angularVelocityX, data.angularVelocityY, data.angularVelocityZ);
          } else {
            console.log('No hay datos disponibles.');
          }
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error);
        });
    };
  
    function moveCube(x, y, z) {
        const cube = document.querySelector('.cube');
        cube.style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;
    }

    // Ejecutar la función getData() cada segundo
    getData();
    setInterval(getData, 1000);
});
