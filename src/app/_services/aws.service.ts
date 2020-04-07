import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { S3 } from 'aws-sdk';
import * as AWS from 'aws-sdk';


@Injectable({ providedIn: "root" })
export class AwsService {
  bucketName = environment.bucketName;
  bucketRegion = environment.bucketRegion;
  identityPoolId = environment.identityPoolId;

  constructor(private httpClient: HttpClient) {}

  s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: this.bucketName },
  });

  // this.s3.config.update({
  //     region: this.bucketRegion,
  //     credentials: new AWS.CognitoIdentityCredentials({
  //       IdentityPoolId: this.identityPoolId
  //     })
  // });

  getImage(userId: number, fileName: string) {
    var params = {
      Bucket: this.bucketName,
      Key: userId + '/' + fileName,
    };

    this.s3.getObject(params, function (err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else console.log(data); // successful response
      /*
            data = {
             AcceptRanges: "bytes", 
             ContentLength: 3191, 
             ContentType: "image/jpeg", 
             ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
             LastModified: <Date Representation>, 
             Metadata: {
             }, 
             TagCount: 2, 
             VersionId: "null"
            }
            */
    });
  }
}