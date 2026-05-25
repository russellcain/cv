---
title: 'Dumpster Bowl' 
description: 'Improvements on the NHL Draft Lottery' 
pubDate: 'May 17 2026' 
heroImage: '../../assets/skating.jpeg' 
---
## Dumpster Bowl
This project is meant to help visualize and validate a thought expiriment I have had for the past few years: how to improve the (nhl) draft lottery. Times have grown only more dire as the Leafs have landed the first overall pick two out of their past two times missing the playoffs so allegations are rightfully swirling. This is a proposal to people's sensibilities, maybe bettman, and at least to my insomnia that maybe we can find a sensible way out of collectively playing bingo. Let's freaken dive in:

### Why are we here

The NHL lottery was brought in to help mitigate instances of "tanking". Whereas hiring Stan Bowman is the easiest way to ensure this for a non-stacked team, it makes sense that organizations want to up their chances at the best young player. Unfortunately, this ups the chances of fans needing to watch some god awful hockey along the way. Additionally(!), this really throws a wrench in projected points for a team fighting for a playoff spot toward the end of the season. The NHL prides itself on being a league so balanced that, any given night, the worst team has a chance at beating the best. This keeps playoff races and just about every game interesting, until a team loses the incentive to try.

So, the question becomes: How can we guarantee that teams want to win toward the end of the season? We already know the playoff hopefuls are going to be pushing, but we need those "dumpster diving" teams to be chasing a carrot instead of the mucky bottom. As such, we need to reward victories for the eliminated teams. We need each added win to be tallied toward their ultimate goal for the season, the first overall pick. What I'd propose (and hope to show with the work in this project), is a whole new approach on the last chunk of the season that I am going to affectionately coin the Dumpster Bowl. (Sorry, Gary - you can change it once you bring a cup back to Canada).

### The Dumpster Bowl Rules and Regulations:

A team is submitted and eligible to compete in the dumpster bowl the second they are eliminated from playoff contention. Upon entering the DB league, they earn points in much the same way they failed to do so during the regular season: 2 points for a win, 1 for an OT loss, and 0 when they play the way the usually do and lose in regulation. Given they aren't elligible to rack up points until they are eliminated, they are not all going to play the same number of games; instead, the worse a team is, the more of a head start they are given. Once all teams have played 82 games, we look at the DB standings and the team with the most accrued points since elimination is granted the first overall pick. Tiebreakers could go to fewest overall regular season standing points or number of DB games played. Let's walk through a quick example:  

Imagine you're a real stinker called the 2025-2026 Vancouver Canucks. You've played 69 games on your way to March 22nd in a league that won't finish the regular season until April 17th. Woof. You had your chance at greatness a few years ago before a bleach-blonde stringbean helped corrode your locker room, a mixed bag of turds is running your front office, and the haunted victorian ghost inside Quinn Hughes moved with him to Minnesota. Whereas their fanbase should learn from this and pack up, they still have 13 games to play and that's 26 points that they could be unfairly handing over to the teams scrapping for a playoff spot. I'd rather they try. 

In those remaining 13 games, they managed to rack up 8 points, points we will attribute to their secondary standings position: the dumpster bowl league. They got a head start on their peers, no one else qualifying to start racking up points until the Rangers a few days later (72 games into the season). With their remaining 10 games, the boys in New York really turned things on and managed 15 points, putting them ahead of Vancouver and showing their fans that the "we are going to be bad for a bit" memo might carry some hope. For this quick example, the NYR would have a higher draft pick than the Canucks. 

Now imagine you are the first overall pick. One thing the lottery helped with was ensuring that the most rancid of teams aren't de-facto entrusted with the brightest young talent, ushering them into a culture of losing. Nothing is a worse look for an organization and the overall league than a player dodging their draft assignment, earning more enemies than fans before their first game. Wouldn't you rather be picked by a team that pulled themselves up by their bootstraps and finished on a heater, earning your hand in entry level contract? You'd have to see that there exists some gumption under the trash and that maybe, just maybe, with your help, they might sniff the playoffs in the next few years. Additionally, you are safeguarded against any teams which said "you know what would be really smart? Suck a lot really early so we are eliminated first and then we turn on the jets and win out the DB league (wow what a good idea, that kid rocks), and we snuck our way into a first overall pick" but then proceeded to realize that they are much better at losing than winning and can't turn the sinking ship around. That's a good team to avoid playing for and maybe management should realize they need to fix their locker room before they retry their trickery next season.

