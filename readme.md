## Overview

This is a simple demo of an API written in Node.js, hosted in Azure Functions, and uses DocumentDB as a database. In other words, there is *no server*, *no database to set up*. _Just deploy and run_.

This is a basic implementation of a server that tracks the current version of systems (nodes) deployed in various locations. Clients regularly check in, and they're told if there is a newer version of their software available.

This is only a sample of some of the concepts. Not a complete solution by any means.

## Required Reading

* [Running Azure Functions Locally with the CLI and VS Code](https://blogs.msdn.microsoft.com/appserviceteam/2016/12/01/running-azure-functions-locally-with-the-cli/)
* [MongoDB Quickstart](http://mongodb.github.io/node-mongodb-native/2.2/quick-start/)

## Why Azure Functions?

Why maintain a server if you don't have to? Azure Functions lets us focus 100% on writing our code. Azure functions worries about deployment, execution, and scaling. Every day it gets more powerful and more sophisticated.

## Why DocumentDB?

Document databases let us store JSON objects (documents) in a direct, natural way. No need to map our fields to a database and jump through unnecessary steps.

Okay, so why *DocumentDB* specifically? Simple, it was born in the cloud, designed to scale infinitely, and most importantly it's 100% hosted and managed for us. It's an excelent complement to Azure Functions.

Initially, I used the DocumentDB native client, but it was a little more verbose than I liked. Fortunately, DocumentDB also supplies a MongoDB compliant interface, and then you can use the standard MongoDB client. For this sample, it was much more simple to use.

## Running Locally

Running an Azure function locally is as easy as running `func run .\ListAllNodes\` where `ListAllNodes` is the name of your function.

## Running in Azure

It took me 60 seconds to deploy this to Azure. Simply create an Azure Function App in the portal. In my case I picked the "Consumption Plan" hosting plan option, because you're essentially paying for each request.

After creating the function app, go to the app settings.

![Function App Settings](readme-assets/Function_Settings@2x.png)

In the Deploy section, click "Configure Continuous Integration".

![Configure Continous Integration](readme-assets/Continous_Integration@2x.png)

I configured mine to deploy from this GitHub repo. (instructions omitted)

The last set was to configure the App Settings screen and set up the required application settings. Namely, the `dbUrl` parameter.

![Application Settings](readme-assets/Application_Settings@2x.png)