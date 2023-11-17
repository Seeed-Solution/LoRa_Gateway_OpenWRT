'use strict';
'require view';
'require poll';
'require fs';
'require uci';

return view.extend({
	load: function() {
		return Promise.all([
			L.resolveDefault(fs.stat('/sbin/logread'), null),
			L.resolveDefault(fs.stat('/usr/sbin/logread'), null),
			uci.load('lora_network'),
		]);
	},
	render: function(stat) {
		var logger = stat[0] ? stat[0].path : stat[1] ? stat[1].path : null;
		var mode = uci.get('lora_network', 'network', 'mode');

		var  program;
		switch (mode)
		{
		  case "packet_forwarder" :{
			program="lora_pkt_fwd"
			break;
		  }
		  case "basic_station" :{
			program="station"
			break;
		  }
		  default: {
			program="lora_pkt_fwd"
		  }
		}

		poll.add(function() {
			return L.resolveDefault(fs.exec_direct(logger, ['-e', program])).then(function(res) {
				var log = document.getElementById("logfile");
				if (res) {
					console.log(res);
					log.value = res.trim();
				} else {
					log.value = _('No lora_pkt_fwd or station related logs yet!');
				}
				log.scrollTop = log.scrollHeight;
			});
		});
		return E('div', { class: 'cbi-map' },
			E('div', { class: 'cbi-section' }, [
			E('div', { class: 'cbi-section-descr' }, _('The syslog output, pre-filtered for lora_pkt_fwd or station related messages only.')),
			E('textarea', {
				'id': 'logfile',
				'style': 'width: 100% !important; padding: 5px; font-family: monospace',
				'readonly': 'readonly',
				'wrap': 'off',
				'rows': 25
			})
		]));
	},
	handleSaveApply: null,
	handleSave: null,
	handleReset: null
});
