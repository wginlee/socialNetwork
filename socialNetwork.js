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

//given a name, return a list of their followers
function getFollowersByName(name){
  var list = [];

  for (var f in data){ //for everyone in data

    var nameFollows = [];
    for (var n of data[f].follows){ //loop the follows list
       if (name == getNameFromId(n)){ //convert id into names and compare with our input name
        list.push(data[f].name); //if there is a match, throw this stalker's name into our list
       }
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

//determines if everyone who the id follows has followed them back
function isFollowedBack(id){
  var followers = getFollowers(id, 0);
  var follows = getFollows(id, 0);

  for (var f in follows){
    if (followers.indexOf(f) == -1) return false;
  }

  return true;
}

//List everyone who follows someone who hasn't followed them back
function listLeftHanging(){
  var list = [];
  for ( var i in data){
    if (!isFollowedBack(i)) list.push(data[i].name);
  }

  return list;

}

//sum of # of followers and # of followers of followers
function getReach(id){
  var followersArray = getFollowers(id, 0);
  var reachSet = new Set();

  console.log("followersArray", followersArray);
  for (var fName of followersArray){
    let followerFollowers = getFollowersByName(fName);
    console.log(getNameFromId(id) + "\'s follower " + fName + " has the followers "  + followerFollowers);

    for ( var ffName of followerFollowers){
        reachSet.add(ffName);
    }

  }

  reachSet.delete(getNameFromId(id)); //remove the person whose reach we are searching for in the first place
  console.log(reachSet);
  return reachSet.size;
}

//list everyone's reaches
function listReach(){
  var list = "";
  for (var i in data){
    list += data[i].name + "\'s reach is " + getReach(i) + "\n";
  }
  return list;
}

// --------------------------------------------------------------------------------------
// console.log(getNameFromId("f01"));
// console.log(listEveryone());
// console.log( mostFollows(0).toString() , "follow(s) the most people.");
// console.log( mostFollows(30).toString() , "follow(s) the most people over 30.");

// console.log("\n", mostFollowers(0).toString() , "have the most followers.");
// console.log( mostFollowers(30).toString() , "have the most followers over 30.");

// console.log( "\nPoor sods in the friendzone:", listLeftHanging().toString());

// var test = "f03";

// console.log(getFollowers(test, 0) , getFollowersByName("Charlie"));


// console.log( getNameFromId(test) , " reach is ", getReach(test) );

// var test1 = "f01";
// console.log(getFollowers(test1, 0) , getFollowersByName("Alice"));

// var test2 = "f02";
// console.log( getNameFromId(test2) , " reach is ", getReach(test2));

// var test3 = "f03";
// console.log( getNameFromId(test3) , " reach is ", getReach(test3));

// var test4 = "f04";
// console.log( getNameFromId(test4) , " reach is ", getReach(test4));

// var test5 = "f05";
// console.log( getNameFromId(test5) , " reach is ", getReach(test5));

// var test6 = "f06";
// console.log( getNameFromId(test6) , " reach is ", getReach(test6));
// console.log(isOverAge("f04", 0));

console.log(listReach());