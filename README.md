# the-social

# Table Of Contents
  1. [Description](#Description)
  2. [Installation](#Installation)
  3. [Usage](#Usage)
  4. [License](#License)
  5. [Questions](#Questions)

# Description 
This is a Restful API that uses a back end for social networking website. It also uses Express.js API and is configured to using MongoDB and mongoose to interact witha NoSql database. A user is able to Create, Read, Delete, and Update (CRUD) for the databases useres and thoughts. The user is also able to not only add friends but also delete them as well by using a friendId field. Also, the user is also able toadd and delete reactions to thoughts to their profile by using an associating reactionId field as well!

# Installation
  1. Navigate to the Github repository(https://github.com/evanteems/the-social) in your web browser and click the green dropdown button that is spelled 'Code'. Then copy the SSH key to your clipboard and then open your terminal.
  2. In your terminal navigate to the desktop
  3. Type 'git clone' into your command line and paste the SSh key your copied from the web browser, then hit enter. Now a new file called 'the-social' should have been uploaded to your desktop. Due to the size of the file, Node.js is indeed a necessary module and needs to be done seperately!
  4. Once you have Node.js installed onto your computer, navigate into vscode and go to terminal on the top of the screen. Next make a new terminal with the option 'Open in intergrated terminal'.
  5. Next type the following command for node_modules: 'npm install'
  6. Check the new node_modules folder to make sure you have the correct packages installed
  7. This application used MongoDB. to download MongoDB follow these steps [on their site](https://docs.mongodb.com/manual/installation/)
  8. To easily test the Api and the query to show results, you must use the application Insomnia Core. Insomnia core is the root of making this project work. You can create direct routes with proper endpoints. Insomnia also helps with testing (CRUD) operations. To download Insomnia app click [here](https://insomnia.rest/download). Once you have Insomnia downloaded you are ready to go! When using insomnia, you can navigate to http://localhost:3001/api/</enter desired endpoint> once you have started the server with the command 'npm start'. For example, to insert users you write the url http://localhost/api/users!
  9. Once everything that was previously explained is installed, your ready to user the-social API!

# Usage
If you want a walkthrough on how this all works, please watch here. [Walkthrough video: Users](https://youtu.be/9eVSfSkf9J4), [Walkthrough video: Thoughts](https://youtu.be/D-XL-t4ER4I), [Wa;lthough video: Reactions](https://youtu.be/P-za5cb-7Cg).

# License
MIT license Copyright

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software with restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS:, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

# Questions
If you have any questions or want to collaberate in the future, you can reach the author of this repository from their github (https://github.com/evanteems)!
