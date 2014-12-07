var mespeak = require("mespeak");
var randomvoice = require("randomvoice");
var Transform = require("stream").Transform;

mespeak.loadConfig(require("mespeak/src/mespeak_config.json"));
mespeak.loadVoice(require("mespeak/voices/en/en-us.json"));

module.exports = SpeechStream;

function SpeechStream(default_voice) {
	default_voice = default_voice || randomvoice();
	var stream = new Transform({
		objectMode: true
	});
	stream._transform = function(data, encoding, cb) {
		var voice = data.voice || default_voice;
		var message = data.message || " ";
		voice.rawdata = true;
		var speech = mespeak.speak(message, voice);
		speech.length = speech.byteLength;
		cb(null, new Buffer(speech));
	}
	return stream;
}
