# 🛑 StopIt
## Lock Your content and media node Names from being accidentally renamed.

*Created at UDUF 2025, an Umbraco package to prevent backoffice users from renaming, moving or deleting media folders*

Currently the toggle is only available for the Media folder,  future extension is to allow this toggle to be used across any content type.

## Overview

Ever had a node name accidentally changed in your Umbraco site? 
Say goodbye to those headaches with **StopIt** — a handy little package that lets you 
Lock the Name field of Content and Media nodes so it can't be changed unless explicitly unlocked by an admin.

## ✨ Key Features

- 🔐 **Lock/Unlock node names** for Content (Coming Soon) and Media items and folders  
- ✅ Simple toggle interface — lock it when you're done, unlock when edits are needed  
- 🔧 Ideal for protecting key nodes in large or collaborative environments  
- 🎉 Born at the **Umbraco Down Under Festival 2025 Hackathon**!

## 🛠 Use Cases

- Prevent renaming of critical pages or media folders  
- Reduce accidental changes in multi-editor setups  
- Keep naming conventions consistent and enforced  

## 🚀 Installation

Install via NuGet or manually, and you're ready to lock things down:

``Install-Package our.UDUF.StopIt``

## 📖 Documentation

1. Create a Data type of type `StopIt` in the backoffice. 
2. Add StopIt to your DocType or MediaType. The Alias must be set to `udufStopIt`
   - For Content Types (Coming Soon), add it to the DocType.
   - For Media Types, add it to the MediaType.
3. For any node you want to lock, toggle the lock switch and save / publish.


---

Keep your content tidy, protected, and under control — with **StopIt**.


# Contributing

== Requirements ==
* Node LTS Version 20.17.0+
* Use a tool such as NVM (Node Version Manager) for your OS to help manage multiple versions of Node

== Steps ==
* Open a terminal inside the `\Client` folder
* Run `npm install` to install all the dependencies
* Run `npm run build` to build the project
* The build output is copied to `wwwroot\App_Plugins\`

== File Watching ==
* Add this Razor Class Library Project as a project reference to an Umbraco Website project
* From the `\Client` folder run the command `npm run watch` this will monitor the changes to the *.ts files and rebuild the project
* With the Umbraco website project running the Razor Class Library Project will refresh the browser when the build is complete

== Suggestion ==
* Use VSCode as the editor of choice as it has good tooling support for TypeScript and it will recommend a VSCode Extension for good Lit WebComponent completions

== Other Resources ==
* Umbraco Docs - https://docs.umbraco.com/umbraco-cms/customizing/extend-and-customize-editing-experience

