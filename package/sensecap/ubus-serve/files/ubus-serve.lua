#!/usr/bin/env lua

require "ubus"
require "uloop"

uloop.init()

local conn = ubus.connect()
if not conn then
        error("Failed to connect to ubus")
end

local gps_longitude_v = 0
local gps_latitude_v = 0
local gps_altitude_v = 0
local gps_time_v = 0
local gps_state_v = 0

local lora_tx_sum_v = 0
local lora_rx_sum_v = 0
local lora_report_time_v = 0
local lora_temperature_v = 0
local lora_state_v = 0

local net_state_v = 0

local lora_module_state = 1
local  lora_network_connect = {
        lora_pkt_fwd = 0,
        station = 0
}


local my_method = {
        sensecap = {
                gps = {
                        function(req, msg)
                                print("Call to function 'gps'")
                                for k, v in pairs(msg) do
                                        print("key=" .. k .. " value=" .. v)
                                        if( k == "longitude" )
                                        then
                                                gps_longitude_v = v
                                        end
                                        if( k == "latitude" )
                                        then
                                                gps_latitude_v = v
                                        end
                                        if( k == "altitude" )
                                        then
                                                gps_altitude_v = v
                                        end
                                        if( k == "state" )
                                        then
                                                gps_state_v = v
                                        end
                                        if( k == "gps_time" )
                                        then
                                                gps_time_v = v
                                        end
                                end
                                conn:reply(req, {longitude=gps_longitude_v,latitude=gps_latitude_v,altitude=gps_altitude_v,state=gps_state_v,gps_time=gps_time_v});
                        end, {longitude=ubus.STRING,latitude=ubus.STRING,altitude=ubus.STRING,state=ubus.INT8,gps_time=INT32}
                },
                lora = {
                        function(req, msg)
                                print("Call to function 'lora_statistics'")
                                for k, v in pairs(msg) do
                                        print("key=" .. k .. " value=" .. v)
                                        if( k == "rx_sum" )
                                        then
                                                lora_rx_sum_v = v
                                        end
                                        if( k == "tx_sum" )
                                        then
                                                lora_tx_sum_v = v
                                        end
                                        if( k == "temperature" )
                                        then
                                                lora_temperature_v = v
                                        end
                                        if( k == "report_time" )
                                        then
                                                lora_report_time_v = v
                                        end
                                        if( k == "state" )
                                        then
                                                lora_state_v = v
                                        end
                                end
                                conn:reply(req, {rx_sum=lora_rx_sum_v,tx_sum=lora_tx_sum_v,temperature=lora_temperature_v,report_time=lora_report_time_v,state=lora_state_v});
                        end, {rx_sum=ubus.INT32,tx_sum=ubus.INT32,temperature=ubus.STRING,report_time=ubus.INT32,state=ubus.INT8}
                },

                net_state = {
                        function(req, msg)
                                print("Calling function 'net_state'...")
                                for k, v in pairs(msg) do
                                        print("key=" .. k .. " value=" .. v)
                                        if k == "state" then
                                                net_state_v = v
                                        end
                                end
                                conn:reply(req, {state=net_state_v});
                        end, {state=ubus.INT8}
                },
                lora_network_connect = {
                        function(req, msg)
                                print("Call to function 'lora_network_connect'")
                                for k, v in pairs(msg) do
                                        print("key=" .. k .. " value=" .. v)
                                        if( k == "lora_pkt_fwd" )
                                        then
                                                lora_network_connect.lora_pkt_fwd = v
                                        end
                                        if( k == "station" )
                                        then
                                                lora_network_connect.station = v
                                        end
                                end
                                conn:reply(req, lora_network_connect);
                        end, {lora_pkt_fwd=ubus.INT8, station=ubus.INT8}

                },
                lora_module = {
                        function(req, msg)
                                print("Calling function 'lora_module'...")
                                for k, v in pairs(msg) do
                                        print("key=" .. k .. " value=" .. v)
                                        if k == "state" then
                                                lora_module_state = v
                                        end
                                end
                                conn:reply(req, {state=lora_module_state});
                        end, {state=ubus.INT8}
                }
        }
}

conn:add(my_method)

uloop.run()
