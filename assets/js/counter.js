const counterDisplayElem = document.querySelector('.counter_value');
//console.log(counterDisplayElem)
const counterMinusElem = document.querySelector('.decrement');
//console.log(counterMinusElem)
const counterPlusElem = document.querySelector('#increment');
//console.log(counterPlusElem)
var count = 0;
updateDisplay();
counterPlusElem.addEventListener("click",()=>{
    count++;
    updateDisplay();
}) ;

counterMinusElem.addEventListener("click",()=>{
    if(count>0){
    count--;

    updateDisplay();
    }
});

function updateDisplay(){
    counterDisplayElem.innerHTML = count;
    //console.log(count)
};
 

 
