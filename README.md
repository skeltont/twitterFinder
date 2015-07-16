# twitterFinder
find someone's twitter based on who you heard they follow. nothing fancy.<br>
SHOUTS OUT TO https://github.com/ttezel/twit, because I used their api. 

## Install
<ul>
  <li> clone repo
  <li> setup config at top of main.js w/ your twitter api credentials.
</ul>
## Usage:
make a text file and name it whatever:<br>
```
vim whatever.txt
```
fill it with account names, seperated by newline:
```
tyskeletor
TempoReynad
officialmcafee
```

then run:
```
node main.js whatever.txt
```

Your results will be in a file called 
```
twitterFinderResults.txt
```
