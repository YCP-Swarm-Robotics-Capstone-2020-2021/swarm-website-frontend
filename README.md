# Setup
### Requirements

* All platforms
    * Nodejs & npm
        * https://nodejs.org/en/

* Windows & OSX:
    * Docker Desktop  
        * Run the relevant docker desktop installer for your OS, available from https://www.docker.com/products/docker-desktop  
    * For Windows, you also need a unix console emulator. Cmder is a good, lightweight option: https://cmder.net/  

* Linux
    * Docker Engine  
        * Go to the following link and follow the installation guide for your appropriate distro: https://hub.docker.com/search?q=&type=edition&offering=community&operating_system=linux
        * NOTE: By default, Docker requires `sudo` or root privileges to run. Optionally, you can follow instructions at the bottom
        of the distro installation page to use Docker as a non-root user
    * Docker Compose  
        * https://docs.docker.com/compose/install/#install-compose-on-linux-systems
        
### Building & Removing the Docker container
**NOTE:** The following commands must be prefaced with with `sudo` if using Linux without the optional non-root user step
mentioned above 
* Building:
`sh ./dockerUpReact.sh`
* Removing:
`sh ./dockerDownReact.sh`
        
### Connecting to the Docker container
`docker exec -it swarmreact /bin/sh`

# Running and Testing

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />