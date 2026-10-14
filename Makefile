# gos-js — React reference implementation + UI kit for imsmith/design-system.
# `make sync` vendors the stylesheet, token CSS, fonts, and sprite from a
# design-system checkout; `make bundle` re-transpiles changed components.
DESIGN_SYSTEM ?= ../design-system
BOX = distrobox enter design-system --

.PHONY: sync bundle demo check

sync:                             ## vendor styles.css, tokens/*.css, fonts/, assets/marks/sprite.svg
	cp $(DESIGN_SYSTEM)/styles.css styles.css
	mkdir -p tokens fonts assets/marks
	cp $(DESIGN_SYSTEM)/tokens/*.css tokens/
	cp $(DESIGN_SYSTEM)/fonts/*.ttf fonts/
	cp $(DESIGN_SYSTEM)/assets/marks/sprite.svg assets/marks/sprite.svg
	git -C $(DESIGN_SYSTEM) rev-parse HEAD > design-system.rev
	@echo "synced from design-system @ $$(cat design-system.rev)"

bundle:                           ## re-transpile changed components/**/*.jsx into _ds_bundle.js (distrobox, esbuild)
	$(BOX) python3 tools/rebundle.py

check: bundle                     ## bundle is fresh and parses
	$(BOX) node --check _ds_bundle.js && git diff --quiet -- _ds_bundle.js && echo "bundle: fresh"

demo:                             ## serve the demo page and the component cards
	@echo "http://127.0.0.1:8768/demo/" && python3 -m http.server 8768 --bind 127.0.0.1
