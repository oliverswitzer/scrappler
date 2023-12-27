# BK Navy Yard Scraper

Used to automatically create a pass for myself at the Brooklyn navy yard every day :)

# Usage

### To run locally:

First, install direnv to automatically source .envrc files:

```
brew install direnv
```

Be sure to follow any prompts to modify your shell init scripts.

Then, run:

```
cp .envrc.sample .envrc   # Fill .envrc out based on the sample file
```

To run either scraping script:

```
npm run navy-yard
npm run wework
```

### To run the remotely (on github actions)

`make run-remote`
