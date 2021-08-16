# BookBriefing
Book Briefing is an application created using JS + Rails where you can leave reviews on books and others can like and comment on your review.
## Installation 
1. Make one folder and inside that folder clone both repos:
    - ``git clone git@github.com:jessicaajosephh/book-briefing-client.git``
    - ``git clone git@github.com:jessicaajosephh/book-briefing-api.git``
2. cd book-briefing-api
3. Install the gemfile packages
    - ``bundle install``
4. Set up the Database
    - ``rails db:migrate``
    - optionally seed the database: ``rails db:seed``
5. Starting the Server (keep open while running the program)
    - rails s
6. cd into book-briefing-client
    - run ``open index.html``
    - This will open in your browser.
## Contributing 
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
## License
[MIT](https://choosealicense.com/licenses/mit/)