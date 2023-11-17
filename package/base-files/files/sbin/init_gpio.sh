#!/bin/sh

if [ ! -d /sys/class/gpio/gpio480 ]; then
    echo "480" > /sys/class/gpio/export
    echo "out" > /sys/class/gpio/gpio480/direction
	echo "0" > /sys/class/gpio/gpio480/value
fi

if [ ! -d /sys/class/gpio/gpio481 ]; then
    echo "481" > /sys/class/gpio/export
    echo "out" > /sys/class/gpio/gpio481/direction
	echo "0" > /sys/class/gpio/gpio481/value
fi

if [ ! -d /sys/class/gpio/gpio482 ]; then
    echo "482" > /sys/class/gpio/export
    echo "out" > /sys/class/gpio/gpio482/direction
	echo "0" > /sys/class/gpio/gpio482/value
fi

if [ ! -d /sys/class/gpio/gpio483 ]; then
    echo "483" > /sys/class/gpio/export
    echo "out" > /sys/class/gpio/gpio483/direction
	echo "0" > /sys/class/gpio/gpio483/value
fi


if [ ! -d /sys/class/gpio/gpio496 ]; then
    echo "496" > /sys/class/gpio/export
    echo "out" > /sys/class/gpio/gpio496/direction
	echo "1" > /sys/class/gpio/gpio496/value
fi