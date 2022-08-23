<!-- <div style="display: flex; flex-direction: column; justify-content: center;"> -->
<div style="position: relative;">

<div align="center">
  <h1 style="color:'white'"> Project Atelier | Supernova </h1>
</div>

 <h2 style="color:'white'">About</h2>

Previously our team was tasked with creating a complete redesign of an outdated client-facing retail web-portal including but not limited to branding, and website functionality. This project comprises a complete redesign of the back-end architecture for that retail portal intended to address the client's concerns of speed and scalability and this repository outlines the questions and answers API endpoint.

<hr style="background-color: #5c5c5c;height: 2.0px;"/>

<p align="center">
<a href="#-overview-" style="color:'white'">Overview</a> |
<a href="#-results-" style="color:'white'">Results</a> |
<a href="#-scripts-" style="color:'white'">Scripts</a> |
<a href="#-contributors-" style="color:'white'">Contributors</a>
</p>

<hr style="background-color: #5c5c5c;height: 2.0px;"/>

<h2 style="color:'white'"> Overview </h2>

To address the clients concerns of speed and scalability I indexed our tables, used nested SQL queries to aggrigate data into json objects, and deployed multiple server instances behind a load balancer.
<hr style="background-color: #5c5c5c;height: 2.0px;"/>

<h2 style="color: 'white'"> Results </h2>

<!-- talk about results -->
<h3 style="color: 'white'"> Questions Endpoint </h3>

![Questions](https://i.imgur.com/NqLO2UZ.png)
<h3 style="color: 'white'"> Answers Endpoint</h3>

![Answers](https://i.imgur.com/4t2eiHZ.png)

<h4 style="color: 'white'"> Average Response Time </h4>

As outlined above, at 1k RPS (one thousand requests per second) the response time for the questions endpoint was able to be reduced from 293ms to 6ms and the answers endpoint was able to be reduced down from 377ms to 6ms

<h4 style="color: 'white'"> Average Error Rate </h4>
Similarly, the average error rate was able to be lowered from 68.33% and 39.26% to 0% respectively.

<hr style="background-color: #5c5c5c;height: 2.0px;"/>

<h2 style="color: 'white'"> Scripts </h3>

The following scripts can be found in package.json


`npm run server-dev`

<i> Launches nodemon to watch the server path</i>

```
// in package.json

"scripts": {
    "server-dev": "npx nodemon --watch server server/server.js"
  },
```
<hr style="background-color: #5c5c5c;height: 2.0px;"/>


<h2 style="color:'white'"> Contributors </h2>

<table >
    <td align="center">
        <a href="https://github.com/Symphon-y" style="color: white; text-decoration: none;">
            <img src="https://avatars.githubusercontent.com/u/90964291?v=4?s=100" width="100px;" alt=""/>
            <br />
            <sub>
                <b><span style="color: white"> Travis R. </span> | <span style="color: 'white'"> Symphon-y </span></b>
            </sub>
        </a>
        <br /><br>
        <a href="https://github.com/TitanInSpirit/Project_Atelier/pulls?q=is%3Apr+is%3Aclosed+author%3ASymphon-y" title="Commits">💻</a> &nbsp;
        <a href="https://github.com/TitanInSpirit/Project_Atelier/tree/main/src/components/overview" title="Component">📖</a> &nbsp;
    </td>
<table>
</div>
    <div style="position: absolute; top: 150vw; left: -8vw; opacity: .04; background-image: url(Assets/leftFoot.svg); background-repeat: no-repeat; transform: scale(100);">
    &nbsp;
    </div>
        <div style="position: absolute; top: 400vw; margin-left: 90vw; opacity: .04; background-image: url(Assets/Favicon.svg); background-repeat: no-repeat; transform: scale(100);">
    &nbsp;
    </div>
        <div style="position: absolute; top: 850vw; left: -8vw; opacity: .04; background-image: url(Assets/leftFoot.svg); background-repeat: no-repeat; transform: scale(100);">
    &nbsp;
    </div>
</div>
