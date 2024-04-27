# WebCam Security

## Installation

### Motion for motion activated webcam recording

`sudo apt-get install motion` instals webcam motion detection tools

`motion -h` shows commands and version 

click the version number [here](https://motion-project.github.io/motion_guide.html) for documentation.

`motion` will start recording thats saved when motion is detected.

by default videos are saved as .mkv files, if you have nothing to open them, [vlc](https://www.videolan.org/vlc/download-debian.html) will work.

### OpenRGB Commands to turn off all rgb lights of the PC so it appears off

`sudo apt install OpenRGB` instals OpenRGB.

`openrgb -p ~/.config/OpenRGB/All\ Off.orp >> /dev/null` this loads an OpenRGB config (made in the GUI) that turns off all lights


### Exfiltrate Data Clips to Remote System
video files can be moved from the host PC to another PC, in this case my Raspberry Pi, using the scp command.

`sudo -u riley scp /var/lib/motion/* pihole@pi.home:~/WebCam_Clips/`

This can be done without a password request because this ssh server is authenticated with a key pair for the user riley.

## Automation and Bash Scripts
To make motion automatically exfiltrate data whenever a new video is made, changes must be made to the `/etc/motion/motion.conf` file.

This line must be added (the script path can be wherever you put your bash script):
```
 on_movie_start /home/riley/SecurityCam_MovieSaved.sh
```

#### SecurityCam_MovieSaved.sh:
```bash
#!/bin/bash
echo "Saved a Clip"

sudo -u riley scp /var/lib/motion/* pihole@192.168.1.36:~/WebCam_Clips/

```

To call all this functionality together, a bash script (SecurityCam.sh)is used:
```bash
#!/bin/bash

# Turn off all PC Lights
openrgb -p ~/.config/OpenRGB/All\ Off.orp >> /dev/null

# Prompt the user to turn off monitors
echo "Good to Turn Off Monitors"

# Wait 60 seconds for the user to turn off monitors and leave the room
sleep 60s 

# Start motion sensed recording (exfil included)
motion 
```

This can be called using ./SecurityCam.sh, or you can add is to your path under any name:

`mv SecurityCam.sh /bin && export PATH=$PATH:/bin`

renaming this file in /bin will change the name you use to call it (remove the ".sh")

Then add `export PATH=$PATH:/bin` to your `~/.bashrc` file.


