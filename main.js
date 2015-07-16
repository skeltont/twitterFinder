var Twit = require('twit');
var helpers = require('helpers');

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

T.get('followers/ids', { screen_name: 'tyskeletor' },  function (err, data, response) {
  console.log(data.ids);
});
