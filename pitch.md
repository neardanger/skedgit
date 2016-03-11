# Skedgit

### Description

This website simplifies making itineraries by giving you realtime access to Yelp's api giving you a rundown of restaurant, bars, events, etc in your geolocated area. We give you an easy step by step process that lets you plug in what you want to our "sophisticated algorithm", and in return you receive the most ideal combination of business based off of your needs & location.

### Technologies Used

- NodeJS + Express
- MongoDB + Mongoose
- Javascript + jQuery
- AJAX
- Passport
- Materialize
- HTML
- CSS

### Third-party APIs

- Yelp

### OAuth Providers

- Facebook

### Wireframes

  ![intial_screen](wireframes/intial_screen.png)

 ![second_screen](wireframes/second_screen.png)

 ![third_screen](wireframes/third_screen.png)

![schedule_display_desktop](wireframes/schedule_display_desktop.png)

 ![schedule_display_mobile](wireframes/schedule_display_mobile.png)

 ![profile_screen](wireframes/profile_screen.png)

### Data Model


- User
  - contains user data (email, password, saved schedules[links as reference])
- Schedule
  - contains times and an array of businesses (embeded)
- Business
  - contains reference to a Yelp business id, plus parameters for quick display on frontend
