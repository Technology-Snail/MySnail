# MySnail Chrome Extension
This chrome extension, developed by TechnologySnail, allows you to have a **virtual pet snail** that shows up on _every website_ you visit.  You can **_customize_** your snail by changing its colors, size, and speed in the popup menu or in the options page.  The snail continuously crawls across the screen, and comes out of the left side after it has fully disappeared off the right side of the screen.  To hide the snail, simply double-click it.  It will come back when you reload the page or come back to it.

# MySnail API
Although the chrome extension is MySnail's central purpose, MySnail also has an API.  If you are a website developer, you can add a touch of fun to any site by including the following code in the `<head>` element of your page:
```
<script src="https://technology-snail.github.io/MySnail/resources/snail.js"></script>
<script>new mySnail()</script>
```
You could also include the API with only the first line and make the snail appear later.  If you have something that takes a long time to load on your site, for example, you could create the snail when the user clicks the button:
```
<button onclick="new mySnail()">Begin Lengthy Processing....</button>
```
This would add a hilarious twist to your website to make the wait not seem so long!

You can also customize the snail with the following parameters:
| Parameter Name | What It Is | Default Value |
| :-- | :-- | :-- |
| Freeze | Set to `true` if you want the snail to stay in one spot and `false` if you want the snail to crawl from one side of the screen to the other. | `false` |
| Size | How big the snail should be (note that quality will not be lost to pixelation) | `0.25` (about 1 inch tall) |
| Speed | Approximately how fast the snail should move (the distance in pixels per frame, at 70 FPS) | `0.4` |
| Colors | A list of four CSS colors in this order: inner shell, outer shell, lower body, upper body | `["#00f2ff", "#003fff", "#ffaa00", "#ffe500"]` |

For example, if you wanted to create a moving snail that was an inch tall and moved painfully slow, with a blue shell and a yellow-to-orange body:
```
new mySnail(false, 0.25, 0.1, ["deepskyblue", "royalblue", "orange", "yellow"]);
```
If you want the snail to disappear later, you can use the `hide()` function.  Just make sure to store the snail in a variable first:
```
aSnailNamedJoe = new mySnail(); // Stores a new snail in a variable
aSnailNamedJoe.hide(); // Makes the snail disappear
```
There are also some other functions you can use.  Here are just a few examples:
```
aSnailNamedJoe.show(); // Makes snail reappear
aSnailNamedJoe.setSize(1); // Makes the snail BIG
aSnailNamedJoe.setSize(0.1); // Makes the snail little
aSnailNamedJoe.setColors(["red","red","red","red"]); // Makes the snail completely red
aSnailNamedJoe.frozen = true; // Freeze the snail in the lower-left corner of the screen (antennae will still move)
aSnailNamedJoe.frozen = false; // Allow a frozen snail to move again
aSnailNamedJoe.speed = 0.1; // Make the snail move very slow
aSnailNamedJoe.speed = 5; // Make the snail move too fast!
aSnailNamedJoe.x = 0; // Teleport the snail to the left side of the screen
aSnailNamedJoe.x = window.innerWidth / 2; Teleport the snail halfway across the screen
```
Please note that the snail is completely immune to mouse events and clicks will pass through it to anything that it may be covering up.

<br>

# Future Plans:
Version 2.0 of the chrome extension will bring drastic changes to MySnail, including but not limited to:
 - The snail's ability to speak with a word bubble
 - An options page for more settings beyond the usual found in the popup
 - The ability to click objects behind the snail (FINALLY!)
 - An on/off switch in the extension popup for showing/hiding the snail
 - Checkboxes in the options page to choose what the snail can talk about, including the following options:
  - [x] Low Battery Notification at (customizable value, default = 5)%
  - [x] Notification when newer version of MySnail Chrome extension is available
  - [x] A reminder to drink water, randomly but at approximately 30 minute intervals
  - [x] Friendly reminder to get off screen at certain time, settable between 7:00pm and 11:00pm, defaulting to 10:00pm.  (You can ignore this for five minutes, but the snail will tell you the same thing more sternly five minutes later, and five minutes after that the snail will make random elements from your screen start disappearing... Back to normal at 4:00am.)
  - [x] Fun fact of the day, based on something about the national or international day it is. (Example: Penguin Awareness Day, January 20, may have a fun fact about penguins.)
  - [x] Breaking News! (only good news, no bad)  This can include an epic newly discovered species, a major advancement in technology, a rescue, etc., directly from MySnail News, a source you can trust that won't depress you with bad news.

