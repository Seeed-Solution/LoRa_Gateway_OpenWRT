'use strict';
'require view';
'require dom';
'require fs';
'require ui';
'require uci';
'require rpc';
'require form';

var mode ="packet_forwarder"

function handleSwitchRegion (region) {
	console.log("Switch to " + region );
	var m = freq_config_render(region)
	return m.render().then(LuCI.prototype.bind(node => {
		var vp = document.getElementById('cbi-lora_radio');
		DOM.content(vp, node);
	}, this))
}

var freq_plan_table = {
	"US915" : [ ],
	"AU915" : [ ],
	"AS923" : [ ],
	"KR920" : [ ],
	"EU868" : [ ],
	"IN865" : [ ],
	"RU864" : [ ],
	"CN470" : [ ],
}

function freq_plan_list( s, region, table) {
	var list = [];
	var i,j;
	if ( table[region].length > 0 ) {
		for ( i = 0; i < table[region].length; i++ ) {
			for ( j = 0; j < table[region][i].mode.length; j++ ) {
				if( mode == table[region][i].mode[j]) {
					list.push([table[region][i].file, table[region][i].title ]);
				}
			}
		}
		if ( list.length > 0 ) {
			var freq_plan = s.option(form.ListValue, 'cloud_freq_plan', _('Frequency plan'));
			for ( i = 0; i < list.length; i++ ) {
				freq_plan.value(list[i][0], _(list[i][1]));
			}
			freq_plan.default = list[0][0];
		}
	}
}


