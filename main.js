var Twit = require('twit')



T.get('followers/ids', { screen_name: 'tyskeletor' },  function (err, data, response) {
  console.log(data);
});
