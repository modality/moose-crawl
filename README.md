# Moose Crawl

Expedition planning tool for ICBMoose's hexcrawling rules. Software by Michael Hansen. Original hexcrawling rules by ICBMoose can be found [here](https://docs.google.com/document/d/1OXq5BbhAblS1OicmxWaCW1Zd68aiO7SGWJvyJ46jY8s/edit).

## Development

- Installing: `yarn install`
- Running dev server: `yarn parcel src/index.html`, then visit http://localhost:1234
- Creating a production build: On the `deploy` branch, run `yarn parcel build src/index.html --no-optimize --dist-dir docs --public-url /moose-crawl/`
