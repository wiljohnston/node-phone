import sys
import time
import RPi.GPIO as GPIO
import serial

serial_port = sys.argv[1]
baud_rate = sys.argv[2]

phone = serial.Serial(serial_port, baud_rate)
phone.flushInput()

power_key = 6

def power_on(phone, power_key):
  GPIO.setmode(GPIO.BCM)
  GPIO.setwarnings(False)
  GPIO.setup(power_key, GPIO.OUT)
  time.sleep(0.1)
  GPIO.output(power_key, GPIO.HIGH)
  time.sleep(2)
  GPIO.output(power_key, GPIO.LOW)
  time.sleep(20)
  phone.flushInput()

power_on(phone, power_key)
time.sleep(1)

while True:
  message = phone.readline()
  print(message)
  time.sleep(0.5)
