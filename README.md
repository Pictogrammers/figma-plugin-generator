# Pictogrammers Figma Plugin Generator

## Development

### Requirements

- Node v18+

### Getting Started

1. Clone this repo.
2. Run `npm i` to install dependencies.
3. Run the appropriate `get-data` script to populate the plugin with the library you want to work with.
   - Material Design Icons - `npm run get-data mdi`
   - Material Design Icons Light - `npm run get-data mdil`
   - Memory Icons - `npm run get-data memory`
4. Start the dev server up via `npm run dev`.
5. In Figma, point the pluging at the `manifest.json` in the root of the repo.

### Building for Publishing

1. Be certain the library you're publishing is local by running the appropriate `get-data` script.
2. Run `npm run build` to build the production version.
3. Open the `manifest.json` in Figma and go through the publishing steps.

### How does this work?

This repository contains a small React app that mimic's the Pictogramer's website functionality around search and display of an icon library. When you run the `get-data` script, it actually pulls the generated library and search index from the website and stores those files locally. These files get bundled up with the plugin so that the plugin is completely self-contained. Everytime we release an updated version of a library, we will need to publish an updated version of the Figma plugin.

## License

Pictogrammers Free License
