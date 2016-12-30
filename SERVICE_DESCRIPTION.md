# service description

the services are `STOOGE` services, curly, larry, and mo.

![](img/stooges.gif)

- each instance offers a basic API.  when someone does a `GET /beep`, the service replies with `bop`s.
  - if a stooge is beeped, he beeps his brother, and he his brother, until all are bopped.  this is chained/domino-like effect.
- the responses tell you:
  - when each stooge was `bop`ped
  - on what host the stooge was `bop`ped
  - and how the stooge was `bop`ped.
  ```js
  {
    "stooge": "larry",
    "hostname": "tw-cdaringe.local",
    "timestamp": "2016-12-28T19:05:05.654Z",
    "bop": "punch" // smack, poke, flick, ...and other weird things stooges do to each other
  }
  ```
  - finally, the user gets a set of `bop`s, one for each stooge!
  - **you can /beep any stooge**, and he will start the beep-bop chain on his brothers!
