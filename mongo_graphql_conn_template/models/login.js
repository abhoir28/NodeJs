 const collectionUserdetails = 'userDetails';

const userDetailsTemp = {
    "email": null,
    "loginType": null,
    "username": null,
    "profileName": null,
    "profileImage": null,
    "password": null,
    "gender": null,
    "userDescription": null,
    "address": {
        "latitude": null,
        "longitude": null
    },
    "postalCode": null,
    "followers": [],
    "following": [],
    "followersCount": 0,
    "followingCount": 0,
    "mobileNumber": null,
    "bucketList": [],
    "subBucketList": [],
    "uploadedImages": [],
    "uploadedImagesCount": 0,
    "eventPast": [],
    "eventPresent": [],
    "eventFuture": [],
    "eventWishList": [],
    "likedBusinessPages": ['doubt'],
    "loginHistory": [],
    "paymentHistory": [],
    "referral": null,
    "accountCreationTime": null,
    "accountCreationDate": null,
};

export default async function login(db, email, loginType, profileName, profileImage) {

    var datetime = new Date();
    // username
    // let obj = Object.assign(userDetailsTemp, details)
    // console.log(obj);
    userDetailsTemp._id = email;
    userDetailsTemp.email = email;
    userDetailsTemp.username = email.split('@')[0];
    userDetailsTemp.profileName = profileName;
    userDetailsTemp.profileImage = profileImage;
    userDetailsTemp.loginType = loginType;

    userDetailsTemp.accountCreationDate = datetime.getDate() + '-' + datetime.getMonth() + '-' + datetime.getFullYear();
    userDetailsTemp.accountCreationTime = datetime.getHours() + '-' + datetime.getMinutes() + '-' + datetime.getSeconds();

    var myPromise = () => {
        return new Promise((resolve, reject) => {

            db.collection(collectionUserdetails).find({
                "username": userDetailsTemp.username
            }).toArray(function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    if (result.length >= 1) {
                        console.log("User already exists");
                        resolve("User already exists");
                    } else {

                        db.collection(collectionUserdetails).insertOne(userDetailsTemp, function (err, data) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(`${userDetailsTemp.username} successfully registered`);
                                console.log(`${userDetailsTemp.username} successfully registered`);
                            }

                        });

                    }

                }
            });

        });
    };

    let returnData = await myPromise();

    return returnData;

}