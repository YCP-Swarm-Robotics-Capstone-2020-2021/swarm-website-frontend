import {S3} from "@aws-sdk/client-s3";

export async function getS3Object(bucket: string, key: string, accessKey: string, secretKey: string){
    const params = {
        Bucket: bucket,
        Key: key,
        ResponseContentType: 'application/json'
    };

    const s3 = new S3({
        region: 'us-east-1',
        credentials: {
            accessKeyId: accessKey,
            secretAccessKey: secretKey,
        }
    });

    try {
        //get the object from the Amazon S3 bucket as a ReadableStream.
        let data = await s3.getObject(params);

        if (data.Body === undefined) {
            return;
        }

        // @ts-ignore
        return await new Response(data.Body, {}).json();
    } catch (err) {
        console.log("Error", err);
    }
}