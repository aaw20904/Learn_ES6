window.onload = function() {
const msg ="every\
day"; 
    const temp = 20;
    let obj = [    "one","two","three"];
    console.log(`The temperature is ${temp} deg. Celsius\n`);
    console.log(msg);
var myNode = document.querySelector("#myid01");
myNode.innerText = msg;
    for(let q of obj ){
        console.log(q);
    }
}
 