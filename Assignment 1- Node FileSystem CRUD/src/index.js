const fs = require('fs')

const myFileWriter = async (fileName, fileContent) => {
	// write code here
	// dont chnage function name

	await fs.writeFile(fileName, fileContent, (err) => {
		if(err)
		{
			console.log(err);
		}
	})

}

const myFileReader = async (fileName) => {
	// write code here
	// dont chnage function name

	await fs.readFile(fileName, "utf-8", (err,data) => {
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log(data);
		}


	});
}


const myFileUpdater = async (fileName, fileContent) => {
	// write code here
	// dont chnage function name

	await fs.appendFile(fileName, fileContent, (err) => {
		if(err)
		{
			console.log(err);
		}
	})
}

const myFileDeleter = async (fileName) => {
	// write code here
	// dont chnage function name

	await fs.unlink(fileName, (err) => {
		if(err)
		{
			console.log(err);
		}
	})
}

myFileReader("text2.txt");

module.exports = { myFileWriter, myFileUpdater, myFileReader, myFileDeleter };