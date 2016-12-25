var path = require('path');
var Downloader = require('../lib/util/downloader.js');
var downloader = new Downloader();

downloader.downloader('http://ports.ubuntu.com/ubuntu-ports/dists/trusty-updates/main/installer-armhf/current/images/keystone/netboot/initrd.gz', 'initrd.gz');
