## A community hub for streetwear enthusiasts in Poland

### Do this after cloning the repo
- run firebase functions:config:set name="value" inside functions folder to set algolia keys
- run `npm i -g firebase-tools` to install firebase cli, then login

### Other
- when deploying make sure the correct environment is selected using `firebase use`
- make sure config variables are correct for all environments in src/components/Firebase/config
  - to get web app config options run `firebase apps:sdkconfig web`
- environment variables are included in the static bundle and as such they aren't secret