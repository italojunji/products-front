# products-front
Frontend of product list app

# PowerShell commands used in Windows OS

## installs fnm (Fast Node Manager)
winget install Schniz.fnm

## enables a env to use fnm
fnm env --use-on-cd | Out-String | Invoke-Expression

## download and install Node.js
fnm use --install-if-missing 20

## verifies the right Node.js version is in the environment
node -v # should print `v20.15.1`

## verifies the right NPM version is in the environment
npm -v # should print `10.7.0`

## install node packages
npm install

## install angular material
ng add @angular/material