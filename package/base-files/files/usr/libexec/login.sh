#!/bin/sh

[ "$(uci -q get system.@system[0].ttylogin)" = 1 ] || exec /bin/login

exec /bin/login
