#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>

#define SOUND_VELOCITY 0.034

const char *wifiSSID = "Wanto";
const char *wifiPassword = "12341234";

const String server = "https://trashtrack-api.irswanda.com";
const int subTrashBinId = 7;
const String url = server + "/api/sub-trash-bin/" + String(subTrashBinId) + "/capacity";

const int sensorTriggerPin = 5;
const int sensorEchoPin = 16;

const int updateDelay = 1000;

float maxCapacity;
float previousCapacity = 0;

void setup()
{
    Serial.begin(115200);
    delay(1000);

    pinMode(sensorTriggerPin, OUTPUT);
    pinMode(sensorEchoPin, INPUT);

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
        update();
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

float getSensorLength()
{
    return (pulseIn(sensorEchoPin, HIGH) * SOUND_VELOCITY / 2);
};

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

void update()
{
    activateSensor();
    const float currentCapacity = getSensorLength();
    const float value = abs(previousCapacity - currentCapacity);
    const boolean isValid = value <= 2;

    logLoop("Validate Capacity: " + String(previousCapacity) + " | " + String(currentCapacity) + " | " + String(value) + " | " + (isValid ? "Valid" : "Invalid"));
    if (isValid)
    {
        WiFiClientSecure client;
        client.setInsecure();

        HTTPClient request;

        logLoop("Updating At: " + url);
        request.begin(client, url);
        request.addHeader("Content-Type", "application/json");

        const int responseCode = request.PUT("{\"maxCapacity\": " + String(maxCapacity) + ", \"currentCapacity\": " + String(currentCapacity) + "}");

        logLoop("Updating Response: " + String(responseCode));
        if (responseCode > 0)
        {
            logLoop("Updating Result: " + request.getString());
        }
        else
        {
            logLoop("Failed To Update");
        };

        request.end();
    }
    else if (value >= 5)
    {
        delay(2000);
    }
    else if (value > 2)
    {
        delay(1000);
    };

    previousCapacity = currentCapacity;
}