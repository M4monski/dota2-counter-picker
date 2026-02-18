# Dota 2 Counter Picker

A web application to help Dota 2 players find the best counter picks against an enemy team composition.

## Features

- **Hero Browser**: View all heroes from Dota 2.
- **Search**: Quickly find heroes by name.
- **Sortable Stats**: Sort heroes by name, win rate, and pick rate to see current meta trends.
- **Enemy Team Selection**: Select up to 5 heroes from the enemy team.
- **Counter Analysis**: Get a list of recommended counter picks based on your selection.
  - **Good Against**: Heroes that perform well against the selected enemy heroes.
  - **Bad Against**: Heroes that are weak against the selected enemy heroes.
- **Advantage Score**: See a calculated advantage percentage for each counter pick.

## How it works

The application fetches hero and match data from the OpenDota API. When you select enemy heroes, it analyzes the matchups for each of them.

It calculates an "overall advantage" for every potential hero against the selected enemies. This is based on the win rate in games where those matchups occurred.

- A positive advantage score means the hero is generally a good pick.
- A negative advantage score means the hero is generally a bad pick.

The results are then sorted to show you the most effective counters at the top.

## Tech Stack

- React
- Tailwind CSS
- FontAwesome
