function start_auth() {
    setTimeout(function() {
        lightdm.start_authentication("evan");
    }, 1000);
}

function init() {
    for (var i = 0; i < lightdm.sessions.length; i++) {
        var session = lightdm.sessions[i];
        var s = document.createElement('option');
        s.innerHTML = session.name;
        s.setAttribute("value", session.key);
        s.id = "s" + i;

        document.getElementById("sessions").appendChild(s);
    }

	document.getElementById("pass").addEventListener("keyup", function(event) {
	    event.preventDefault();
    	if (event.keyCode === 13) {
        	auth();
    	}
	});

    document.getElementById('shutdown').addEventListener('click', function(event) {
        lightdm.shutdown();
    });

    document.getElementById('restart').addEventListener('click', function(event) {
        lightdm.restart();
    });

    document.getElementById('suspend').addEventListener('click', function(event) {
        lightdm.suspend();
    });


    start_auth();
}

function show_prompt(text, type) {}
function show_message(text, type) {
    var el = document.getElementById('message');
    if(type === "error") {
        el.style.color = "red";
    } else {
        el.style.color = "green";
    }
    el.innerHTML = text;
}
function autologin_timer_expired(username) {}

function auth() {
    var entry = document.getElementById('pass');
    lightdm.provide_secret(entry.value);
}

function authentication_complete() {
    if (lightdm.is_authenticated) {
        var session = document.getElementById('sessions').value;
        show_message("Correct Password, Logging in", "success");
        lightdm.login (lightdm.authentication_user, session);
    } else {
        show_message("Incorrect Password", "error");
        start_auth();
    }
};

init();
