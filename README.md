# A collection of my useful scrapers

* [Brooklyn Navy Yard Scraper](./navy-yard/README.md)

### To run each scraper locally:

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

Then, in each project directory (`listings-scraper`, `navy-yard`, etc...), run:

```
cp .envrc.sample .envrc
```

Fill .envrc out based on the sample file.

### Running locally

- `npm run navy-yard`
- `npm run listings-scraper`

### Running remotely

Checkout `Makefile` to see a list of commands to execute remote workflows on github.
