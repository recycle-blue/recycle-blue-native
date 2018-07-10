# Recycle Blue

![RECYCLE BLUE](https://i.imgur.com/OvnLvTn.png)

Recycle Blue is a social network and marketplace application that is designed to incentivize users to recycle more.
This is achieved by gamifying the activity of recycling by using a points and milestones system.

Users can document their recycling activities by pressing the + button located on the top right of the screen.
This will activate the phone's camera and the user can take a picture of their recycling activity.
Recycle Blue uses AI tagging services to classify user Images and then assigns points to the user based on how recyclable their item is.  User's can view their Recycling activity on their user dashboard as well as view their weekly recycling activity and their progress towards their next milestone. User's can share their activities to other social media platforms as well as view a feed of all their friends' recent activities.


### Prerequisites

You will need Node and node package mangager as well as git to run our application. 

To run Recycle Blue on your device you must have Expo installed on your mobile device. Expo can be found in your phone's app store. 

[ Expo on iPhone ](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8)

[ Expo on Android ](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US)


## Getting Started

To get started using our application first fork and clone this repo.
Next, in your terminal go to ./recycle-blue-native/back-end and run the following commands:

```
npm install
npm run seed
npm run start-dev

```

Next, open another terminal (while keeping the back-end terminal open) and go to ./recycle-blue-native/client and run the following commands:

```
npm install
npm run start

```

On your client terminal you will see a a prompt for expo to either send  a URI for the server to your phone which you can use to run the expo application. Andriod devices have the option of scanning a QR code to achieve the same result.


## Built With

* [EXPO](https://expo.io/) - The toolchain used during development
* [NPM](https://www.npmjs.com/) - Dependency Management
* [React Native](https://facebook.github.io/react-native/) - Used for front end cross platform development
* [Redux](https://redux.js.org/) - Used for front end state management
* [postgreSQL](https://redux.js.org/) - Database
* [Sequelize](https://redux.js.org/) - ORM 
* [Express](https://redux.js.org/) - Used to make RESTful api
* [Victory Native](https://redux.js.org/) - Used to display data visualizations


## Authors

* **Fullstack Academy** - *Boilerplate* - [Fullstack Academy](https://github.com/FullstackAcademy)
* **Lamine Sadoun** - *Developer* - [Lamine Sadoun](https://github.com/Tiny-Sheep)
* **Andrew Trahan** - *Developer* - [PurpleBooth](https://github.com/globalART19)
* **Dustin McDowell** - *Developer* - [PurpleBooth](https://github.com/dusmcd)
* **Samir Thakral** - *Developer* - [PurpleBooth](https://github.com/samirthakral)
* **Cody Fayolle** - *Advisor* - [PurpleBooth](https://github.com/samirthakral)





## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to Collin T Miller for advising on the project and helping our team get through technical hurdles.

## Link to live Expo Application
