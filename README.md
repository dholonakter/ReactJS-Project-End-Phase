# ProEP-Group8

This repo holds code for our PRO_EP project

## The Way of The GitMaster:

- `git clone + <repository_URL>`
   - Creates a clone or copy of a targeted existing repository into a newly created directory.

- `Git fetch [--all/-a/-f/-t]`
    - downloads new data(updates/changes) from a remote repository, but it does not integrate any of this new data. 

- `git pull`
    - updates current HEAD branch with the latest changes from the remote server. It not only downloads new data; it also directly integrates this new data.
    - It is Highly recommended to start a "git pull" with no uncommitted local changes(a clean working copy). 
    - "`git pull`" tries to merge remote changes with your local ones, a so-called "merge conflict" can occur. 

- `git add [-A/-u/-f/.]`
    - Adds the content of the specified file(s) at the time the "git add" command is run. "git add" is used to stage changes for the next commit.

- `git commit`
    - Sets a checkpoint in the development process which you can go back to later if needed.
    - You need to write a short message to explain what we have developed or changed in the source code with the command:
    `git commit -m "<commit message>"`

- `git push`
    - Uploads commits to the remote repository.(Commit changes first!)
    - If the branch is newly created, then you need to upload the branch with the command:
    `git push --set-upstream <remote> <branch_name>` or 
    `git push -u origin <branch_name>`

- `git branch`
    - Creates new branch locally. This allows several developers are able to work in parallel on the same project simultaneously.

- `git checkout [-b]`
    - Used to switch from one branch to another. 
    - Also used for checking out files and commits.
    - Important steps to succesfully switch between branches:
        - The changes in your currrent branch must be committed or stashed before you switch
        - The branch you want to check out should exist in your local
        - Shortcut command that allows you to create and switch to a branch at the same time:
        `git checkout -b <branch_name>` (-b stands for branch)

- `git status`
    - Gives all necessary information about the current branch
    - Information like:
        - Wether the current branch is up to date
        - Wether there is anything to commit, push or pull
        - Wether there are files staged, unstaged or untracked
        - Wether there are files created, modified or deleted

- `git merge`
    - Integrates your feature branch with all of its commits back to the dev(master) branch.
    - It's important to be on the specific branch that you want to merge with your feature branch.
    - How to merge the feature branch into the dev branch:
        - `git checkout dev`
        - `git fetch`
        - `git merge <branch_name>`

- `git revert`
    - This is a safe way to undo commits.
    - Steps to revert:
        - To see the commit history use `git log --oneline`
        - `git revert <hash_code>`
        - *shift-q* to exit



Options:
- `-a/--all`
    - This takes everything into account(stages all changes).
- .
    - stages new files and modifications, without deletions
- `-u/--set-upstream`
    - creates an upstream tracking connection and is especially useful when publishing a local branch on a remote for the first time.
    - git add -u= stages modifications and deletions, without new files
- `--amend`
    - nothing more than a reset --soft HEAD
- `--tags`
    - pushes all local tags

Terminology:
- remote (repository/server): 
    A common repository that all team members use to exchange their changes. Usually stored in a code hosting service like GitHub.
- origin:
    Is a shorthand name for the remote repository(URL) that a project was originally cloned from. 
    Example: origin = https://github.com/Ka-Sien/InternShip.git
- HEAD:
    Reference to the last commit in the currently checked-out branch.
    You can see the HEAD as the "Current Branch".


## Installation

- install node js
- check that python and pip is installed

```
C:> py --version
Python 3.N.N
C:> py -m pip --version
pip X.Y.Z from ... (python 3.N.N)
```

- input the following into the terminal when opened in the main repository folder

` npm install `

` pip install Django==3.2.7 `

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Filezilla Environment Setup

Protocol: `FTP - File Transfer Protocol`
Host: `hera.fhict.nl`
Port: *empty or 21*
Encryption: `only use plain FTP (insecure)`
Logon Type: `Normal`
User: `i383988`
Password: `passw0rd`
*Connect*

## phpMyAdmin 
https://phpmyadmin.hera.fhict.nl/index.php

User: `bdi383988`
Password: `passw0rd`

## React

React tutorial series 
https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d


## Django

Django follow the MVC pattern.
Tutorial series (Videos #21-#25 on user registration and login)
https://www.youtube.com/playlist?list=PLsyeobzWxl7r2ukVgTqIQcl-1T0C2mzau


## Django + React integration

https://www.youtube.com/watch?v=F9o4GSkSo40


### Database connection with Django and MySQL

https://www.askpython.com/django/django-mysql