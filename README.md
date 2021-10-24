# iOS App Privacy Report Reader

This project runs totally locally, create a local sqlite to serialize the data, nothing will be uploaded or transfered.

## backgrounds

Apple introduces a new feature in iOS 15 called [Record App Activity](https://developer.apple.com/documentation/foundation/urlrequest/inspecting_app_activity_data).

## how to get the report

To use the new security feature, go straight to the settings app of your iPhone, select the **Privacy** option, scroll down to the bottom, and click **Record App Activity**.

After which, toggle on the feature to start recording the activity of your installed apps.

Several days later, when you already have some records, go back to the same place in setting and click **Save App Activity**, you will get a file named like App_Pricy_Report_xxxxxxxxxxxxx.ndjson.

## how to analyze the json

Put the json file in `./server` then change the path in `./server/index.js`.

(TODO: drag and drop the .ndjson directly on the page)

```bash
$ npm install
$ npm run start-server
$ npm run start
```

![IMG_1409](https://user-images.githubusercontent.com/34186314/138594379-38c3032b-62b6-498d-88d5-fe24509ef70d.JPG)