### Proof? 

The best we can do until this is enacted is write a quick revisionist's history. By trapsing over the seasons for which a draft lottery has existed (since 1995, the year all questionable things were born), we will apply the proposed scoring metric and provide what the draft order would have been in an alternate, logical universe. The hope is that the teams which really needed some help won those years and, upon proving this out, being made commissioner, and enacting this for future seasons, we will see more teams give a toot through to the final games of their sad, sorry seasons. The obvious shortcoming of this retroactive approach is that is it adding a carrot well after the fact; providing an incentive to those teams really trying to tank and doing their best to lose. As such, I am going to add an additional column which captures what a team's winning percentage was at the time of their elimination in an effort to establish a mean performance that they were perhaps trying to duck beneath. If I get really bent out of shape, I'll provide a month over month winning percentage so we can better capture when the light of the playoffs left their eyes and they intentionally started playing below their potential.

Let's see! I wrote all of this up so time to put the numbers where my mouth was. If I return with my tail between my legs, maybe say "hey thanks for trying" and give me a key to your city all the same. 

-----------

## Technical Notes:

We are going to be using the wonderfully undocumented nhl api for this work. As such, I am going to treat this file as a bit of a stream-of-consciousness / ranting scratchpad as I find things. Coming into the project, I am not set on the tech stack I'll be going for, especially since the first few stages are going to be dumb data analytics and, truthfully, this is not heavy processing I need to be running more than once (to my knowledge, they aren't going to reconstruct and allow the teams of 2013 duke it out again). That being said, I'll try to keep my work clean and AI-free as this is fun and I like it and I want to slowly build up an understanding of the nhl api for other tinkerers. 

## Standings:

To gather the standings, we'll be calling `https://api-web.nhle.com/v1/standings/{YYYY-MM-DD}` which, unfortunately, is split by day. Thankfully, we can trim down the amount of crawling we need to do by knowing a team isn't likely going to be eliminated before, say, March. If they are, we should be researching which AHL markets could stomach a second franchise rather than worrying about their DB totals. For those not running this code at home, the output of March 22nd's standings can be found [here](march_22_standings.json).

I think that the easiest approach would be to start crawling from the start of March, keep a running tally of the teams which have the optional (cmon guys) field `"clinchIndicator"` with a value of `'e'` and keep their number of games played, points at the time they are eliminated. For the ease of subsequent processing, we will also store the date that we found them to be eliminated. I think it could be cool down the line to give a "clickable" time portal through the DB season where you can see how many elimination points a team has and who they are playing next. I guess it would even look like a "games coming up" schedule for the qualified teams on a certain date. 

Let's go for the easiest / quickest path for this first section. As such, python it is. 

Alright sick! this is what my simple loop spat out for the end of the 2026 season:
```
Here are the trash teams 
{
  "Vancouver Canucks": {
    "points": 50,
    "gamesPlayed": 69,
    "eliminationDate": "2026-03-22"
  },
  "New York Rangers": {
    "points": 65,
    "gamesPlayed": 72,
    "eliminationDate": "2026-03-25"
  },
  "Toronto Maple Leafs": {
    "points": 77,
    "gamesPlayed": 76,
    "eliminationDate": "2026-04-02"
  },
  "Chicago Blackhawks": {
    "points": 68,
    "gamesPlayed": 76,
    "eliminationDate": "2026-04-02"
  },
  "Florida Panthers": {
    "points": 77,
    "gamesPlayed": 76,
    "eliminationDate": "2026-04-04"
  },
  ...
  "San Jose Sharks": {
    "points": 84,
    "gamesPlayed": 80,
    "eliminationDate": "2026-04-13"
  },
  "Winnipeg Jets": {
    "points": 82,
    "gamesPlayed": 80,
    "eliminationDate": "2026-04-13"
  }
}
```
Okay sweet! now i need to grab the final standings to calculate the number of DB points they earned..

