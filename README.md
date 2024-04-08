<div align="center">
  <a href="https://koyeb.com">
    <img src="https://www.koyeb.com/static/images/icons/koyeb.svg" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">Koyeb Serverless Platform</h3>
  <p align="center">
    Deploy an autonomous AI trip planning application on Koyeb
    <br />
    <a href="https://koyeb.com">Learn more about Koyeb</a>
    ·
    <a href="https://koyeb.com/docs">Explore the documentation</a>
    ·
    <a href="https://koyeb.com/tutorials">Discover our tutorials</a>
  </p>
</div>


## About Koyeb and the autonomous AI trip planning application example

Koyeb is a developer-friendly serverless platform to deploy apps globally. No-ops, servers, or infrastructure management required.

This repository contains a trip planning application built using autonomous AI agents.  It uses OpenAI, SerpApi, AutoGPT, and LangChain to build custom travel itineraries based on the selected destination and trip duration.  The AI agent researches available options and communicates its actions and reasoning for every step of the process.

This example application is designed to show how real-time applications using autonomous AI agents can be deployed on Koyeb.

## Getting Started

Follow the steps below to deploy and run the autonomous AI trip planning application on your Koyeb account.

### Requirements

You need:

* a Koyeb account to successfully deploy and run this application. If you don't already have an account, you can sign-up for free [here](https://app.koyeb.com/auth/signup).
* an [OpenAI API key](https://platform.openai.com/api-keys) to access the AI models.
* a [SerpApi API key](https://serpapi.com/dashboard) to perform and interpret searches.

### Deploy using the Koyeb button

The fastest way to deploy the autonomous AI trip planning application is to click the **Deploy to Koyeb** button below.

[![Deploy to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?name=ai-trip-planner&type=git&repository=koyeb%2Fexample-autonomous-ai-trip-planner&branch=main&builder=buildpack&env%5BOPENAI_API_KEY%5D=CHANGE_ME&env%5BSERPAPI_API_KEY%5D=CHANGE_ME&ports=8000%3Bhttp%3B%2F)

Clicking on this button brings you to the Koyeb App creation page with everything pre-set to launch this application.  Modify the value of the `OPENAI_API_KEY` and `SERPAPI_API_KEY` environment variables with your own keys and launch the application.

_To modify this application example, you will need to fork this repository. Checkout the [fork and deploy](#fork-and-deploy-to-koyeb) instructions._

### Fork and deploy to Koyeb

If you want to customize and enhance this application, you need to fork this repository.

If you used the **Deploy to Koyeb** button, you can simply link your service to your forked repository to be able to push changes.
Alternatively, you can manually create the application as described below.

On the [Koyeb Control Panel](//app.koyeb.com/apps), on the **Overview** tab, click the **Create Web Service** button to begin.

1. Select **GitHub** as the deployment method.
2. In the repositories list, select the repository you just forked.
3. Under **Environment variables**, click **Add variable** to add your OpenAI API key as `OPENAI_API_KEY`.  Click **Add variable** again to add your SerpApi API key as `SERPAPI_API_KEY`.
4. Choose a name for your App and Service, for example `ai-trip-planner`, and click **Deploy**.

You will be taken to the deployment page where you can follow the build of your application. Once the build is completed, your application is being deployed and you will be able to access it via `<YOUR_APP_NAME>-<YOUR_ORG_NAME>.koyeb.app`.

## Contributing

If you have any questions, ideas or suggestions regarding this application sample, feel free to open an [issue](https://github.com/koyeb/example-autonomous-ai-trip-planner/issues) or fork this repository and open a [pull request](https://github.com/koyeb/example-autonomous-ai-trip-planner/pulls).

## Contact

[Koyeb](https://www.koyeb.com) - [@gokoyeb](https://twitter.com/gokoyeb) - [Slack](http://slack.koyeb.com/)
