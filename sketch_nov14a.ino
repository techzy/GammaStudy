void setup() {
  pinMode(14,INPUT_PULLUP); //  ANALOG SIGNAL 
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  int anaSignal = analogRead(14);
  Serial.println(anaSignal);
  delay(100);
}
