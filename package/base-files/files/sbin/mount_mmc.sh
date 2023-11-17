#!/bin/sh

MOUNT_PATH="/mnt/mmcblk0"
DEV_PATH="/dev/mmcblk0p1"

if [ -b "${DEV_PATH}" ] ;then
    if [ ! -d "${MOUNT_PATH}" ]; then
        /bin/mkdir -p ${MOUNT_PATH}
    fi

    /bin/mount ${DEV_PATH} ${MOUNT_PATH}
fi