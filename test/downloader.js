var Downloader = require('../lib/util/downloader.js');
var downloader = new Downloader();

downloader.downloader('http://mirror.cpsc.ucalgary.ca/mirror/ubuntu.com/releases/16.04/ubuntu-16.04-server-amd64.iso', 'ubuntu-16.04-server-amd64.iso');