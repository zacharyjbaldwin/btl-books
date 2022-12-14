# Between The Lines

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.1.
# Local Development

## Prerequisites
1. Install Git for your system. ([Download for Windows](https://git-scm.com/download/win))
2. Install NodeJS version 16 or later. ([Download](https://nodejs.org/en/))
3. Install the Angular CLI (version 14) by opening a terminal window and typing `npm install -g @angular/cli`. This allows you to use `ng` commands which you will use to serve, build, and generate components for, the Angular project.

## Clone the repo
1. Open a terminal window and type `git clone https://github.com/zacharyjbaldwin/bookstore-frontend.git`. This will create another folder in your working directory called `bookstore-frontend`.
2. Type `cd bookstore-frontend` to navigate to that folder.

## Install dependencies
1. Open a terminal window in the `bookstore-frontend` folder if you don't already have one open.
2. Run `npm install` and wait for the dependencies to finish installing.

## Run it
In the project root folder, open a terminal window and type `ng serve`. This command may take a minute or two the first time you run it, but once it is finished, navigate to `localhost:4200` in the browser to see the application running. You can make changes to the application's files while it is running, and it will automatically update in the browser.
## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

# Branching and Pull Requests
I would reccommend using VSCode for local development - if you don't already - because it has a great interface for git.

In software development, it is good practice to logically seperate your code changes from the master/main branch of the application's codebase. This allows small changes to be accepted little-by-little, and makes it easy to revert changes in case bugs appear later on.

### Terminology

Repo (aka Repository) - where the code is stored (e.g. GitHub, GitLabs, Azure Devops, etc.)

Branch - A logically seperated collection of code changes

Master branch - The main branch containing good and working code, on which all other branches will be based (in 99% of cases).

Pull request - A request for the changes in your branch to be merged into the master branch


## Creating a Branch

1. After you have done everything in the `Local Development` section, you should create a branch for your code changes. You can do this by clicking the `Source Control` tab on the left sidebar in VSCode, clicking on the ... at the top of the panel, then clicking `Branch` > `Create Branch From`.

2. Enter the name for your branch. The name of the branch should be related to the work you will be doing. For instance, if you are going to implement the Cart page for the app, your branch could be called `implement-cart-page` or something similar. The naming is up to you, but it should be clear what the content of the branch is based on the branch name.

3. When you are prompted to select a ref to create your branch from, choose `origin/master`. Make sure not to select just `master`.

4. You can now begin working in this branch.

## Pushing content to the repo

1. When you are satisfied with your work in your branch, open the source control panel on the left sidebar in VSCode. You can see all of your changes there.

2. Click the + icon that appears when you hover over the `Changes` header. This stages all of your files for commit.

3. Add a commit message at the top of the source control panel. This is just a short description of what you did. For instance, if you implemented the cart page for the front-end, you could write 'Implemented cart page' or something of the like.

4. With your commit message entered and all of your changes staged, you can now click the big blue button that will either say 'Commit' or 'Publish Branch'

5. Your code is now published to a branch in GitHub.

6. Remember to create another branch before you start working on a different feature.

***If you need help with any step in this process, ask!***

## Creating a pull request

Once you have published your branch to the repo, it will be visible on the GitHub page for the repo.

1. Go to the [GitHub page for the repo](https://github.com/zacharyjbaldwin/bookstore-frontend)

2. Click the `Pull requests` tab at the top.

3. Click the green button says `New pull request`

4. In the dropdown labeled `base`, make sure that says `master`, and on the dropdown labeled `compare`, make sure that is the name of the branch you want to merge to master.

5. Click the green button that says `Create pull request`

6. If there are any merge conflicts, or you are unable to create a pull request, let someone know in the group chat.
