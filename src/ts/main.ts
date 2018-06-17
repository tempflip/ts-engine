import { hello } from "./hello";

function show(divname : string, name : string) {
    const div = document.getElementById(divname);
    div.innerHTML = hello(name);
}

show('greeting', 'peter'); 