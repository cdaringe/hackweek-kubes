# what did i do?

- deployed a multi host cluster onto a series of vagrant VMs
- build a set of interconnected services that talk to one another
  - each request would trigger a domino effect, where for the end user to get a resonse, each service would need to append something to the payload.
    - curly, larry, moe!
- dockerized the service(s)
  - deployed dummy service to dockerhub!
- deployed the interconnected services to my cluster
- live updated the cluster without any downtime (rolling update)
- became very familiar with:
  - `kubectl`
  - kubernetes `Deployments`, `Services`, etc
- i also:
  - learned about `kubectl proxy`
  - learned about kubernetes' ui (show it)
  - discovered good resources from the `coreOs` devs on slack
  - posted and closed various issues on SO regarding the `Deployment` model
  - was able to debug CoreOS's kubernetes boot sequence
    - how it downloads `kubelet` on the fly
    - how it uses `systemd` and the `kubelet` user to download

# what i didn't do

- build the UI to visualize it
- dial in the interconnectivity in the service
  - i cheated and verified service interop on my local machine, in docker compose, but am on the cusp of having them actually chat, host agnostic, on the kubernetes cluster

