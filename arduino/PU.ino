#include "Wire.h"
#include "MPU6050.h"
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "Redmi Note 8";
const char* password = "webitooo32";
const char* server = "http://api.thingspeak.com/update";
const char* apiKey = "M0ATTRMCW8Q70JLY";

MPU6050 mpu;

void setup() {
  Serial.begin(115200);
  Wire.begin();

  // Conectar a WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Inicia la comunicación con el MPU6050
  Serial.println("Iniciando el MPU6050...");
  mpu.initialize();
  
  // Verifica la conexión
  if (mpu.testConnection()) {
    Serial.println("MPU6050 conectado correctamente");
  } else {
    Serial.println("Error al conectar el MPU6050");
  }
}

void loop() {
  // Variables para almacenar los valores del acelerómetro y giroscopio
  int16_t ax, ay, az;
  int16_t gx, gy, gz;

  // Obtiene los valores del acelerómetro y giroscopio
  mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);

  // Imprime los valores del acelerómetro
  Serial.print("Acelerómetro: ");
  Serial.print("X: "); Serial.print(ax); Serial.print(" ");
  Serial.print("Y: "); Serial.print(ay); Serial.print(" ");
  Serial.print("Z: "); Serial.println(az);

  // Imprime los valores del giroscopio
  Serial.print("Giroscopio: ");
  Serial.print("X: "); Serial.print(gx); Serial.print(" ");
  Serial.print("Y: "); Serial.print(gy); Serial.print(" ");
  Serial.print("Z: "); Serial.println(gz);

  // Enviar datos a ThingSpeak
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = String(server) + "?api_key=" + apiKey +
                 "&field1=" + String(ax) +
                 "&field2=" + String(ay) +
                 "&field3=" + String(az) +
                 "&field4=" + String(gx) +
                 "&field5=" + String(gy) +
                 "&field6=" + String(gz);
    http.begin(url);
    int httpCode = http.GET();
    if (httpCode > 0) {
      Serial.println("Data sent to ThingSpeak");
    } else {
      Serial.println("Error in sending data");
    }
    http.end();
  }

  delay(60000); // Enviar datos cada minuto
}

