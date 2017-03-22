echo "Running doit.sh"

## To forcce init .git remove the # in the git line below
### BE SURE AND PUT IT BACK

################################
# rm -rf .git
#################################

## This will automatically set up a repository after remixing or force-deleting

if [  ! -d ".git" ]; then
  git init
  git add .
  git status
  echo "**********************************************"
  echo "git repository created"
  echo 
  echo "remove the comments from the commit section of .doit.sh and commit"
  echo "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"
else 
  echo "git repository exists"
fi


########################################################3
## To do a commit, uncomment the git lines below, edit with your information
# And your commit message 
# Then trigger by changing DO-IT

git status


git config user.name 'Mike Wolf'
git config user.email 'mw@mike-wolf.com'
git commit -am "changes in README file"

###########################################3


# git status
# git checkout "README.md"
