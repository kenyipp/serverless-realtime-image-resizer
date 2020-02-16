# Serverless Realtime Image Resizer
This example demonstrates how to listen the S3 upload events and resize the image in real time. It includes two lambda function, the first one validate it is image or not. It delete the file if it isn't an image. The second lambda function would resize the image in realtime and sending out via API gateway. Default the service support 100x100, 300x300 and 500x500, You can add more size config in [./app/resize.js](./app/resize.js).

## Install
This example has used 2 lambda layer: sharp layer and utils layer. You should create this two layer first. This is the example to create this 2 lambda layer. [Serverless Lambda Layer Example](https://github.com/kenyipp/serverless-lambda-layer-example). 

``` sh
$ npm install
$ npm run deploy
```

## Track
- This is a known issue that serverless framework would [create S3 bucket twice if a Lambda function is subscribed to S3 events](https://github.com/serverless/serverless/issues/6001). To solve this problem, we add `exist: true` under the s3 event according to [this issue](https://github.com/serverless/serverless/issues/4284).

- If we are using lambda layer, the serverless-webpack can't run normally. I have remove it from serverless plugins at this moment and feel free to suggest the solution. 

## ToDo list
- [ ] Enable serverless-webpack to reduce the size of package.
- [ ] Better Documentation
- [ ] Test cases
- [ ] CICD pipeline

## License
This software is released under the MIT license. See the [license file](LICENSE) for more details.
