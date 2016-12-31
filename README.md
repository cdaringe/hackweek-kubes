# hackweek-kubernetes

## what it does

- creates a kubernetes cluster
- creates a set of interconnected services. see [SERVICE_DESCRIPTION](SERVICE_DESCRIPTION.md) for what they do!
- deploys services onto the cluster

## setup

### install docker locally

- head to [docker.io](http://www.docker.io) for instructions.
- run docker!

### build services

- install nodejs
- cd into this project
- run `npm install`
- run `npm run bootstrap` (this installs and links of the deps for the packages in `packages/`)
- cd `packages/stooge`
- `npm run build-image`
  - `docker images` should now show a `stooge` image!

### cluster
- install kubernetes, http://kubernetes.io/docs/user-guide/prereqs/
- do this great stuff https://coreos.com/kubernetes/docs/latest/kubernetes-on-vagrant.html
  - skip the install kubernetes step--you've already done this.  it also recommends an old version :poop:
  - skip the container runtime option. we'll use docker, though rkt sounds neat :)
  - ?skip the network policy thing, because i don't know what that is/does.
  - use the default `config.rb.sample`.  just rename it to `config.rb`
  - `vagrant box update` will fail, if on osx (most likely).  fixes are prescribed here: https://github.com/mitchellh/vagrant/issues/7747

### usage

- to make sure everything boots up ok, let's run this thing sans clustering
  - `docker-compose up` to launch & network all of the containers!
  - browse to localhost:600{1,2,3}/beep. observe.
  - `docker-compose down`

but you wanna cluster?
  - `kubectl -f three-stooge-services.yaml` after you've set the cluster context (see vagrant coreos docs above)
  - wait for `kubectl get pods` to show all three pods running
  - visit `localhost:3200{1,2,3}`, and observe the response.
    - fails `/beep`, at least on my machine. see https://github.com/kubernetes/kubernetes/issues/39329
