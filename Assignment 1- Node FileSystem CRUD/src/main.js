const index = require("./index")


let fileName = "test.txt";
let fileContent = "This is test file";

let fileName2 = "file.txt";
let fileContent2 = "Hello";


index.myFileWriter(fileName,fileContent);
index.myFileReader(fileName);

index.myFileWriter(fileName2, fileContent2);
index.myFileUpdater(fileName2, " World");
index.myFileReader(fileName2);

index.myFileDeleter(fileName);





//console.log(index.myFileWriter(fileName, fileContent));
//console.log(index.myFileReader(fileName));