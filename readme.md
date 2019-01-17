# PLANT MUSIC

Climate-driven procedural audio

## Summary

Using an [Arduino](https://www.arduino.cc/), environmental data is fed from an external circuit into your computer's serial port.  A [Node.js](https://nodejs.org/en/about/) server reads the data from the serial port and broadcasts it, also providing a simple visualization of the sensor readings.  The sensor readings are then used by a [Pure Data](https://puredata.info/) (Pd) environment to manipulate the inputs in an audio patch.

Here there might be a link to a web page with some more in-depth documentation about the project.  Other sections of this readme may have links to specific elements of said web page.

---

**BUILDING THE CIRCUIT**

Here will be included some photos and diagrams along with explanation.

**WRITING TO THE SERIAL PORT**

Here will be a brief explanation of the code that Arduino uses to transfer the sensor data into the serial port.

**WEB SERVER**
`npm install`
`npm start`

The server can be used to output test data with `npm start test` - this will allow you to feed data into a Pd patch without the need for an active working circuit sending you live data.

**Pd PATCHES**

I recommend downloading the [latest release](https://puredata.info/downloads/pure-data/releases) of Pd but if you are having any issues getting things to work, this project was built with Pd-0.49-1

I use a few externals in my patches and you'll need to add them to your Pd environment (Help > Find Externals brings up the menu to find them.  You will also probably want to tell Pd to add newly installed libraries to its search path). Make sure you have installed [else](https://github.com/porres/pd-else) and [purest-json](https://github.com/residuum/PuRestJson).
