# Picotracker (Web Frontend)

Picotracker provides an alternative sorting system to the Lexaloffle BBS. Instead of sorting games forum-style where any game can be bumped to the top of the list with a new comment, Picotracker prioritises games based on their BBS engagement (likes and comments), while penalising older games by reducing a game's rating based on how many days have elapsed since its release.

More information about Picotracker's rating system and data handling can be found in the [API repo](https://github.com/ruairid/picotracker-api).

## Running

 1. `yarn install`
 2. `yarn run debug`

If you are also running a local API instance to debug against, update the URL in `apiRoot.js`.
