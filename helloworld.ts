const someLongVariableName =
  "This is a really long string that might break onto a new line in some cases" +
  " with concatenation.";
const anotherVariable = "Another value";
const array = [1, 2, 3, 4, 5, 6];
const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };

function testFunction(
  parameter1: number,
  parameter2: number,
  parameter3: number
) {
  return parameter1 + parameter2 + parameter3;
}

interface listNode{
  value: Number|string,
  neighbor:listNode |null,

}

function printNode(node:listNode){
  console.log("The value is:",node.value)
  console.log("The  neighbor's value is",node.neighbor?.value);
}

let myNode:listNode = {value:3,neighbor:null};
printNode(myNode)