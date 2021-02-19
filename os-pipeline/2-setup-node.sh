# install node and npm via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
nvm install v12.6.0

# install global static server
npm install -g serve

# install server packages
cd server
npm i
cd ..

# install client packages and build static files
cd client
npm i
npm run-script build