const fs = require('fs');

const readLocalData = () => {
	const data =  fs.readFileSync('./data.json', 'utf-8')
  const { username } = JSON.parse(data);
  if(username)
    return username
  else return false;

};

exports.readLocalData = readLocalData;
