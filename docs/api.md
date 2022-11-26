# List of API Endpoints 

- All endpoints enter information into the interactions database when they are reached. The username, date/time, and type of interaction are logged for every endpoint listed below.

## app.get('/')

- Redirects to app.get('/login')

## app.get('/app')

- Redirects to app.get('/login')

## app.get('/login)

- Renders the ~/views/login page. This is the main login page.

## app.post('/login')

- Recieves username and password from login page. Determines whether user exists in users database and if password matches. If so, redirects to app.get('/home'). If not, redirects to app.get('/stale_login'). 

## app.get('/stale_login')

- Renders the ~/views/bad_login page. This is the page a user views when their login is unsuccessful.

## app.get('/home')

- Renders the ~/views/home page. This is a user's main home page.

## app.get('/acc_info')

- Renders the ~/views/acc_info page. This is the page where users can see information about their own account, or choose to delete their account.

## app.get('/view_history')

- Renders the ~/views/view_history page. This is the page where users can see all the previous messages they have logged in their journal.

## app.get('/view_logs')

- This is a hidden endpoint. Navigating to this endpoint will render the ~/views/view_logs page, where an admin can view all of the interactions with the server.

## app.get('/new_entry')

- Renders the ~/views/new_entry page. This is the page where users will input a new entry to their journal.

## app.post('/new_entry')

- Receives information from ~/views/new_entry. Inputs the username, message, sentiment, and date into the 'data' database. This contains all of the user's journal entries.

## app.post('/newacc')

- Receives information from the login page if a new account creation is selected. Will create the username and password and add it into the users database. If the username exists, render the ~/views/username_exists page, so that user can try a different username. If successful account creation, render the ~views/new_acc_made to notify user of successfull account creation.

## app.post('/delete_acc')

- Receives username and password from the ~/views/acc_info page. If username and password are correct, this endpoint will delete the account from the users database, and also remove all user information from the data database. 

## app.get('/users_db')

## app.get('/logs_db')

## app.get('/data_db')



