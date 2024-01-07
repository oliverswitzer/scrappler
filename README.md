# A collection of my useful scrapers

## Repo structure

This repo is a monorepo with many scraping-related projects of mine. The current projects are:

* [navy-yard](./navy-yard/README.md)

   Scrapers that will create day passes at WeWork and the Brooklyn Navy Yard automatically for me.

* [rental-buddy](./rental-buddy/README.md):

    A set of scrapers and a user interface that will scrape various rental listing websites for data and aggregate them.

* [shared](./shared/.) 
    
    This directory simply houses shared playwright scraper config that is used by all projects

## Local Dev Setup

First, install Brew dependencies (if you don't have Homebrew, install it from [Homebrew's website](https://brew.sh/)):

```
brew bundle
```

Then install nodejs and direnv dependencies using `asdf` (`asdf` will have been installed in the last `brew bundle` command):

`asdf install`

To install npm deps and playwright browsers for each project.

```
make install
```

Be sure to follow any prompts to modify your shell init scripts.

Then, in each project directory (`rental-buddy/scrapers`, `rental-buddy/ui`, `navy-yard`), run:

```
cp .envrc.sample .envrc
```

Fill .envrc out based on the sample file.

### Running locally

- `npm run navy-yard`

To run scrapers for rental buddy:

- `npm run scrape --prefix rental-buddy/scrapers`

To run the rental buddy UI in dev or to deploy (via Vercel):

- `npm run dev --prefix rental-buddy/ui`
- `npm run deploy --prefix rental-buddy/ui`

### Running remotely

Checkout `Makefile` to see a list of commands to execute remote workflows on github.
