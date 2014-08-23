if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to autoSudoku.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

var init = [1,2,3,4,5,6,7,8,9];

var Table = [shuffle(init),shuffle(init),shuffle(init),shuffle(init),shuffle(init),shuffle(init),shuffle(init),shuffle(init),shuffle(init)];
