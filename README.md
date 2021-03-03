# MeLi-Magneto

API for Mutant Genome detection as per [Definition](docs/definition/Examen%20Mercadolibre%20-%20Mutantes.pdf)

## Features

- Identifies if a Gnome is a Mutant Genome
- Outputs the Ratio between Mutants and Humans

## Tech

- [Typescript] - Typed JavaScript at Any Scale.
- [node.js] - ES6 Compiled from Typescript
- [InversifyJS] - A powerful and lightweight inversion of control container for JavaScript & Node.js apps powered by TypeScript.

## Local Development

- [node.js] - V15

## Build
```sh
npm install
npm run build
```

AWS Lambda Code will be generated as a Zip in the dist folder of each subpackage, CI/CD Code is not included

## Testing
```sh
npm install
npm run coverage
```

This command must be executed inside each sub-package folder

## Live Version

A Live version of this code can be found at the following endpoints (Also included as [Postman Collection](docs/postman/MeLi%20Mutant.postman_collection.json))

- Mutant Identification: **POST** https://api.softwarevil.com/meli/mutant
- Mutant Ratio Query: **GET** https://api.softwarevil.com/meli/stats

See: [OpenApi 3](docs/openapi/MeLi-Magneto-oas30.yaml)

## Live Architecture

The previous Live Demo is deployed in AWS as follow

![Alt text](docs/diagram/Architecture.png?raw=true "Live Architecture")

## How it Works

A Gemone is treated as a 2D Square String Array in which each Sequence is extracted as a whole String in Horizontal, Vertical, Left and Right Diagonal way.

Each String is then matched to a Regex that determines if at least 4 consecutive characters are present. 

If at least 2 sets of 4 consecutive characters are found in the Genome, The sample is treated as a Mutant Genome and stored for further analysis.

## Posible Improvements

- Logging
- CI/CD Per Project / Currently Using my own
- Local Execution

## License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <https://unlicense.org>
