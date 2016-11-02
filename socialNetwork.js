var data = {
   "f01": {name: "Alice",
           age: 15,
           follows: ["f02", "f03", "f04"]},
   "f02": {name: "Bob",
           age: 20,
           follows: ["f05", "f06"]},
   "f03": {name: "Charlie",
           age: 35,
           follows: ["f01", "f04", "f06"]},
   "f04": {name: "Debbie",
           age: 40,
           follows: ["f01", "f02", "f03", "f05", "f06"]},
   "f05": {name: "Elizabeth",
           age: 45,
           follows: ["f04"]},
   "f06": {name: "Finn",
           age: 25,
           follows: ["f05"]
         }
       }

function getNameFromId (id){
  return data[id].name;
}

function getAgeFromId (id){
  return data[id].age;
}

function listEveryone(){
  var list = "";
  for (var id in data){
    let person = data[id];
    let follows = getFollows(id,0);
    let followers = getFollowers(id,0);


    list += person.name + " follows " + follows + "; and is followed by " + followers + ".\n";
  }

  return list;
}

//get the array of people over a certain age that the person associated with the given id follows
function getFollows(id, age){
  var list = [];
  var follows = data[id].follows;
  for (var f = 0 ; f < follows.length ; f += 1 ){
    if ( isOverAge( follows[f] , age) )
     list.push( getNameFromId(follows[f]) );
  }
  return list;
}

//gets the array of followers of a person associated with the given id over a certain age
//unfortunately, this function does not get you followers on facebook
function getFollowers(id, age){
  var list = [];

  for (var f in data){
    if (data[f].follows.indexOf(id) != -1 && isOverAge(f, age) ){
      list.push( data[f].name );
    }
  }

  return list;
}




//determines if the person associated with the given id is over a specified age (true or false)
function isOverAge(id, age){
  return (data[id].age > age);
}

//gets the array of people (or person) who follows the most people over a specified age
function mostFollows(age){
  var most = 0;
  var personMost = [];

  for (var i in data){
    let numFollows = getFollows(i, age).length;
    if (numFollows > most ){
      most = numFollows;
      personMost = [data[i].name];
    }
    else if (numFollows == most){
      personMost.push(data[i].name);
    }

  }
  return personMost;
}


function mostFollowers(age){
  var most = 0;
  var personMost = [];


  for (var i in data){
    let numFollows = getFollowers(i, age).length;
    if (numFollows > most ){
      most = numFollows;
      personMost = [data[i].name];
    }
    else if (numFollows == most){
      personMost.push(data[i].name);
    }

  }
  return personMost;

}

// --------------------------------------------------------------------------------------
// console.log(getNameFromId("f01"));
console.log(listEveryone());
console.log( mostFollows(0).toString() , "follow(s) the most people.");
console.log( mostFollows(30).toString() , "follow(s) the most people over 30.");

console.log("\n", mostFollowers(0).toString() , "have the most followers.");
console.log( mostFollowers(30).toString() , "have the most followers over 30.");

// console.log(isOverAge("f04", 0));