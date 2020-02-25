# Welcome to HomeMade!

**HomeMade** is a food delivery app but with a twist. The idea is that instead of ordering form Restaurants, users who want more variety and local flavors can place orders to local HomeMade chefs. **"Chefs"** will use the app to post what they are cooking up for the day and when the meals will be available (Breakfast, Lunch, Dinner). Then **Users** will be able to, in real time, see available meals, reserve a meal and purchase a meal for later.

# The App

This is still a work in progress. I will be using React on the front end and nodeJS with Graphql/Apollo on the back end to send user queries and mutations.

Payment processing will be handled with Stripe.

For now I am writing my own Auth to get a feel for the process, but will likely move the auth to AWS or FireBase.

I want to have fun on the front end and plan on using Framer Motion to do some animations.

I am thinking that image storage will be done either Cloudinary or a Google FireBase product, TBD.

For now this is a Web app but would obviously benefit from a mobile version so the plan is to later migrate to mobile using Flutter.

# File notes

In the Auth section there are some duplicate files (withHooks) as I wrote some of the auth files in the syntax that I know but would like to convert them to using hooks. There are some challenges here as the documentation for Hooks/Graphql/Auth is not exactly well defined. I may end up doing a re-write but for now I am trying to backwards engineer the original files.

# More to come!!....
