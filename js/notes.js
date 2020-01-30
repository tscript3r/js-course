// variables
{
    /*
    DOCS:
    MDN https://developer.mozilla.org/pl/docs/Web/JavaScript

    const
    let - scope inside brackets / function / method / object, can be
        inherited from global scope, does not allow to multiple
        same nammed declarations
    var - not recommended:
        - allows multiple same named variables - overrides previous; nasty;
        - hoisting - 'pushes' variable declarations to the top of
          the script
        - deprecated

    booleans cannot be null

    {
        var varTest = "var declaration";
        const constTest = "const declaration";
        let letTest = "let declaration";
        console.log(letTest);
    }
    console.log(varTest); // <- works
    console.log(letTest); // <- reference error
    console.log(constTest); // <- would be reference error

    let $variableName - global variables should have '$' at the beggining
    */

    let $someNull = null;
    let $someUndefined;
    let $name = "string";
    let $number = 1;
    console.log("null: ", $someNull);
    console.log("undefined: ", $someUndefined);
    console.log("string: ", $name);
    console.log("number: ", $number);

    // SuperString / TemplateString
    console.log(`Number: ${$number}, Name: ${$name}`);

    console.log(`"1000"*1=${"1000"*1}`); // === number: 1000
    console.log(`"100X"*1=${"100X"*1}`); // === NaN
    console.log(`1/0=${1/0}`); // === Infinity
    console.log(`~2.5=${2.5.toFixed(0)}`); // Round === 3

    function test(a) {
        return a ? true : false;
    }

    console.log(`undefined is: ${test(undefined)}`); // false
    console.log(`null is: ${test(null)}`); // false
    console.log(`NaN is: ${test(NaN)}`); // false
    console.log(`"" is: ${test("")}`); // false
    console.log(`0 is: ${test(0)}`); // false

    const array = [1, "test", null, undefined, false];
    console.log(array);
    console.log(...array); // ... spreading

    const object = {
        name: "name", 
        age: 30
    };
    console.log(object);
}

// arithmetic operators
{
    const a = 4;
    const b = 2;
    let c = 2;
    console.log(`\na=${a}\t\tb=${b}\t\tc=${c}`);
    console.log(`a+b\t\t=${a+b}`);
    console.log(`a-b\t\t=${a-b}`);
    console.log(`a*b\t\t=${a*b}`);
    console.log(`a/b\t\t=${a/b}`);
    console.log(`5%2\t\t=${5%2}`);
    console.log(`c++\t\t=${c++}\t\tc=${c}`);
    console.log(`c--\t\t=${c--}\t\tc=${c}`);
    console.log(`c+=a\t=${c+=a}\t\tc=${c}`);
    console.log(`c-=a\t=${c-=a}\t\tc=${c}`);
    console.log(`c*=a\t=${c*=a}\t\tc=${c}`);
    console.log(`c/=a\t=${c/=a}\t\tc=${c}`);
    console.log(`c%=a\t=${c%=a}\t\tc=${c}`);
}

// comparison operators
{
/*
    ==   left equals right by value
    ===  same as == but also compares variable type
*/
console.log(`\n"1"==1\t\t${ "1" == 1 }`); // true
console.log(`"1"===1\t\t${ "1" === 1 } `); // false
console.log(`"1"==="1"\t${ "1" === "1" }`); // true

console.log(`\n"a"!=1\t\t${ "a" != 1 }`); // true
console.log(`"1"!=1\t\t${ "1" != 1 }`); // false
console.log(`"1"!==1\t\t${ "1" !== 1}`); // false

console.log(`\n"5">1\t\t${ "5" > 1 }`); // true
console.log(`"5">=1\t\t${ "5" >= 1 }`); // true

console.log(`\n2>1 && 2<3\t\t${ 2>1 && 2<3 }`); // true
console.log(`2<1 && 2<3\t\t${ 2<1 && 2<3 }`); // false
console.log(`2<1 || 2<3\t\t${ 2<1 || 2<3 }`); // true
console.log(`2<1 || 2>3\t\t${ 2<1 || 2>3 }`); // false
console.log(`!(2<1 || 2>3)\t${ !( 2<1 || 2>3 ) }\n`); // true
}

// loops
{
    for(let i = 0; i < 3; i++) {} 

    {
        let i = 0;
        while(i <= 10) {
            i+=2;
            console.log(`current: ${i}`);
        }
        console.log("");

        i = 20;
        do {
            i-=3;
            console.log(`current: ${i}`);
        } while(i >= 0);
    }

    {
        console.log('');
        const numbers = [5, 8, 10, 23, 48, 60];
        numbers.forEach((number) => {
            if(number%2 == 0)
                console.log(`number%2 == 0: ${number}`);
        });
    }

    {
        const numbers = [1, 2, 3];
        for (const number of numbers) {
            
        }
    }
}

