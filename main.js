prediction_1 = ''
prediction_2 = ''

Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
})

camera = document.getElementById("camera");

Webcam.attach( '#camera' )

function takesnap() {
    Webcam.snap(function(data_uri) {
        document.getElementById('result').innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    
    });
}

console.log('ml5 version: ', ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/lXLtK8j8h/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = tospeak
    var utterThis = new SpeechSynthesisUtterance(speak_data_1)
    synth.speak(utterThis);
    
}

function check () {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

    function gotResult(error, results) {
        if (error) {
            console.error(error);    
        } else {
            console.log(results)
            document.getElementById('irlemotion').innerHTML = results[0].label;
            prediction_1 = results[0].label;
            tospeak = ''
            if(prediction_1 == 'amazing') {
                 document.getElementById('updteemoji').innerHTML = '👌'
                 tospeak = "This is Amazing"
            }

           else if(prediction_1 == 'best') {
                document.getElementById('updteemoji').innerHTML = '👍'
                tospeak = "All the Best"
           }
           if(prediction_1 == 'victory') {
            document.getElementById('updteemoji').innerHTML = '✌️'
            tospeak = "Vitory is always towards us"
           }
           speak()
        }

    }