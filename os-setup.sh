# run as sudo
#
#

# update package lists
apt update
apt upgrade

# install an onscreen keyboard incase we need it
apt install -y matchbox-keyboard

# install node and npm via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

nvm install node

# install packages for this project
cd client
npm i
cd -

cd server
npm i
