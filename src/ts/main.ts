import { hello } from "./hello";

function show(divname : string, name : string) {
    const elt = document.getElementById(divname);
    elt.innerText = hello(name);
}

show('greeting', 'jaaa'); 