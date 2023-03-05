
## What I did

It seems like this project was missing the android and ios directories. Once I added them and modified the babel.config.js file I was able to build the project on ios simulator and run it on a physical android device. Here are the commands a ran after the changes

using node 16.18.1

``` javascript
npm run start
```

In terminal I selected one of the following options

``` cmd
› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

```

Actually deploying the build to google play store is pretty easy process. I linked to the react native docs for deploying below. It looks very simular to the porcess I regularly use with Ionic. Let me know if this helped and if there is anything else I can help with.

## Publishing

[Publishing to Google Play Store](https://reactnative.dev/docs/signed-apk-android)