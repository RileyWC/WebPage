# Git and Github Notes

Followed tutorials by [Fireship](https://www.youtube.com/watch?v=HkdAHXoRtos) on YouTube.

git is a version control system that keeps different past milestones on your files.

Different branches can be made and merged so that multiple lines of changes can be made and eventually compiled together.

`.gitignore` file is a file that lists things for git to filter out in your directory like private information, logs, and dependencies.


## Commands

### Startup

`git init` makes a new repository in the current directory

### Committing

`git add .` stages files to be committed. (`.` is the current directory)

`git reset .` unstages files as an argument. (`--hard` will also delete those files)

`git commit -m "message"` commits all staged files with a message and unstages them.



### Branches
`git branch` lists all branches with a star next to your current branch.

`git checkout -b <branch_name>` switches branches (if new name, it creates a branch).

`git merge <branch_name>` merges the most recent commit in the argument branch to its parent branch

### Stashing
`git stash -u` saves the working directory withot committing.

`git stash pop` restores back to wha you had stashed.


## Github
#### Add an existing Repository to Github:
```
git remote add origin <url>
git push -u origin master
```

`git clone <url>` copies a repository to your local directory












