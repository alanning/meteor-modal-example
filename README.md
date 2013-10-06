meteor-modal-example
====================

Example Meteor app illustrating modal dialogs, mobile detection, and jquery multi-select plugin


### How to run

1. Install [Meteorite][1]
  
2. Get the example code:
```bash
git clone https://github.com/alanning/meteor-modal-example.git
```

3. Run using Meteorite (rather than the normal `meteor`):
```bash
cd meteor-modal-example
mrt
```

4. Point some browsers to `http://localhost:3000/`


### Live Demo

http://modal-example.meteor.com/


### Y U NO Package?!

We do!  This example uses the [bootboxjs][2] smart package available up on Atmosphere.

Did you mean the awesome multiselect part?  Oh, well in that case...

The [loudev multiselect library][3], while fantastic, is not appropriate for mobile devices.  Currently the Meteor packaging system is not able to optionally load files based on device type so it's better to stick it in the public directory and load it as needed.  This example uses [yepnope][4] to dynamically load the loudev library when appropriate.




[1]: https://github.com/oortcloud/meteorite "Meteorite"
[2]: https://atmosphere.meteor.com/package/bootboxjs "bootboxjs"
[3]: http://loudev.com/ "loudev"
[4]: http://yepnopejs.com/ "yepnope"
