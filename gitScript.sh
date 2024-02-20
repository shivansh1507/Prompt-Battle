git add -A;
git commit -m "Return response ImageController";
cd ../;
git add -A;
git stash;
git pull origin master;
git stash pop;
git commit -m "Return response ImageController";
git push origin master;

# Add an error log that tracks all the errors
# with username, email and request details.