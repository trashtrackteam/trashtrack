#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>
#include <Servo.h>

#define SOUND_VELOCITY 0.034

const char *wifiSSID = "AULA_BPP";
const char *wifiPassword = "#aula@2023";

const String server = "https://trashtrack-api.irswanda.com";

const int logamSubTrashBinId = 4;
const int logamSensorTriggerPin = 16;
const int logamSensorEchoPin = 5;
Servo logamServo;
const int logamServoPin = 10;

const int nonLogamSubTrashBinId = 2;
const int nonLogamSensorTriggerPin = 4;
const int nonLogamSensorEchoPin = 0;
Servo nonLogamServo;
const int nonLogamServoPin = 9;

const int inductiveSensorPin = 2;

const int updateDelay = 5000;

void setup()
{
    Serial.begin(115200);
    delay(1000);

    pinMode(logamSensorTriggerPin, OUTPUT);
    pinMode(logamSensorEchoPin, INPUT);
    logamServo.attach(logamServoPin);

    pinMode(nonLogamSensorTriggerPin, OUTPUT);
    pinMode(nonLogamSensorEchoPin, INPUT);
    nonLogamServo.attach(nonLogamServoPin);

    pinMode(inductiveSensorPin, INPUT);

    WiFi.mode(WIFI_STA);
    WiFi.begin(wifiSSID, wifiPassword);

    logSetup("Connecting To SSID: " + String(wifiSSID));
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
    };

    logSetup("Connected To IP Address: " + String(WiFi.localIP().toString().c_str()));

    calibrate();
    Serial.println();
};

void loop()
{
    if (WiFi.status() == WL_CONNECTED)
    {
        // update();
    };

    Serial.println();
    delay(updateDelay);
};

void logSetup(String text)
{
    Serial.println("[setup] " + text);
};

void logLoop(String text)
{
    Serial.println("[loop] " + text);
};

void activateSensor()
{
    digitalWrite(sensorTriggerPin, LOW);
    delayMicroseconds(2);
    digitalWrite(sensorTriggerPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(sensorTriggerPin, LOW);
};

// float getSensorLength()
// {
//     return (pulseIn(sensorEchoPin, HIGH) * SOUND_VELOCITY / 2);
// };

void calibrate()
{
    WiFiClientSecure client;
    client.setInsecure();

    HTTPClient request;

    logSetup("Calibrating At: " + url);
    request.begin(client, url);
    request.addHeader("Content-Type", "application/json");

    activateSensor();

    maxCapacity = getSensorLength();

    logSetup("Calibrating Max Capacity: " + String(maxCapacity) + " cm");

    const int responseCode = request.PUT("{\"maxCapacity\": " + String(maxCapacity) + ", \"currentCapacity\": " + String(maxCapacity) + "}");

    logSetup("Calibrating Response: " + String(responseCode));
    if (responseCode > 0)
    {
        logSetup("Calibrating Result: " + request.getString());
    }
    else
    {
        logSetup("Failed To Calibrate");
    };

    request.end();
}

// void update()
// {
//     activateSensor();
//     const float currentCapacity = getSensorLength();
//     const float value = abs(previousCapacity - currentCapacity);
//     const boolean isValid = value <= 2;

//     logLoop("Validate Capacity: " + String(previousCapacity) + " | " + String(currentCapacity) + " | " + String(value) + " | " + (isValid ? "Valid" : "Invalid"));
//     if (isValid)
//     {
//         WiFiClientSecure client;
//         client.setInsecure();

//         HTTPClient request;

//         logLoop("Updating At: " + url);
//         request.begin(client, url);
//         request.addHeader("Content-Type", "application/json");

//         const int responseCode = request.PUT("{\"maxCapacity\": " + String(maxCapacity) + ", \"currentCapacity\": " + String(currentCapacity) + "}");

//         logLoop("Updating Response: " + String(responseCode));
//         if (responseCode > 0)
//         {
//             logLoop("Updating Result: " + request.getString());
//         }
//         else
//         {
//             logLoop("Failed To Update");
//         };

//         request.end();
//     }
//     else if (value >= 5)
//     {
//         delay(2000);
//     }
//     else if (value > 2)
//     {
//         delay(1000);
//     };

//     previousCapacity = currentCapacity;
// }