If you would like to use the pre-release most recent version of MySnail, you can download it [here](https://github.com/Technology-Snail/MySnail/archive/refs/heads/speaking-snail.zip) as long as you understand that it is still a work in progress and will be officially released when it is ready.  `MySnail 2.0 BETA` is currently better than `MySnail 1.9.6`, but it simply isn't finished yet. (From the list above of what the snail will be able to say, the snail can only tell you when your battery level is low.  The other options will be added soon; thank you for your patience.)

Shortly after the release of version 2.0, version 3.0 will be released.  Version 3 will involve:
 - The ability to click and drag snails to other locations on the page
 - MySnail Chat, so you can add other people with the extension to your friends list and you will be able to see their snail if you are on the same site (they can turn off this option for privacy reasons if they want).  You can click your snail and an empty word bubble will appear above it that you can type in.  Hit enter and your friends see the word bubble above your snail, so you can talk to each other through your snails!  A simple but hilariously fun way to communicate, especially when collaborating on a project.  (Technical note: _"On the same site" refers to the same domain, not an exact URL.  `earth.google.com` is separate from `mail.google.com`, but `earth.google.com/hello` is the same as `earth.google.com/hi` and `earth.google.com`._)
 - An available pro plan, involving the following:
 - Have **multiple snails** at a time on a site!
 - **Customize and save** multiple snails, with all your snails synced across Chrome!
 - The snails may have discoidal shells (like all of them have now) _OR_ **turret shells**, so you can have a greater variety of snail types!
 - The snails may not only be at the bottom of the page but also **on the walls and the ceiling**! (optional)
 - ***More!*** (_TBD, potentially AI stuff...._)

<br>

![image](https://github.com/Technology-Snail/MySnail/assets/71152561/43caed6d-1d88-4cc8-a7e9-386b4daccbff)
< Get the MySnail Chrome Extension Today!

# How to Install the Extension Now

Unfortunately, the MySnail Chrome Extension has not yet been published to the Chrome Web Store.  The TechnologySnail business will not be _officially_ releasing any products until a home website for TechnologySnail has been fully developed and there are at least three solid products to offer, one of which would be the MySnail Chrome Extension.

Despite the fact that you can't just click a button on the Chrome Web Store and have the snail on your screen, you can _still_ get the MySnail Chrome Extension on your computer by using a different method... And it is totally worth it!

Just follow the simple steps below to get your pet digital snail:
 1. Download the Chrome Extension by clicking [this link](https://github.com/Technology-Snail/MySnail/archive/refs/heads/main.zip).
 2. Unzip/Unpack/Extract the previously downloaded zip file into its own folder.
 3. Go to the URL `chrome://extensions`.
 4. In the upper-right corner, you will see an on/off switch with the words "Developer mode" next to it.  Turn this switch on.
 5. A set of buttons will appear near the upper-left corner.  Click the one that says "Load unpacked".  When a file manager dialog opens, go to the folder you obtained in step two and select the folder inside of it called "extension-files".
 6. That's it!  Enjoy your snail!

# Feedback

If you have any technical difficulties, questions, or feedback, _please_ participate in this repository's [discussion](https://github.com/Technology-Snail/MySnail/discussions/8), or send an email to [email.technologysnail@gmail.com](https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=email.technologysnail@gmail.com).
