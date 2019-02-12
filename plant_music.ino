int lightSensor = A0;
int moistureSensor = A1;
int tempSensor = A2;
int minInput = 0;
int maxInput = 1023;

// int photoresistorSizeInSqInches = 0.20
// int photoresistorSizeInSqMeters = 0.00016129

void setup() {
  Serial.begin(9600);
}

void loop() {
  int moisture = toPercent(analogRead(moistureSensor));
  int light = toPercent(analogRead(lightSensor));
  int temp = toDegreesCelcius(analogRead(tempSensor));
  printJson(moisture, light, temp);
  delay(500);
}

void printJson(int moisture, int light, int temp) {
  Serial.print("{ \"moisture\": ");
  Serial.print(moisture);
  Serial.print(", \"light\": ");
  Serial.print(light);
  Serial.print(", \"temp\": ");
  Serial.print(temp);
  Serial.println(" }");
}

int toPercent(int value) {
  return map(value, minInput, maxInput, 0, 100);
}

int toDegreesCelcius(int temp) {
  float voltage = (temp / 1024.0) * 5.0;
  float temperature = (voltage - .5) * 100;
  return temperature;
}