// arrays methods
{
    console.log("");

    function getArray() {
        return [1, 2, 3, 4, 5];
    }

    const unshiftArray = getArray();
    unshiftArray.unshift(-1, 0); 
    console.log(`unshift: ${unshiftArray}`); // -1, 0, 1, 2, 3, 4, 5 / adds elements to the begining of the array

    const shiftArray = getArray(); 
    const removedElement = shiftArray.shift();
    console.log(`shift: ${shiftArray}, removedElement: ${removedElement}`); // 2, 3, 4, 5 / removes first element of the array and returns it (removed = 1)

    const pushArray = getArray();
    const length = pushArray.push(6);
    console.log(`push: ${pushArray}, len: ${length}`); // 1, 2, 3, 4, 5, 6 / adds given element to the end of the array & returns new array length

    const popArray = getArray();
    const number = popArray.pop();
    console.log(`pop: ${popArray}, returned: ${number}`); // 1, 2, 3, 4 / returns last element of the array

    const mapArray = getArray();
    const mappedArray = mapArray.map((x) => x * 10);
    console.log(`map original: ${mapArray}, mapped: ${mappedArray}`); // maps and returns new mapped array 

    const firstConcatArray = getArray();
    const secondConcatArray = getArray();
    const mergedArrays = firstConcatArray.concat(secondConcatArray);
    console.log(`concat: ${mergedArrays}`); // merges two or more arrays into one / returns new merged array

    const firstArray = getArray();
    const secondArray = [...firstArray, ...getArray()];
    console.log(`spreading: ${secondArray}`);

    const sliceNegativeArray = getArray();
    console.log(`sliced -2: ${sliceNegativeArray.slice(-2)}`); // 4, 5 / returns x last elements (on negative argument)

    const slicePositiveArray = getArray();
    console.log(`sliced 1: ${slicePositiveArray.slice(1)}`); // 2, 3, 4, 5 

    const sliceRangeArray = getArray();
    console.log(`sliced 1, 2: ${sliceRangeArray.slice(1, 3)}`); // 2, 3

    const filterArray = getArray();
    console.log(`filtered x==2: ${filterArray.filter((a) => a==2)}`); // 2

    const colors = ["red", "green", "blue"];
    colors.unshift("magenda");
    colors.push("yellow");

    function firstLetterUpperCase(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    for(let i = 0; i < colors.length; i++) 
        console.log(`color: ${firstLetterUpperCase(colors[i])}`);
    
    // exercise
    let carsString = "Audi, Mercedes, BMW, Nissan, Dodge";
    let carsArray = carsString.split(", ");
    carsArray.includes("Audi") ? carsArray.push("Ferrari") : carsArray.pop();
    console.log(...carsArray);
}

// functions
{
    // PRIMITIVES ARE PASSED BY VALUE
    // OBJECTS & ARRAYS ARE PASSED BY REFERENCE

    // function declaration - hoisting effect like with var, not recommended 
    function declaration() {}

    // expression function
    const expression = function () {}

    const toManyParams = function(a, b) {}
    toManyParams(1, 2, 3, 4, 5); // valid - additional arguments are ignored (JS rly..)

    // anonymous function expression - recommended way to declare functions
    const anonymous = a => console.log(a); 

    // defining functions with default value arguments
    const defaultValue = (number = 5) => console.log(number);
    const increment = (a = 0, b = 0) => console.log(a + b);

    // rest - ... as function argument creates an array of the given arguments
    function restUsage(...x) {
        console.log(x);
    }

    const globalVar = "test";
    const test = () => {
        const globalVar = "overriden";
        console.log(globalVar); // overridden
    }

    const numbers = [1, 2, 3, 4, 5];
    const callbackFunction = (number) => number * 2;
    const results = numbers.map(callbackFunction);
}

// DOM - Document Object Model
{
    /* 
        DOM is not a part of JavaScript, JS gives only the ability to work with it
        DOM is represented by window class in JS. It's a global, one of the main 
        JS classes. Basiclly window class represents the window of the browser
    */

    // deprecated; most being seen function for getting elements by ID
    const liId = document.getElementById("item"); 

    // deprecated; getting list of elements with given class name 
    const liList = document.getElementsByClassName("item-class");

    // deprecated; getting any li elements of the document
    const liTags = document.getElementsByTagName("li"); 

    // ES6; recommended; returns first found mathing element. As argument requires CSS3 selectors
    const qsItemId = document.querySelector("#item");
    
    // ES6; recommended; returns list of found elements in the document. As argument requires CSS3 selectors
    const qsLiClassList = document.querySelectorAll(".item-class");
    const qsLiTagList = document.querySelectorAll("li");
    
    // adding new elements to a found element
    const ulList = document.querySelector("ul");
    const newLiElement = document.createElement("li");
    ulList.appendChild(newLiElement).textContent = "new element";

    // adding new ul list to document
    const newUlList = document.createElement("ul");
    const secondNewLiElement = document.createElement("li");
    secondNewLiElement.textContent = "new list li element";
    newUlList.appendChild(secondNewLiElement);
    document.body.appendChild(newUlList);

    

}