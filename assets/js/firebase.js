var n
var temp
var firebaseConfig = {
    apiKey: "AIzaSyAIrRaSJzDJ2m1OSjQVFDayIamM3H21G5g",
    authDomain: "esp8266-c51a4.firebaseapp.com",
    databaseURL: "https://esp8266-c51a4-default-rtdb.firebaseio.com",
    projectId: "esp8266-c51a4",
    storageBucket: "esp8266-c51a4.appspot.com",
    messagingSenderId: "531933131103",
    appId: "1:531933131103:web:64a768496b89ca63bd46ea",
    measurementId: "G-FLL4D0ES00"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

function sendFeedback() {
    if (document.getElementById("name").value != '' &&
        document.getElementById("email").value != '' &&
        document.getElementById("subject").value != '' &&
        document.getElementById("message").value != ''
    ) {
        var Name = document.getElementById("name").value;
        var Email = document.getElementById("email").value;
        var Subject = document.getElementById("subject").value;
        var Message = document.getElementById("message").value;
        var data = {
            name: Name,
            email: Email,
            subject: Subject,
            message: Message
        }
        database.ref('Feedback').push(data);
        document.getElementById("sendMsg").innerHTML = "Your Message sent Successfully";
    }
}

function saveSubscribe() {
    var Email = document.getElementById("subscribe").value;
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (Email.match(validRegex)) {
        if (document.getElementById("subscribe").value != '') {
            var data = {
                subscriberEmail: Email
            }
            database.ref('Subscribe').push(data);
            document.getElementById("errorSub").innerHTML = "You subscribed Successfully";
        }
    }
}
   
var ref = database.ref("currentWeather");
ref.on("value", gotOne, errData);

function gotOne(data) {
    var myData = data.val();
    temp = myData.date
    document.getElementById("p1").innerHTML = myData.humidity;
    document.getElementById("p2").innerHTML = myData.temperature;
    document.getElementById("p3").innerHTML = myData.fahrenheit;
}

function errData(err) {
    console.log(err, "Error");
}

setInterval(function () {
    var d = new Date();
    n = d.getTime();
    //console.log(n, "myDate");
    //console.log(temp, "serverDate");
    //console.log(n - temp, " myDate - serverDate");
    if ((n - temp) > 8000) {
        document.getElementById("status").innerHTML = "Device Inactive";
        document.getElementById("status").classList.add('badge-warning');
        document.getElementById("status").classList.remove('badge-light');
    }
    else {
        document.getElementById("status").innerHTML = "Device Active";
        document.getElementById("status").classList.add('badge-success');
        document.getElementById("status").classList.remove('badge-light');
    }
}, 3000);



