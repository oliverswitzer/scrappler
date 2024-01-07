run-navy-yard-remote:
	gh workflow run 'Run navy yard scraper'

install: install-playwright
	npm i --prefix rental-buddy/scrapers
	npm i --prefix navy-yard
	npm i --prefix shared

install-playwright:
	npx playwright install

rb-deploy:
	cd rental-buddy/ui && vercel deploy
