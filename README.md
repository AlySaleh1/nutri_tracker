# Nutri Track
## Inspiration
As students, it is difficult to keep track of what you are eating, and or whether or not you are getting enough calories and macronutrients by the end of your day. So we created a webapp that determines the macronutrients and calories from a picture of your food!

## What it does
It saves all the macronutrients and calories you have eaten through out your day, and presents it in a chart format.

## How we built it
We used Node.js and React for the web development. For identifying the food in the image, we used Spoonacular API. We then searched for the macronutrients using the nutritionix API.

## Challenges we ran into
The Spoonacular API was not accepting our image as a parameter; however, it accepted a url to the image. So we using Imgur to upload the picture the web and then passed the image link to Spoonacular.

## Accomplishments that we're proud of
We were able to set up the website as well as connecting it to the APIs in 24 hours!

## What we learned
We learned how to use APIs and how to navigate around blocks in our project.

## What's next for Nutri Tracker
We could have it as a social platform, where people can choose if they want to share what they are eating with other people on the website! We can also have the webapp track vitamins and minerals.
