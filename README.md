<div align="center" style="margin-top:6%;margin-bottom:6%;">
 <img style = "width:140px; height:140px;margin-bottom:5px;" src="https://i.imgur.com/ipVb55a.png" ></br>
 <a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=Nova+Square&size=40&pause=1000&color=F20055&center=true&vCenter=true&width=435&lines=GGamerz" alt="Typing SVG" />
 </a>
</div>

# Introduction
GGamerz is an e-commerce website with an admin-panel that allows admins to control all data manipulation and handling. Our app mainly serves as a platform where users can shop through a database of various games ⚽🎮🕹️🧩
and filter by different choices such as game type, game category or platform compatibility. Users can build their profile and add their game preferences and Discord links to facilitate contact between them and other users as a part of our community. Users are able to search for other user who share their same game preferences to follow and unfollow eachother, Each user is able to write reviews on games and reply on others' reviews. 
For each game user will buy he will gain points which helps him to level up and get badges to compete with others.
They can also exchange their points with coupons for discounts on their next purchase.
News section to keep the user up with the latest announcements.

## Demo Video :tv: 
<!-- [![Website Demo Video](https://img.youtube.com/vi/o9uaP1QoSwI/0.jpg)](https://www.youtube.com/watch?v=o9uaP1QoSwI) --> 
</br>
<hr>
<b>Visit</b> our website at 👉🏻 https://ggamerz.netlify.app/ 
<hr>

## Technologies
We used comination of technologies to create a solid foundation for our website, enabling us to build highly scalable and efficient web application

- MySQL Database hosted on Google Cloud.
- Sequelize ORM
- Express—a Node.js framework for building APIs.
- Angular—front-end application framework.
- Node.js—server-side JavaScript runtime environment.

## Features
- General
  - User authentication.
  - Email Verification
  - Password Reset
  - Homepage with game teasers
  - Latest News section
  - User customizable profile.
  - Responsive design for mobile and desktop devices🖥️📱.
    
- Community
  - Write reviews on games
  - Reply to other users' reviews
  - View your purchased games on your profile
  - Profile Chart statistics for purchased games 📈.
  - User can follow / follow back / unfollow other users
  - Search for users who have the same game preferences
    
- Store
  - Store with game type, game category or platform compatibility filtering.
  - Add to cart, remove from cart and remove all.
  - User can view their pending, accepted or rejected orders.
  - Stripe API visa payment gateway 💳.
  - Earn points for each game you buy. 🌟
  - Level up through 7 tiers based on your points in our leveling system. 💹
  - Earn badge for each level and compete with other users
  - Exchange your points with coupons on your next purchase


### Admin-panel
- Show total revenue
- Chart statistics and analysis📊.
- Used Cloudinary API for uploading & hosting images
- User ban and unban.
- Reject or accept orders.
- Add, edit, view and delete products.
- Make new Announcements to appear for users in news section
- Create Coupon with specified amount of points

## Installation & Run
<pre>
git clone https://github.com/Shehab8K/GGamerz.git
</pre>

### Database creation
- Create SQL database
- Run Database Migrations
<pre>npx sequelize-cli db:migrate</pre> 
- Create .env

```
USER=
PASSWORD=
DBPORT=
DATABASE=
HOST=
DIALECT=

CLOUD_PATH=
CLOUD_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=

SECRET_KEY=

STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=

EMAILHOST=
EMAILUSER=
EMAILPASS=

FRONTEND=
```
- Run Project
<pre>
cd Angular
npm i
ng serve -o
open your browser on http://localhost:4200/
</pre>

<pre>
cd Nodejs
npm init
npm install
node server.js     or    nodemon server.js
Server will be listening on port 3000
</pre>
<hr>
<h3>⭐ Don't Forget to star our repo :D</h3>
<hr>

## Authors

- [Asmaa Gamal](https://github.com/asmaagamal871)

- [Mayar Hamed](https://github.com/MayarHamed/)

- [Shehab Hossam](https://github.com/Shehab8K)

- [Raneen Mahmoud](https://github.com/raneenmahmoud)

- [Nada Alaa](https://github.com/NadaAlaaEldeen)

- [Ahmed M.Abdelrahim](https://github.com/ahmedabdelrahim123)
