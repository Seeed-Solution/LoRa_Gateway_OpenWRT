'use strict';
'require view';
'require form';
'require uci';
'require fs';



return view.extend({

    load: function() {

        return Promise.all([
            uci.load('lte_config'),
        ]);
    },

    render: function(data) {
        var m, s, o;

        m = new form.Map('lte_config', _('Cellular'));

        var s = m.section(form.NamedSection, 'LTE', _('Status'));

        o = s.option(form.Flag, 'enable', _('Enable'));

        var apn = s.option(form.Value, 'apn', _('APN'));
        o = s.option(form.Value, 'user', _('User'));
        o = s.option(form.Value, 'auth', _('Auth'));

        o = s.option(form.Value, 'password', _('Password'));
        o.password = true;
        o = s.option(form.Value, 'pincode', _('Pincode'));
        o.password = true;

        return m.render();
    },

});