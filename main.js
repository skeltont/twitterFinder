var Twit = require('twit');
var helpers = require('helpers');
var fs = require('fs');

var T = new Twit(helpers.return_config());
/*

// This is the real way to do it via docs at https://github.com/ttezel/twit
// I've just hidden mine cuz I don't want none of y'all makin' weird posts for me.

var T = new Twit({
    consumer_key:         '...'
  , consumer_secret:      '...'
  , access_token:         '...'
  , access_token_secret:  '...'
})
*/

function assembleInitialHash(accounts, callback) {
  var followerHash = {};
  var name = '';
  var count = 0;
  // for (var key in accounts) {
  for(var i = 0; i < accounts.length; i++) {
    if (accounts.hasOwnProperty(i)) {
      name = accounts[i];
      console.log('name: ' + name);
      T.get('followers/ids', { screen_name: name },  function (err, data, response) {
        if (err || name === '') {
        // if (err) {
          console.log(name + ' resulted in a bad query: ');
          console.log(err);
          if (++count === accounts.length) {
            console.log('not gucci');
            callback(followerHash);
          }
        } else {
          console.log('test');
          followerHash[name] = data.id;
          if (++count === accounts.length) {
            console.log('gucci');
            callback(followerHash);
          }
        }
      });
    }
  }
}

function compare(followerHash, callback) {
  var potentialAccounts = {};
  var curr = null;

  for (var account in followerHash) {
    if (followerHash.hasOwnProperty(account)) {
      for (var id in followerHash[account]) {
        if (followerHash[account].hasOwnProperty(id)) {
          curr = followerHash[account][id];
          if (potentialAccounts[curr] === undefined) {
            potentialAccounts[curr] = 1;
          } else {
            potentialAccounts[curr] = potentialAccounts[curr] + 1;
          }
        }
      }
    }
  }
  console.log('second');
  callback(potentialAccounts);
}

function assembleFinalList(potentialAccounts, numUsableAccounts, callback) {
  var finalAccounts = {final: []};
  for (var key in potentialAccounts) {
    if (potentialAccounts.hasOwnProperty(key)) {
      if (potentialAccounts[key] === numUsableAccounts)
        finalAccounts.final.push(key);
    }
  }
  console.log('third');
  callback(finalAccounts);
}

function writeFinalResults (finalAccounts, callback) {
  fs.writeFile('twitterFinderResults.txt', finalAccounts.final, function(err) {
    if (err) return console.log(err);
    console.log('Process completed, results in "twitterFinderResults.txt"');
  });
}

function main() {
  var args = process.argv.slice(2);
  var fileName = '';
  var accounts = [];
  var numUsableAccounts = 0;

  if (args.length !== 1) {
    console.log('one file, pls');
    return;
  } else {
    fileName = args[0];
    accounts = fs.readFileSync('test.txt').toString().split("\n");
  }

  assembleInitialHash(accounts, function(followerHash) {
    console.log('first');
    compare(followerHash, function(potentialAccounts) {
      numUsableAccounts = Object.keys(followerHash).length;
      console.log(numUsableAccounts);
      assembleFinalList(potentialAccounts, numUsableAccounts, function(finalAccounts) {
        writeFinalResults(finalAccounts);
      });
    });
  });
}

main();
