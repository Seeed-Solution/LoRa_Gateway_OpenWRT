#!/bin/sh

#LTE_POWER_PIN=0
#LTE_RESET_PIN=19
#LTE_PWRKEY_PIN=41
LTE_POWER_PIN=480
LTE_RESET_PIN=499
LTE_PWRKEY_PIN=457

# PowerKey
if [ ! -d "/sys/class/gpio/gpio${LTE_PWRKEY_PIN}" ]; then
	echo "${LTE_PWRKEY_PIN}" > /sys/class/gpio/export
	echo "out" > /sys/class/gpio/gpio${LTE_PWRKEY_PIN}/direction
fi
echo "1" > /sys/class/gpio/gpio${LTE_PWRKEY_PIN}/value

# PowerOn
if [ ! -d "/sys/class/gpio/gpio${LTE_POWER_PIN}" ]; then
	echo "${LTE_POWER_PIN}" > /sys/class/gpio/export
	echo "out" > /sys/class/gpio/gpio${LTE_POWER_PIN}/direction
fi
echo "1" > /sys/class/gpio/gpio${LTE_POWER_PIN}/value

# Reset
if [ ! -d "/sys/class/gpio/gpio${LTE_RESET_PIN}" ]; then
	echo "${LTE_RESET_PIN}" > /sys/class/gpio/export
	echo "out" > /sys/class/gpio/gpio${LTE_RESET_PIN}/direction
fi

echo "1" > /sys/class/gpio/gpio${LTE_RESET_PIN}/value
sleep 1
echo "0" > /sys/class/gpio/gpio${LTE_RESET_PIN}/value

i=0
while [ $i -lt 60 ]
do
	[ -n "$(cat /proc/net/dev | grep wwan0)" ] && break
	sleep 1
	let i++
done

exit 0