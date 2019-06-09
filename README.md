# YouCelebrity
It's an amazing mobile application that coudl tell you which celebrity you look like.
<br/>
<br/>
<b>Core functionalities (take a photo or upload from library):</b>

  1 Celebrity similarity detection

  2 Anime character similarity detection
<br/>
<br/>
<b>Bonus functionalities:</b>

  1 User account system: register, login.

  2 Modify profile information.

  3 Image gallery

  4 Delete image gallery history
<br/>
<br/>
<b>Manual (Run under folder Mobile. Sequence matters):</b>
  
  Run command (install dependencies such as react-native-masonry-list for image location configuration and react-native-image-picker for image upload. Details see <a href="https://github.com/RyanKeepRunning/YouCelebrity/blob/dev/Mobile/package.json">package.json</a> file): npm install

  After successfully installed all the dependencies, the next step is to run the image process file in google cloud platform as follow:

  <b>Step 1:</b>
  First you need download the public key file```pubkey``` to your local machine and input code below in your ternimal:
  <br/>
  ```ssh -i <path_of_pubkey> cyg@35.244.113.146```<br/>
  The gcp will then ask you for the password, just input "159357".

  <b>Step 2:</b>
  Then you need go to the object_detection folder as follow:<br/>
  ```cd models\research\object_dectection```

  <b>Step 3:</b>
  Run the python file "modelselection.py"<br/>
  ```python modelselection```

  if you successfully started this python file, you will see a sentence "img not uploaded yet" in your terminal

  then go back to run the react-native file
  
  Run command: react-native start

  Run command with android phone connected: react-native run-android
