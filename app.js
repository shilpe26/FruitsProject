//jshint esversion:6


const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB",  { useNewUrlParser: true , useUnifiedTopology: true });

const fruitSchema = new mongoose.Schema ({
  name:{
    type:String,
    required:[true, "Please check youe data entry, no name specified!"]
  },
  rating :{
    type: Number,
    min: 1,
    max: 10
  },
  review : String
});

//Mongoose model

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  rating: 10,
  review: "Peeches are so yummy!."
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

//Mongoose model

const Person = mongoose.model("Person", personSchema);

const mango = new Fruit({
  name:"Mango",
  score:9,
  review:"Greate Fruit"
});

mango.save();

Person.updateOne({name:"John"},{favouriteFruit:mango},function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("Successfully updated!");
  }
});
// const person = new Person({
//   name:"Amy",
//   age:7,
//   favouriteFruit:pineapple
// });

//person.save();

// const kiwi = new Fruit({
//   name :"Kiwi",
//   rating:10,
//   review:"The best fruit"
// });
// const orange = new Fruit({
//   name :"Orange",
//   rating:7,
//   review:"The best fruit"
// });
// const banana = new Fruit({
//   name :"Banana",
//   rating:5,
//   review:"The best fruit"
// });

// Fruit.insertMany([kiwi,orange,banana], function(err){
//   if(err){
//     console.log(err);
//   }
//     else{
//       console.log("Successfully saved");
//     }
// });
//reading from from database with mongoose
Fruit.find(function(err,fruits){
  if(err){
    console.log(err);
  }
    else{
      mongoose.connection.close();
      fruits.forEach(function(fruit){
        console.log(fruit.name);
      });
      
    }

});
//fruit.save();

// Fruit.updateOne({_id:"608e66fd2ed4040b3808606d"}, {name : "Peach"}, function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("Successfully updated!");
//   }
// });

// Fruit.deleteOne({name:"Peach"}, function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("Successfully deleted!");
//   }

// });

// Person.deleteMany({name:"John"}, function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("Successfully deleted");
//   }
// });
const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
};
