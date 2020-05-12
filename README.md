# Clipboard History
Recreating Window's 10 clipboard history in Electron, so that it can be used on any operating systems.

<img src="https://raw.githubusercontent.com/savannahar68/ClipboardHistory/master/images/popOs.gif" width="100%">

## Usage

After installing the application on your operating system, you can see most recent 20 clips which you have copied to your clipboard after running the application.

You can view all the clips in System Tray (Scissor icon) or you can use this shortcut

Linux | Windows | Mac
--- | --- | ---
`Ctrl+L` | `Ctrl+L` | `CMD+L`

**Preview Windows**

![Windows 10 - Tray](https://raw.githubusercontent.com/savannahar68/ClipboardHistory/master/images/win_tray.png)
![Windows 10 - App Window](https://raw.githubusercontent.com/savannahar68/ClipboardHistory/master/images/win_window.png)

**Preview Linux POP OS - 20.04**

![Linux - Tray](https://raw.githubusercontent.com/savannahar68/ClipboardHistory/273f5c043212dd8903be76aefd50a8ea1b93f93f/images/linux_tray.png)
![Linux - App Window](https://raw.githubusercontent.com/savannahar68/ClipboardHistory/273f5c043212dd8903be76aefd50a8ea1b93f93f/images/linux_window.png)

**Preview MacOS**

<img src="https://raw.githubusercontent.com/savannahar68/ClipboardHistory/273f5c043212dd8903be76aefd50a8ea1b93f93f/images/mac_tray.png" width="50%" height="100%" />

<img src="https://raw.githubusercontent.com/savannahar68/ClipboardHistory/273f5c043212dd8903be76aefd50a8ea1b93f93f/images/mac_window.png" width="50%" height="100%" />

## Windows(You can go with either Yarn build or Npm build)

### How to do a Windown build
#### Yarn Build

```
$ git clone https://github.com/savannahar68/ClipboardHistory.git
$ cd ClipboardHistory/
$ yarn
$ // To run locally - run the below command
$ yarn start 
$ // to build package - run the below command
$ yarn build
```
#### NPM build
```
$ git clone https://github.com/savannahar68/ClipboardHistory.git
$ cd ClipboardHistory/
$ npm install
$ // To run locally - run the below command
$ npm run start_npm
$ // to build package - run the below command
$ npm run build_npm
```

Go to folder `dist` and execute the `Clipboard History X.X.X.exe`

## Linux

### How to do a Linux build (You can go with either Yarn build or Npm build)
#### Yarn Build

```
$ git clone https://github.com/savannahar68/ClipboardHistory.git
$ cd ClipboardHistory/
$ yarn
$ // To run locally - run the below command
$ yarn start 
$ // to build package - run the below command
$ yarn build
```
#### NPM build
```
$ git clone https://github.com/savannahar68/ClipboardHistory.git
$ cd ClipboardHistory/
$ npm install
$ // To run locally - run the below command
$ npm run start_npm
$ // to build package - run the below command
$ npm run build_npm
```

Go to folder `dist/` and execute the `clipboardhistory_X.X.X_amd64.deb`

## Mac

### How to do a Mac build (You can go with either Yarn build or Npm build)
#### Yarn Build

```
$ git clone https://github.com/savannahar68/ClipboardHistory.git
$ cd ClipboardHistory/
$ yarn
$ // To run locally - run the below command
$ yarn start 
$ // to build package - run the below command
$ yarn build
```
#### NPM build
```
$ git clone https://github.com/savannahar68/ClipboardHistory.git
$ cd ClipboardHistory/
$ npm install
$ // To run locally - run the below command
$ npm run start_npm
$ // to build package - run the below command
$ npm run build_npm
```

Go to folder `dist` and execute the `Clipboard History_X.X.X.deb` and be happy.


## License
The code of web-review is released under the MIT License. There is no limitation for both acadmic and commercial usage.


Feel free to raise issue if you find one! Contributions are always welcomed :)
