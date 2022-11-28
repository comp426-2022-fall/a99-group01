# This document explains the functionality of each html page and how the user interacts with it.

## acc_deleted
'acc_deleted' displays when the user clicks the button "Delete Account" from 'acc_info'. On the page, the user sees text displayed at the top, informing them their account is successfully deleted. At the bottom of the page, there is a button labeled "Go to Login" to navigate the user to 'login'.

## acc_info
'acc_info' is displayed when the user clicks the button "Account Info" from 'home'. 'acc_info' displays the user's username, assword, and the option for the user to delete their account by inputting their username and password and clicking the button labeled "Delete Account". Once the user clicks the button labeled "Delete Account" they will be taken to ''. If the user clicks the button labeled "Go to Home", they will be navigated to 'home'. 

## bad_login
'bad_login' is displayed when the user clicks the button labeled "login" on 'login' with a username and password that is not in the database. The page informs the user, "Credentials not found" and there is a button labeled "Return to Login Page" that navigates the user back to 'login'. 

## home
The 'home' is displayed once a user signs in with their account. On the screen, the user sees text displayed at the top along with four buttons at the bottom of the page. In order from left to right, the first button labeled "new entry" takes the user to the 'new_entry' page, the second button labeled "view history" navigates the user to the 'view_history' page, the third button labeled "account info" navigates the user to the 'acc_info' page, and the last button labeled "logout" navigates the user to the 'login' page.

## login
The 'login' is the first screen the user sees when they open/ navigate to the website. On the login screen, you will see the option to sign in at the top and the option to create an account at the bottom. New users can create a username and password at the bottom of the screen. Once the user clicks create account, they will be navigated to the 'new_acc_made' page and if the username is taken, they will navigated to 'username_exists' page. Returning users can sign in with their username and password at the top. Once the user clicks to log-in, they will be taken to the 'home' page.  

## new_acc_made
The 'new_acc_made' displays once the user creates a new account. The user can read the text and see their account was created successfully and navigate back to the 'login' page to sign in. 

## new_entry
The 'new_entry' is displayed when the user clicks on a button labeled "new entry" from the 'home' page. On the 'new_entry' page, the user is shown three text boxes with text accompanying it. The first text box labeled "message" is where the user can type a a few sentences about how they are feeling or whathever thoughts they want to log. The second text box labeled "positive/negative" is where the user can type either word and is the connotation associated with the message. The third text box labeled "Date (MM/DD/YYY)" is where the user inputs the date of the message. Once the user has those fields typed in, the user can click the button "create new entry" to have all of the information saved. Once the user clicks the button, they will be navigated to the 'success_entry' page. Once the user is done with their entry, they can click on the button labeled "go to home" to navigate back to the 'home' page.

## success_entry
The 'success_entry' is displayed when the user clicks the button labeled "create new entry" from the 'new_entry' page. On this screen, the user sees text saying the entry was created successfully and a button labeled "go to home" for the user to navigate to the 'home' page.

## username_exists
The 'username_exists' displays when the user tries to create an account with a username that is registered to someone else. The user can read the text that displays on the screen saying the user must pick a different username and navigate back to the 'login' page to sign in.

## view_history
'View History' is displayed when the user clicks the button "view history" from the 'home' page. On this page, the user sees a log of all of their past entries including the message, sentiment, and date. At the bottom of the page, there is a button labeled "return home" that navigates the user to the 'home' page.

# The following is a hidden endpoint that is technically accessible but a user will not need them

## view_logs
'view_logs' keeps track of user interactions. For each interaction, it first shows which user interacted with our website, second it shows what the user clicked on or what page the user went to, and the third thing it shows is the date along with the time the user performed the action. 