'use strict';
'require view';
'require dom';
'require fs';
'require ui';
'require uci';
'require rpc';
'require form';
'require poll';
'require request';
'require network';


var eui;

var packet_forwarder = {
  view: function (m) {

    //Packet Forwarder
    var gateway_conf_s = m.section(form.TypedSection, 'gateway_conf', _('Packet Forwarder Settings'));
    gateway_conf_s.anonymous = true;

    gateway_conf_s.tab('general', _('General Settings'));
    gateway_conf_s.tab('interval', _('Intervals Settings'));
    gateway_conf_s.tab('beacon', _('Beacon Settings'));
    gateway_conf_s.tab('gps', _('GPS Information'));
    gateway_conf_s.tab('forward', _('Forward Rules'));

    // general tab
    var gweui= gateway_conf_s.taboption("general", form.Value, "gateway_ID", _("Gateway EUI"))
    gweui.datatype = 'length(16)';
    gweui.default= eui;
    gweui.rmempty= false;

    var ttn_addr = gateway_conf_s.taboption("general", form.Value, "server_address", _("Server Address"));
    
    ttn_addr.value("eu1.cloud.thethings.network", "eu1.cloud.thethings.network");
    ttn_addr.value("nam1.cloud.thethings.network", "nam1.cloud.thethings.network");
    ttn_addr.default="eu1.cloud.thethings.network";
    ttn_addr.rmempty= false;
    ttn_addr.datatype='or(ipaddr,hostname)';

    var serv_port_up = gateway_conf_s.taboption("general", form.Value, "serv_port_up", _("Server Port (Up)"));
    serv_port_up.default="1700";
    serv_port_up.rmempty= false;
    serv_port_up.datatype = "port";

    var serv_port_down = gateway_conf_s.taboption("general", form.Value, "serv_port_down", _("Server Port (Down)"));
    serv_port_down.default="1700";
    serv_port_down.rmempty= false;
    serv_port_down.datatype = "port";

    // interval tab
    var keepalive_interval = gateway_conf_s.taboption("interval", form.Value, "keepalive_interval", _("Keep Alive Interval (s)"))
    keepalive_interval.default = "5"
    keepalive_interval.rmempty= false;
    keepalive_interval.datatype = "uinteger"

    var push_timeout_ms = gateway_conf_s.taboption("interval", form.Value, "push_timeout_ms", _("Push Timeout (ms)"))
    push_timeout_ms.default = "950"    
    push_timeout_ms.datatype = "uinteger"


    var stat_interval = gateway_conf_s.taboption("interval", form.Value, "stat_interval", _("Statistic Interval (s)"))
    stat_interval.default = "30";
    stat_interval.datatype = "uinteger";

    // beacon tab
    var beacon_period_validate = function(section_id, value) {
      if (value > 0  &&  value < 6) {
        return "Invalid value for Beacon period, must be >= 6 seconds.";
      } else {
        return true
      }
    }

    var beacon_period = gateway_conf_s.taboption("beacon", form.Value, "beacon_period", _("Beacon Period"), _("Setting this value to 0 disables class B beacon."))
    beacon_period.default = "0";  /* disable class B beacon */
    beacon_period.datatype = "uinteger"
    beacon_period.validate=beacon_period_validate

    var beacon_freq_hz = gateway_conf_s.taboption("beacon", form.Value, "beacon_freq_hz", _("Beacon Frequency (Hz)"))
    beacon_freq_hz.datatype = "uinteger"

    var beacon_freq_nb = gateway_conf_s.taboption("beacon", form.Value, "beacon_freq_nb", _("Beacon Channel Number"))
    beacon_freq_nb.datatype = "uinteger"

    var beacon_freq_step = gateway_conf_s.taboption("beacon", form.Value, "beacon_freq_step", _("Beacon Frequency Step"))
    beacon_freq_step.datatype = "uinteger"

    var beacon_datarate = gateway_conf_s.taboption("beacon", form.ListValue, "beacon_datarate", _("Beacon Datarate"))
    beacon_datarate.value(8, "SF8")
    beacon_datarate.value(9, "SF9")
    beacon_datarate.value(10, "SF10")
    beacon_datarate.value(12, "SF12")
    beacon_datarate.default ="9"

    var beacon_bw_hz = gateway_conf_s.taboption("beacon", form.Value, "beacon_bw_hz", _("Beacon Bandwidth"))
    beacon_bw_hz.default = "125000";
    beacon_bw_hz.datatype = "uinteger"

    var beacon_power = gateway_conf_s.taboption("beacon", form.Value, "beacon_power", _("Beacon Tx Power"))
    beacon_power.default = "14"
    beacon_power.datatype = "float"

    var beacon_infodesc = gateway_conf_s.taboption("beacon", form.Value, "beacon_infodesc", _("Beaconing information descriptor"))
    beacon_infodesc.default = "0"

    // gps tab
    var fake_gps = gateway_conf_s.taboption("gps", form.Flag, "fake_gps", _("Fake GPS"))

    var latitude = gateway_conf_s.taboption("gps", form.Value, "latitude", _("Latitude"))
    latitude.datatype = "float"

    var longitude = gateway_conf_s.taboption("gps", form.Value, "longitude", _("Longitude"))
    longitude.datatype = "float"

    var altitude = gateway_conf_s.taboption("gps", form.Value, "altitude", _("Altitude"))
    altitude.datatype = "float"

    // forward tab
    var forward_crc_valid = gateway_conf_s.taboption("forward", form.ListValue, "forward_crc_valid", _("Forward When CRC Valid"))
    forward_crc_valid.value("true", "True")
    forward_crc_valid.value("false", "False")
    forward_crc_valid.default = "true"

    var forward_crc_error = gateway_conf_s.taboption("forward", form.ListValue, "forward_crc_error", _("Forward When CRC Error"))
    forward_crc_error.value("true", "True")
    forward_crc_error.value("false", "False")
    forward_crc_error.default = "false"

    var forward_crc_disabled = gateway_conf_s.taboption("forward", form.ListValue, "forward_crc_disabled", _("Forward When CRC Disabled"))
    forward_crc_disabled.value("true", "True")
    forward_crc_disabled.value("false", "False")
    forward_crc_disabled.default = "false"

    return gateway_conf_s;
  }
}


