# What is Nota Bene?
An awesome API that allows for badass CRUD note taking action

## Getting Started

After you have cloned this repo, please set up the application by running:

`npm install`

After setting up, you can run the application using node:

`node app.js`

The default port is set to 5000 so you can access the API at this URL

`http://localhost:5000/api/`

## API Documentation

### Get All Notes

GET: `api/notes`

### Get a certain note

GET: `api/notes/:id`

### Search for note

GET: `api/notes?q=search_term`

### Create a note

POST: `api/notes`

### Update a note

PUT: `api/notes/:id`

### Delete a note

DELETE: `api/notes/:id`

## Testing
Install Jasmine CLI

`npm install -g jasmine`

To run specs enter this command into your terminal within project directory

`jasmine`

## Additional Questions

### How well does your note-searching-api scale or not scale? How would you make
your search more efficient?

- My note searching api would not scale very well. Currently it is just a LIKE query on the database and there is also no indexing. This would mean that you could/would get results that are less relevant to what the user was searching for when there is more notes(data) in the system. This would also make the search slow as there are more notes because the data set that you get back could large.

- To help it scale I would put in something like Elastic Search into the system to help.

### How would you add security to your API?

- I would add authentication in front of the API, more than likely using the oAuth2 protocol.

- I would choose oAuth over Basic Auth(Username/Password), because it's much easier to use brute force or dictionary attacks. This is true because you can only make the password rules so complex and long before it is a strain on the developers wanting to develop using your API.

### What features should we add to this API next?

- Ability to update and delete a note(I already implemented this)
- Associate a note a user. This would require a user table with a one to many association
- Ability to add a tag/category. This would allow for better organization if it is something a user desired.
- Ability to link the note so you could share it with others.
- Data syncing. This would allow notes to be available across multiple platforms (iOS, Android, Web, Etc.) in near real-time.

### How would you test the API?

Assuming that the API was implemented using a the MVC pattern I would test the following ways

#### Model Specs
- Validation specs. This would test that we have validations in place for attributes that are required and must be unique.

- Testing any business logic within the model.

#### Response Specs

- Testing each endpoint that you can get a response back from

- Testing successful and unsuccessful responses. This would include status codes, content-type, and other relevant headers and the body

- Testing that the response structure is correct, meaning that the attributes on the object you expect to be there are there.

- Testing that if you ask for a list of items that it comes back with an array around the objects


#### Continuious Integration

- I am huge fan of always testing the entire code base whenever a pull request comes in.
