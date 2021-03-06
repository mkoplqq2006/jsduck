/**
 * Creates HTML for Sencha Touch (inline-)example.
 */
Ext.define('Docs.view.examples.Device', {
    config: {
        /**
         * @cfg {String} url
         * Path to the example.
         */
        url: "",
        /**
         * @cfg {String} id
         * ID for the iframe. Auto-generated by default.
         */
        id: undefined,
        /**
         * @cfg {String} device
         * Either phone, miniphone or tablet.
         * @accessor
         */
        device: 'phone',
        /**
         * @cfg {String} orientation
         * Either landscape or portrait.
         * @accessor
         */
        orientation: 'landscape'
    },

    constructor: function(cfg) {
        this.initConfig(cfg);
        Ext.apply(this, this.getIframeSize());
        this.id = this.id || Ext.id();

        if (Ext.isWebKit) {
            // Template for the DIV containing device image and iframe
            this.tpl = new Ext.XTemplate(
                '<div class="touchExample {device} {orientation}">',
                    '<iframe id={id} style="width: {width}; height: {height}; border: 0;" ',
                            'src="{[this.deviceUrl(values)]}"></iframe>',
                '</div>',
                {
                    deviceUrl: function(values) {
                         return values.url + "?deviceType=" + (values.device === 'tablet' ? 'Tablet' : 'Phone');
                    }
                }
            );
        } else {
            this.tpl = new Ext.XTemplate(
                '<div class="touchExample {device} {orientation}">',
                    '<div id={id} class="wrong-browser" style="width: {width}; height: {height};">',
                        '<div style="padding: 20px;">Sencha Touch only functions on WebKit based browsers. <br /><br />Please use Google Chrome or Safari to see live examples.</div>',
                    '</div>',
                '</div>'
            );
        }
    },

    /**
     * Returns the HTML displaying the example in this device.
     * @return {String}
     */
    toHtml: function() {
        return this.tpl.apply(this);
    },

    setDevice: function(device) {
        this.device = device;
        Ext.apply(this, this.getIframeSize());
    },

    setOrientation: function(orientation) {
        this.orientation = orientation;
        Ext.apply(this, this.getIframeSize());
    },

    // Returns width and height of current device iframe.
    getIframeSize: function() {
        // device dimensions in landscape orientation
        var landscape = {
            phone: {width: '481px', height: '320px'},
            miniphone: {width: '320px', height: '219px'},
            tablet: {width: '717px', height: '538px'}
        }[this.device];

        // return landscape w/h or swap the dimensions
        if (this.orientation === 'landscape') {
            return landscape;
        }
        else {
            return {width: landscape.height, height: landscape.width};
        }
    }
});
