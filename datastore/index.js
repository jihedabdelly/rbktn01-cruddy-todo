const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    fs.appendFile(`test/testData/${id}.txt`, text, err => {
      if (err) throw err

    callback(null, { id, text });

    })

   // items[id] = text;
  });

};


exports.readAll = (callback) => {
  var array = []
  fs.readdir('test/testData', (err,data)=> data.forEach((one,i) => fs.readFile('test/testData/' + one , (err ,tds) => {

    if(tds) array.push(tds + "")

     if(array.length === i+1) {
       callback(null, array)
       console.log("ARRRRRR",array)
      }

  })))
  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, data);
};

exports.readOne = (id, callback) => {
  fs.readdir('test/testData', (err,data)=> data.filter((one,i) => one === id+".txt") )

  fs.readFile('test/testData/' + id + ".txt", (err ,tds) => callback(null, {id, text:tds+""}))

  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