Here is our final standings:
```
{
  "New York Rangers": {
    "points": 65,
    "gamesPlayed": 72,
    "dumpsterGames": 10,
    "eliminationDate": "2026-03-25",
    "earnedPoints": 12
  },
  "Vancouver Canucks": {
    "points": 50,
    "gamesPlayed": 69,
    "dumpsterGames": 13,
    "eliminationDate": "2026-03-22",
    "earnedPoints": 8
  },
  "Florida Panthers": {
    "points": 77,
    "gamesPlayed": 76,
    "dumpsterGames": 6,
    "eliminationDate": "2026-04-04",
    "earnedPoints": 7
  },
  "St. Louis Blues": {
    "points": 80,
    "gamesPlayed": 79,
    "dumpsterGames": 3,
    "eliminationDate": "2026-04-11",
    "earnedPoints": 6
  },
  "Chicago Blackhawks": {
    "points": 68,
    "gamesPlayed": 76,
    "dumpsterGames": 6,
    "eliminationDate": "2026-04-02",
    "earnedPoints": 4
  },
  "New Jersey Devils": {
    "points": 83,
    "gamesPlayed": 78,
    "dumpsterGames": 4,
    "eliminationDate": "2026-04-07",
    "earnedPoints": 4
  },
  "Calgary Flames": {
    "points": 73,
    "gamesPlayed": 77,
    "dumpsterGames": 5,
    "eliminationDate": "2026-04-07",
    "earnedPoints": 4
  },
  "Washington Capitals": {
    "points": 93,
    "gamesPlayed": 81,
    "dumpsterGames": 1,
    "eliminationDate": "2026-04-13",
    "earnedPoints": 2
  },
  "San Jose Sharks": {
    "points": 84,
    "gamesPlayed": 80,
    "dumpsterGames": 2,
    "eliminationDate": "2026-04-13",
    "earnedPoints": 2
  },
  "Toronto Maple Leafs": {
    "points": 77,
    "gamesPlayed": 76,
    "dumpsterGames": 6,
    "eliminationDate": "2026-04-02",
    "earnedPoints": 1
  },
  "Detroit Red Wings": {
    "points": 91,
    "gamesPlayed": 80,
    "dumpsterGames": 2,
    "eliminationDate": "2026-04-11",
    "earnedPoints": 1
  },
  "Seattle Kraken": {
    "points": 79,
    "gamesPlayed": 79,
    "dumpsterGames": 3,
    "eliminationDate": "2026-04-11",
    "earnedPoints": 0
  },
  "New York Islanders": {
    "points": 91,
    "gamesPlayed": 81,
    "dumpsterGames": 1,
    "eliminationDate": "2026-04-12",
    "earnedPoints": 0
  },
  "Columbus Blue Jackets": {
    "points": 92,
    "gamesPlayed": 81,
    "dumpsterGames": 1,
    "eliminationDate": "2026-04-13",
    "earnedPoints": 0
  },
  "Nashville Predators": {
    "points": 86,
    "gamesPlayed": 81,
    "dumpsterGames": 1,
    "eliminationDate": "2026-04-13",
    "earnedPoints": 0
  },
  "Winnipeg Jets": {
    "points": 82,
    "gamesPlayed": 80,
    "dumpsterGames": 2,
    "eliminationDate": "2026-04-13",
    "earnedPoints": 0
  }
}
```
meaning we'd have that order for our picks. I wonder if there is a way I can scrape the final draft order so I can automate the comparison / calculating the distance this change would provide from reality. 

First, let's do a quick bit of post-processing to make these standings easier to quickly look over. Maybe I could wire up a quick html page which has collapseable tables by year? Or should I wait until I have contrasting / real draft data before I go for all that?
