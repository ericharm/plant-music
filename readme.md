# PLANT MUSIC

Climate-driven procedural audio

## Summary

Using an [Arduino](https://www.arduino.cc/), environmental data is fed from an external circuit into your computer's serial port.  A [Node.js](https://nodejs.org/en/about/) server reads the data from the serial port and broadcasts it, also providing a simple visualization of the sensor readings.  The sensor readings are then used by a [Pure Data](https://puredata.info/) (Pd) environment to manipulate the inputs in an audio patch.

**Temperature** effects tempo.  In a cold environment, the audio plays back more slowly.

**Light** changes the value of a low-pass filter.  As the environment gets dimmer, less and less high frequencies are allowed through.

**Moisture** sets the volume of the bass notes.  Put the moisture sensor in a dry plant and you will hear mostly percussion.  In a well-watered plant you'll hear a healthy amount of synth bass.

(Here there might be a link to a web page with some more in-depth documentation about the project.  Other sections of this readme may have links to specific elements of said web page.)

---

**BUILDING THE CIRCUIT**

Here will be included some photos and diagrams along with explanation.

**WRITING TO THE SERIAL PORT**

The Arduino code can be found in plant_music.ino.  You may need to copy this file to the path where Arduino keeps all your other sketches.  This file reads the sensor values off the circuits, converts them into sensible units and prints them as a json string to the serial port.

**WEB SERVER**

`npm install`
`npm start <path/to/serialport>`

The server can be used to output test data with `npm start test` - this will allow you to feed data into a Pd patch without the need for an active working circuit sending you live data.  If you do not pass an arguming to `npm start`, it will try to read from `/dev/cu.usbmodem1421` by default.  Visit http://localhost:8081 in a browser for a visualization.

**Pd PATCHES**

I recommend downloading the [latest release](https://puredata.info/downloads/pure-data/releases) of Pd but if you are having any issues getting things to work, this project was built with Pd-0.49-1

I use a few externals in my patches and you'll need to add them to your Pd environment (Help > Find Externals brings up the menu to find them.  You will also probably want to tell Pd to add newly installed libraries to its search path). Make sure you have installed [else](https://github.com/porres/pd-else) and [purest-json](https://github.com/residuum/PuRestJson).

## Additional Resources

_Programming Sounds with Pure Data: Make Your Apps Come Alive with Dynamic Audio_ by Tony Hillerson

_Make: Getting Started with Arduino, 3rd Edition_ by Massimo Banzi and Michael Shiloh

[Lab: Serial Communication with Node.js](https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-communication-with-node-js/) by Tom Igoe

https://freesound.org
