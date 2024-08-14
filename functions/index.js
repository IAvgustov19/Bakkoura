const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./bakkoura-app-firebase-adminsdk-ziu1e-cada306c64.json'); // Path to your service account key
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// exports.sendNotification = functions.firestore
//     .document('Messages/{messageId}')
//     .onCreate(async (snapshot, context) => {
//         const messageData = snapshot.data();
//         const messageId = context.params.messageId;

//         console.log('newMessage:', messageData);
//         console.log('Message ID:', messageId);

//         if (!messageData) {
//             console.error('Message data is null or undefined');
//             return null;
//         }

//         const payload = {
//             notification: {
//                 title: 'New message',
//                 body: 'Message',
//             },
//             token: 'd-7WaFPRTMOJis4lWlMo7y:APA91bEFpOdXLznykGO0o5Z0s5w6t6h6x1DNuTKSIt5eknV6QCIRP26pZHLbddCahgZV24TuHN4lcrTBbx8U_0PzQyZ5XbnfVlVvbpm0nVZR00p2_P_wdCYDXKsjeU0CfD2jodhofH9w',
//         };

//         try {
//             const response = await admin.messaging().send(payload);
//             console.log('Successfully sent message:', response);
//             return response;
//         } catch (error) {
//             console.error('Error sending message:', error);
//             return null;
//         }
//     });


    
// functions/index.js

exports.sendNotification = functions.https.onCall(async (data, context) => {
    const { token, title, body, senderId, chatId } = data;

    const message = {
        token: token,
        notification: {
            title: title,
            body: body,
        },
        data: {
            senderId: senderId,
            chatId: chatId,
        }
    };

    try {
        const response = await admin.messaging().send(message);
        return { success: true, response };
    } catch (error) {
        return { success: false, error };
    }
});
