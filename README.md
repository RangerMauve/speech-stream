# speech-stream

Text-to-speech using streams. Stream configuration data, text. Output audio buffers.

## API

The API is very minimal. You just create a transform stream that takes in voice configuration data and outputs

### `SpeechStream([default_voice])``

Creates a new SpeechStream and optionally takes a default voice to use.
Documentation on the voice options can be found [here](https://github.com/mikolalysenko/mespeak#mespeakspeakstr-options).

#### parameters

* `[default_voice]`: Optional Object containing voice configuration. If this
 isn't provided, a random is generated using [randomvoice](https://github.com/RangerMauve/randomvoice).

#### returns

* `SpeechStream`: A Duplex stream which takes in objects that contain a `message`
property which is a string, and optionally a `voice` property which contains the
aforementioned voice configuration data.

## Example:

``` javascript
var streamArray = require("stream-array");
var makeProp = require("make-prop-stream");
var speechStream = require("speech-stream");
var fs = require("fs");

streamArray(["Hello World!"])
.pipe(makeProp("message"))
.pipe(speechStream())
.pipe(fs.createWriteStream("example.wav"));
```

Note: this example doesn't work well with multiple messages since it'll
concatenate the buffer data together. A better use would be to pipe this into
something that either saves everything or outputs to your speakers.
