all: ts scss
	tsc
	sass scss/bundle.scss build/hi.css

ts: ts
	tsc

scss: scss
	sass scss/bundle.scss build/hi.css

watch-ts:
	tsc --watch

watch-scss:
	sass --watch scss/bundle.scss build/hi.css

watch-all:
	tsc --watch & sass --watch scss/bundle.scss build/hi.css