## Description:
A react-native app that screens users from randomuser.me API and can CRUD a user using Redux.

### Installation:

1.  Clone the project to your local machine
    ```sh
    git clone https://github.com/liorkasti/kst-users
    ```
1.  Install the application dependencies, run:
    ```sh
    npm install `or` yarn
    ```
1.  Run metro bundler
    ```sh
    npm start `or` yarn start
    ```
1.  Build the apk and install on your emulator or plugin device frontend (in another terminal)
    For Android, run:
    ```sh
    npm android  `or` yarn android
    ```
    For iOS, run:
    ```sh
    npm ios  `or` yarn ios
    ```

Enjoy! thank you.

### TODOs:

- [ ] Upgrade theming and handle dark mode.
- [x] Open a modal with confirm or cancel when delete user .
- [x] Add a search filter by email, name, id and location.
- [x] Screens data provided via an Ajax Request - https://randomuser.me/api/?results=10.
- [x] Add ability to create, remove and edit a user.
- [x] Validate input data.
- [x] Error managing.