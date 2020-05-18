// Variables
const btnStart = document.getElementById("btnStart");
const data = document.getElementById("inputData");
const enteredContainer = document.getElementById("enteredData");
const visualization = document.getElementById("visualization");
const graph = document.getElementById("graph");
const actualData = document.getElementById("actualData");
let outputData = [];
// Event Listeners
eventListeners();

function eventListeners(){
    btnStart.addEventListener('click', start);
}

// Function
function start(e){
    e.preventDefault();

    //Validate of the information
    if(validateData(data.value)){
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            icon: 'success',
            title: 'Starting...',
        });
        // Shows the data entered in a div
        enteredData.style.display = "block";
        // Shows the bars of the data
        visualization.style.display = "block";
        // Shows the current state of the data
        actualData.style.display = "block";
        // Insert data to graph
        insertData(data.value);
        sortAlgorithm(outputData);
    } else {
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            icon: 'error',
            title: 'Invalid data, try again.',
        });
    }
}

// This function verifies if all elements of data are a number
function validateData(data){
    let valid = true;
    let numbers = data.split(",");
    numbers.forEach(element => {if(isNaN(element)) valid = false});
    return valid;
}

function insertData(numbers){
    let data = numbers.split(',');
    let entered = document.createElement('p');
    entered.innerText = "[" + numbers + "]";
    enteredData.appendChild(entered);

    // Data visualization
    data.forEach(function(number) {
        let bar = document.createElement('div');
        bar.classList = "bar";
        let width = parseInt(number) + 10;
        bar.style.width = width + "px";
        bar.textContent = number;
        graph.appendChild(bar);
        outputData.push(parseInt(number));
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function sortAlgorithm(numbers){
    let unorderedData = graph.childNodes;
    let temporal = 0;
    let temporalGraph;
    let ordered = false;
    let i = 0;
    let length = numbers.length-1;
    console.log(length);
    while(ordered == false){
        if(numbers[i] > numbers[i+1]){
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                icon: 'success',
                text: numbers[i] + ' is greater than ' + numbers[i+1] + ' -> CHANGE',
            });
            let node1 = unorderedData[i];
            console.log(node1);
            temporal = numbers[i];
            numbers[i] = numbers[i+1];
            numbers[i+1] = temporal;
        }
        if(i == length) {
            i = 0;
            length--;
        }
        else {
            i++;
        }
        if(length == 0) {
            ordered = true;
        }
    }
}