//station config
var station = {
  view: function (m) {

    var station_s = m.section(form.TypedSection, 'station', _('Basic Station Settings'));
    station_s.anonymous = true;

    var gweui = station_s.option(form.Value, "gateway_ID", _("Gateway EUI"))
    gweui.datatype = 'length(16)';
    gweui.default= eui;
    gweui.rmempty= false;

    var stype = station_s.option(form.ListValue, "server", _("Server"))
    stype.value("cups_boot", "CUPS Boot Server")
    stype.value("cups", "CUPS Server")
    stype.value("lns", "LNS Server")
    stype.default="lns";
    stype.rmempty= false;
    
    var uri = station_s.option(form.Value, "uri", _("URI"),_("For example CUPS https://server-address:443, LNS wss://server-address:8887"))
    uri.rmempty= false;

    var auth_mode = station_s.option(form.ListValue, "auth_mode", _("Authentication Mode"))
    auth_mode.value("none", "No Authentication")
    auth_mode.value("tls-server", "TLS Server Authentication")
    auth_mode.value("tls-server-client", "TLS Server and Client Authentication")
    auth_mode.value("tls-server-token", "TLS Server Authentication and Client Token")

    var trust = station_s.option(form.TextValue, "_trust", _("trust"))
    trust.rmempty= false;
    trust.wrap = "off"
    trust.rows = 6
    trust.depends("auth_mode", "tls-server")
    trust.depends("auth_mode", "tls-server-client")
    trust.depends("auth_mode", "tls-server-token")
    trust.load = function () {
      return fs.trimmed('/etc/station/server.trust') || ""
    }
    trust.write = function (section_id, formvalue) {
      if (formvalue) {
        return fs.write('/etc/station/server.trust', formvalue.trim().replace(/\r\n/g, '\n') + '\n');
      }
    };

    var crt = station_s.option(form.TextValue, "_crt", _("certificate"))
    crt.rmempty= false;
    crt.wrap = "off"
    crt.rows = 6
    crt.depends("auth_mode", "tls-server-client")
    crt.load = function () {
      return fs.trimmed('/etc/station/client.crt') || ""
    }
    crt.write = function (section_id, formvalue) {
      if (formvalue) {
        return fs.write('/etc/station/client.crt', formvalue.trim().replace(/\r\n/g, '\n') + '\n');
      }
    };

    var key = station_s.option(form.TextValue, "_key", _("key"))
    key.rmempty= false;
    key.depends("auth_mode", "tls-server-client")
    key.wrap = "off"
    key.rows = 6
    key.load = function () {
      return fs.trimmed('/etc/station/client.key') || ""
    }
    key.write = function (section_id, formvalue) {
      if (formvalue) {
        return fs.write('/etc/station/client.key', formvalue.trim().replace(/\r\n/g, '\n') + '\n');
      }
    };

    var token = station_s.option(form.Value, "token", _("token"))
    token.depends("auth_mode", "tls-server-token")
    token.rmempty= false;

    return station_s
  }
}


var section = {
  packet_forwarder: packet_forwarder,
  basic_station: station,
}

function handleSwitchMode (mode) {
  console.log("Switch to " + mode);
	var m = lora_network_render(mode)
	return m.render().then(LuCI.prototype.bind(node => {
		var vp = document.getElementById('cbi-lora_network');
		DOM.content(vp, node);
	}, this))
}

function lora_network_render(mode_cur) {
  var m, s;

  m = new form.Map('lora_network', 'LoRaWAN Network Settings');

  s = m.section(form.TypedSection, 'network');
  s.anonymous = true;
  s.addremove = false;

  var mode = s.option(form.ListValue, "mode", _("Mode"))
  mode.value("packet_forwarder", "Packet Forwarder")
  mode.value("basic_station", "Basics Station")
  mode.default = "packet_forwarder"
  mode.cfgvalue = function() {
    return mode_cur
  }
  mode.onchange = function(ev, section_id, values) {
		handleSwitchMode(values)
	};

  switch (mode_cur)
  {
    case "packet_forwarder" :{
      section["packet_forwarder"].view(m)
      break;
    }
    case "basic_station" :{
      section["basic_station"].view(m)
      break;
    }
    default: {
      section["packet_forwarder"].view(m)
    }
  }
  return m;
}

return view.extend({

  load: function () {
    return Promise.all([
      uci.load('lora_network'),
      fs.lines('/etc/deviceinfo/eui'),
    ]);
  },

  render: function (results) {
    eui = results[1];
    var mode = uci.get('lora_network', 'network', 'mode');
    var m = lora_network_render(mode);
    return m.render();
  },

  handleSaveApply: function (ev) {
    console.log("handleSaveApply")

    var tasks = [];
    document.getElementById('maincontent')
      .querySelectorAll('.cbi-map').forEach(function (map) {
        tasks.push(DOM.callClassMethod(map, 'save'));
      });
    Promise.all(tasks);
    ui.changes.apply(true);

    setTimeout(function () {
      fs.exec('/etc/init.d/lora_pkt_fwd', ['restart']);
    }, 3000);
    setTimeout(function () {
      fs.exec('/etc/init.d/station', ['restart']);
    }, 3100);
  },
  handleSave: null,
  handleReset: null
});