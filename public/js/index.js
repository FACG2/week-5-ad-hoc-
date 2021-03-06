(() => {
    //when page loads make request for aqoute
    window.addEventListener("load", (event) => {
        //make request for new qoute
        event.preventDefault();
        getQoute((err, qouteBody) => {
            if (err) {
                //handle the error - Print it to the user
                alertUser(err, 'load event');
            } else {
                //dom the data
                renderQoute(qouteBody);
            }
        })
    });


    //when button refresh clicked make request for new qoute
    document.getElementById('refresh').addEventListener('click', (event) => {
        event.preventDefault();
        //make request for new qoute
        //dom the data
        getQoute((err, qouteBody) => {
            if (err) {
                //handle the error - Print it to the user
                alertUser(err, 'refresh btn');
            } else {
                //dom the data
                renderQoute(qouteBody);
            }
        })
    })

    //when button playAudio if clicked play the audio on the background
    document.getElementById('playAudio').addEventListener('click', (event) => {
        //make request for audio for the text
        //play the sound
        event.preventDefault();
        let text = document.getElementById('qoute').textContent;
        getAudio(text, (err, data) => {
            if (err)
                alertUser(err, 'audio btn')
            else {
                let audio = new Audio(data);
                audio.play();
            }
        })
    })

    //make atweet
    document.getElementById('tweet').addEventListener('click', (event) => {
        event.preventDefault();
        //make atweet

        getQoute((err, qouteBody) => {
            if (err) {
                //handle the error - Print it to the user
                alertUser(err, 'tweet btn');
            } else {
                //dom the data
                var text = document.getElementById('qoute').textContent;
                let tlink = `https://twitter.com/home/?status=${encodeURIComponent(text)}`
                window.open(tlink);
            }
        })
    })


    //handling errors
    function alertUser(err, location) {
        element.textContent(`There was an error in ${location} that says: ${err}`);
    }

    //renderind
    //render the qouts
    function renderQoute(qouteBody) {
        let author = document.getElementById('auth')
        let qoute = document.getElementById('qoute')
        let qoutelink = document.getElementById('qoutelink')
            // if (qouteBody.quoteAuthor)
        author.textContent = qouteBody.quoteAuthor != '' ? qouteBody.quoteAuthor : 'UnKnown';
        // else
        //   author.textContent = 'UnKnown';
        qoute.textContent = qouteBody.quoteText;
        qoutelink.href = qouteBody.quoteLink;
        var photo = document.getElementById('photo');
        photo.setAttribute('src', 'https://api.adorable.io/avatar/128/' + qouteBody.quoteAuthor);
        photo.setAttribute("class", "photo");

        genaratRandomBGColor();
    }

    //request function
    //genarat Random Color for body background
    function genaratRandomBGColor() {
        var background = document.body;
        background.style.background = randomColor();

    }
    //pik color randomly from 20 item length array
    function randomColor() {
        var randomNum = Math.floor(Math.random() * 6);
        var colors = {
            0: '#7B1FA2', //red
            1: '#9C27B0', //pink
            2: '#C51162', //purple
            3: '#EC407A', // indigo
            4: '#0097A7', // blue
            5: '#1A237E', // light-green
        };
        return colors[randomNum];
    }
})();