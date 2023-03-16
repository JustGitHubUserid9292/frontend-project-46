install:
	npm ci
lint:
	npx eslint .
report:
	npm test -- --coverage --coverageProvider=v8