function freq_config_render(region_cur) {
	var m, s, o, k;
	m = new form.Map('lora_radio', 'Channel Plan');
	s = m.section(form.TypedSection, 'freq_plan');
	s.anonymous = true;
	s.addremove = false;	

	var region = s.option(form.ListValue, 'region', _('Region'));
	if (region_cur.indexOf("915") >= 0 || region_cur.indexOf("US915") >= 0 || region_cur.indexOf("AU915") >= 0
		|| region_cur.indexOf("AS923") >= 0 || region_cur.indexOf("KR920") >= 0) {
		region.value("US915", _("US902-928"))
		region.value("AU915", _("AU915-928"))
		region.value("AS923", _("AS923"))
		region.value("KR920", _("KR920-923"))
		
		if(   mode != "basic_station" ) {
			region.value("Customized915", _("Customized Bands"))
		}
		region.cfgvalue = function() {
			return region_cur
		}
		region.default="US915";
	}
	if ( region_cur.indexOf("868") >= 0 || region_cur.indexOf("EU868") >= 0 || region_cur.indexOf("IN865") >= 0
		|| region_cur.indexOf("RU864") >= 0) {
		region.value("EU868", _("EU863-870"))
		region.value("IN865", _("IN865-867"))
		region.value("RU864", _("RU864-870"))

		if(  mode != "basic_station" ) {
			region.value("Customized868", _("Customized Bands"))
		}
		region.cfgvalue = function() {
			return region_cur
		}
		region.default="EU868";
	}

	if ( region_cur.indexOf("470") >= 0 || region_cur.indexOf("CN470") >= 0 ) {
		region.value("CN470", _("CN470-510"))

		if(  mode != "basic_station" ) {
			region.value("Customized470", _("Customized Bands"))
		}
		region.cfgvalue = function() {
			return region_cur
		}
		region.default="CN470";
	}

	region.onchange = function(ev, section_id, values) {
		handleSwitchRegion(values)
	};

	switch(region_cur)
	{
		case "US915": {
			freq_plan_list(s, "US915", freq_plan_table);
			break;
		}
		case "AU915": {
			freq_plan_list(s, "AU915", freq_plan_table);
			break;
		}
		case "AS923": {
			freq_plan_list(s, "AS923", freq_plan_table);
			break;
		}
		case "KR920": {
			freq_plan_list(s, "KR920", freq_plan_table);
			break;
		}
		case "EU868": {
			freq_plan_list(s, "EU868", freq_plan_table);
			break;
		}
		case "IN865": {
			freq_plan_list(s, "IN865", freq_plan_table);
			break;
		}
		case "RU864": {
			freq_plan_list(s, "RU864", freq_plan_table);
			break;
		}
		case "CN470": {
			freq_plan_list(s, "CN470", freq_plan_table);
			break;
		}

		case "Customized868":
		case "Customized915": 
		case "Customized470": {
			if(  mode == "basic_station" ) {
				break;
			}
			
			s = m.section(form.TypedSection, 'sx130x',_("Radio Configuration"));
			s.addremove = false;
			s.anonymous = true;
			
			o= s.option( form.ListValue, "lorawan_public", _("LoRaWAN Public"))
			o.value("1", _("Enable"));
			o.value("0", _("Disable"));
			o.default = "1";

			if( region_cur == "Customized915") {
				var freq_min = 902000000;
				var freq_max = 928000000;
				var radio_0_freq_default = 904300000;
				var radio_1_freq_default = 905000000;
				var radio_0_tx_freq_min_default = 923000000;
				var radio_0_tx_freq_max_default = 928000000;
				var if_default = function(i) {
					var if_list = [ -400000, -200000, 0, 200000, -300000, -100000, 100000, 300000, 30000, 300000];
					return if_list[i];
				}
				var radio_default = function(i) {
					var radio_en_list = [ "0", "0", "0", "0", "1", "1", "1", "1", "0", "1" ];
					return radio_en_list[i];
				}
				var lora_std_bw_default = 500000;
				var lora_std_sf_default = 8;
			} else if( region_cur == "Customized868")  {
				var freq_min = 863000000;
				var freq_max = 870000000;
				var radio_0_freq_default = 867500000;
				var radio_1_freq_default = 868500000;
				var radio_0_tx_freq_min_default = 863000000;
				var radio_0_tx_freq_max_default = 870000000;
				var if_default = function(i) {
					var if_list = [ -400000, -200000, 0, -400000, -200000, 0, 200000, 400000, -200000, 300000];
					return if_list[i];
				}
				var radio_default = function(i) {
					var radio_en_list = [ "1", "1", "1", "0", "0", "0", "0", "0", "1", "1" ];
					return radio_en_list[i];
				}
				var lora_std_bw_default = 250000;
				var lora_std_sf_default = 7;
			} else if( region_cur == "Customized470") {
				var freq_min = 470000000;
				var freq_max = 510000000;
				var radio_0_freq_default = 486600000;
				var radio_1_freq_default = 487400000;
				var radio_0_tx_freq_min_default = 470000000;
				var radio_0_tx_freq_max_default = 510000000;
				var if_default = function(i) {
					var if_list = [ -300000, -100000, 100000, 300000, -300000, -100000, 100000, 300000, -200000, 300000];
					return if_list[i];
				}
				var radio_default = function(i) {
					var radio_en_list = [ "0", "0", "0", "0", "1", "1", "1", "1", "1", "1" ];
					return radio_en_list[i];
				}
				var lora_std_bw_default = 250000;
				var lora_std_sf_default = 7;
			}

			var freq_validate = function(section_id, value) {
				if (value >= freq_min &&  value <= freq_max) {
					return true
				} else {
					return freq_min + "<= freq <=" + freq_max;
				}
			}
			var radio_0_freq = s.option(form.Value, 'radio_0_freq', _('Radio 0 Center Frequency'));
			radio_0_freq.datatype = "uinteger"
			radio_0_freq.validate= freq_validate;
			radio_0_freq.default = radio_0_freq_default;
			radio_0_freq.rmempty= false;

			var radio_1_freq = s.option(form.Value, 'radio_1_freq', _('Radio 1 Center Frequency'));
			radio_1_freq.datatype = "uinteger";
			radio_1_freq.validate= freq_validate;
			radio_1_freq.default =  radio_1_freq_default;
			radio_1_freq.rmempty= false;

			var radio_0_tx_freq_min = s.option(form.Value, 'radio_0_tx_freq_min', _('Minimum Tx Frequency'));
			radio_0_tx_freq_min.datatype = "uinteger";
			radio_0_tx_freq_min.validate= freq_validate;
			radio_0_tx_freq_min.default =  radio_0_tx_freq_min_default;
			radio_0_tx_freq_min.rmempty= false;

			var radio_0_tx_freq_max = s.option(form.Value, 'radio_0_tx_freq_max', _('Maximum Tx Frequency'));
			radio_0_tx_freq_max.datatype = "uinteger";
			radio_0_tx_freq_max.validate= freq_validate;
			radio_0_tx_freq_max.default =  radio_0_tx_freq_max_default;
			radio_0_tx_freq_max.rmempty= false;
			
			var tx_gain_lut = s.option( form.ListValue, "tx_gain_lut", _("Tx Gain Lut"))
			tx_gain_lut.value("0", _("Tx Power range( 1 ~ 16)"));
			tx_gain_lut.value("1", _("Tx Power range( 12 ~ 27)"));
			tx_gain_lut.default = "1";

			for(var i =0; i < 8; i++) {
				var title = "chan_multiSF_" + i;
				var enable = "chan_multiSF_" + i + "_enable";
				var radio =  "chan_multiSF_" + i + "_radio";
				var IF =  "chan_multiSF_" + i + "_if";
				var freq = "_chan_multiSF_" + i + "_freq";
				var bw = "_chan_multiSF_" + i + "_bw";
				var dr = "_chan_multiSF_" + i + "_dr";
	
				s = m.section(form.TableSection, 'sx130x',_(title));
				s.anonymous = true;
				s.addremove = false;
				
				o = s.option( form.ListValue, enable, _("Enable"));
				o.value("1", _("Enable"))
				o.value("0", _("Disable"))
				o.default = "1";

				o = s.option( form.ListValue, radio, _("Radio"));
				o.value("0", _("Radio 0"))
				o.value("1", _("Radio 1"))
				o.default = radio_default(i)

				o = s.option( form.Value,IF, _("IF (Hz)"));
				o.rmempty= false;
				o.default = if_default(i);
				o.datatype = "float";

				o = s.option( form.DummyValue, freq, _("Freq (MHz)"));
				o.cfgvalue = function() {
					return "-"
				}
				o = s.option( form.DummyValue, bw, _("Bandwidth"));
				o.cfgvalue =function() { return "125KHz" }
	
				o = s.option( form.DummyValue, dr, _("DataRate"));
				o.cfgvalue = function() { return "All SF" }
			}
			 
			// lora std
			s = m.section(form.TableSection, 'sx130x',_("LoRa std"));
			s.anonymous = true;
			s.addremove = false;
	
			o = s.option( form.ListValue, 'chan_Lora_std_enable', _("Enable"));
			o.value("1", _("Enable"))
			o.value("0", _("Disable"))
			o.default = "1"

			o = s.option( form.ListValue, 'chan_Lora_std_radio',_("Radio"));
			o.value("0", _("Radio 0"))
			o.value("1", _("Radio 1"))
			o.default = radio_default(8)

			o = s.option( form.Value, 'chan_Lora_std_if', _("IF (Hz)"));
			o.rmempty= false;
			o.default = if_default(8);
			o.datatype = "float";

			o = s.option( form.DummyValue, '_chan_Lora_std_freq', _("Freq  (MHz)"));
			o.cfgvalue = function() {
				return "-"
			}
			o = s.option( form.ListValue, 'chan_Lora_std_bandwidth', _("Bandwidth"));
			o.value("125000", _("125 KHz"))
			o.value("250000", _("250 KHz"))
			o.value("500000", _("500 KHz"))
			o.default = lora_std_bw_default
	
			o = s.option( form.ListValue, 'chan_Lora_std_spread_factor', _("DataRate"));
			o.value("7", _("SF7"))
			o.value("8", _("SF8"))
			o.value("9", _("SF9"))
			o.value("10", _("SF10"))
			o.value("11", _("SF11"))
			o.value("12", _("SF12"))
			o.default = lora_std_sf_default
	
			// FSK
			s = m.section(form.TableSection, 'sx130x',_("FSK"));
			s.anonymous = true;
			s.addremove = false;
	
			o = s.option( form.ListValue, 'chan_FSK_enable', _("Enable"));
			o.value("1", _("Enable"))
			o.value("0", _("Disable"))
			o.default = "1"

			o = s.option( form.ListValue, 'chan_FSK_radio',_("Radio"));
			o.value("0", _("Radio 0"))
			o.value("1", _("Radio 1"))
			o.default = radio_default(9)

			o = s.option( form.Value, 'chan_FSK_if', _("IF (Hz)"));
			o.rmempty= false;
			o.default = if_default(9);
			o.datatype = "float";

			o = s.option( form.DummyValue, '_chan_FSK_freq', _("Freq (MHz)"));
			o.cfgvalue = function() {
				return "-"
			}
			o = s.option( form.ListValue, 'chan_FSK_bandwidth', _("Bandwidth"));
			o.value("7800", _("7.8 KHz"))
			o.value("15600", _("15.6 KHz"))
			o.value("31200", _("31.2 KHz"))
			o.value("62500", _("62.5 KHz"))
			o.value("125000", _("125 KHz"))
			o.value("250000", _("250 KHz"))
			o.value("500000", _("500 KHz"))
			o.default = "125000"

			o = s.option( form.Value, 'chan_FSK_datarate', _("DataRate"));
			o.default= 50000;
			o.datatype = "float";
		}	

	}
	return m
}


return view.extend({
	load: function () {
		return Promise.all([
			uci.load('lora_radio'),
			uci.load('lora_network'),
			fs.read('/etc/lora/freq_plan.json').then(
				info =>  {
					var t = JSON.parse(info);
					if( t != undefined ) {
						console.log(t);
						freq_plan_table = t;
					}
 					
				}
			),
		]);
	},
	render: function (results) {
		mode = uci.get('lora_network', 'network', 'mode');
		var region_cur = uci.get('lora_radio', 'freq_plan', 'region');
		var m = freq_config_render(region_cur)
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
		ui.changes.apply(false);

		setTimeout(function () {
			fs.exec('/etc/init.d/lora_pkt_fwd', ['restart']).then(
				res =>	{ return fs.exec('/etc/init.d/station', ['restart'])}
			)
		}, 3000);
	},
	handleSave: null,
	handleReset: null
});