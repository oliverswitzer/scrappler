# A collection of my useful scrapers

* [Brooklyn Navy Yard Scraper](./navy-yard/README.md)

### To run each scraper locally:

First, install direnv to automatically source .envrc files:

```
brew install direnv
```

Be sure to follow any prompts to modify your shell init scripts.

Then, in each project directory, run:

```
cp .envrc.sample .envrc   # Fill .envrc out based on the sample file
```

### Running remotely

Checkout `Makefile` to see a list of commands to execute remote workflows on github.
