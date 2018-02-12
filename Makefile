.PHONY: build package publish \
		set-executable deps \
		clean deep-clean

build: set-executable
	bin/build.sh

package: set-executable
	bin/package.sh

publish: set-executable
	bin/publish.sh

set-executable:
	chmod -c +x bin/*.sh

deps:
	yarn

clean:
	rm -rf target
	rm -rf yarn*.log

deep-clean: clean
	rm -rf node_modules
