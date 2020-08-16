import sys
import RPi.GPIO as GPIO
import serial
import time

serial_port = sys.argv[1]
baud_rate = sys.argv[2]
command = sys.argv[3]

phone = serial.Serial(serial_port, baud_rate)
phone.flushInput()

phone.write((command + '\r\n').encode())